import { ApolloError } from 'apollo-server-core';
import { ObjectId } from 'mongoose';
import { Resolver, Arg, Mutation, Ctx, Authorized } from 'type-graphql';
import * as Types from './types';
import { EMAIL_ADDRESS, ROLES, URL } from '../../constants/constants';
import { User, UserModel } from '../../entities';
import { comparePassword, hashPassword } from '../../services/bcrypt';
import {
  generateVerificationToken,
  generateUserToken,
  decodeToken,
} from '../../services/jwt';
import {
  passwordResetMail,
  sendEmail,
  verifyAccountMail,
} from '../../services/mail';
import { IContext } from '../../types';

@Resolver()
export class UserMutationsResolver {
  @Mutation(() => User)
  @Authorized(ROLES.USER)
  async logOutUser(
    @Ctx() { res, authUser }: IContext
  ): Promise<ObjectId | ApolloError> {
    try {
      res.clearCookie('auth_token');
      return authUser._id;
    } catch (error) {
      console.log(error);
      return new ApolloError('There was a problem removing the auth cookie');
    }
  }

  @Mutation(() => User)
  async signInUser(
    @Ctx() { res }: IContext,
    @Arg('data') { email, password }: Types.SignInUserInput
  ): Promise<User | ApolloError> {
    try {
      const user = await UserModel.findOne({
        email: email.trim().toLowerCase(),
      });
      if (!user) {
        return new ApolloError('No user exists with this email address');
      }
      if (user && !(await comparePassword(password, user.password))) {
        return new ApolloError('Incorrect password');
      }
      if (user && (await comparePassword(password, user.password))) {
        if (!user.isVerified) {
          return new ApolloError('Unverified User');
        }

        const token = await generateUserToken(user._id, email);
        if (!token) {
          return new ApolloError('There was a problem generating the token');
        }
        res.cookie('auth_token', token, {
          httpOnly: true,
          secure: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        });
      }
      return user;
    } catch (error) {
      return new ApolloError('There was a problem signing in the user');
    }
  }

  @Mutation(() => User)
  async registerUser(
    @Ctx() { res }: IContext,
    @Arg('data') { username, email, password }: Types.RegisterUserInput
  ): Promise<User> {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApolloError('User already exists with this email address');
    }
    const encryptedPassword = await hashPassword(password);

    const newUser = new UserModel({
      username: username,
      email: email.toLowerCase().trim(),
      password: encryptedPassword,
    });

    newUser.verificationToken = generateVerificationToken(newUser._id);

    const savedUser = await newUser.save();

    const mail = {
      to: savedUser.email,
      from: EMAIL_ADDRESS,
      subject: 'Verify Account',
      html: verifyAccountMail(URL, savedUser.verificationToken),
    };

    await sendEmail(mail, res);

    return savedUser;
  }

  @Authorized(ROLES.USER)
  @Mutation(() => User)
  async editUser(
    @Ctx() { authUser }: IContext,
    @Arg('data')
    { username, email, nationality, dateOfBirth }: Types.EditUserInput
  ): Promise<User | undefined | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: authUser._id },
      { username, email, nationality, dateOfBirth }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new ApolloError(`There was a problem: ${err}`);
      });
  }

  @Authorized(ROLES.USER)
  @Mutation(() => User)
  async deleteUser(
    @Ctx() { authUser, res }: IContext
  ): Promise<User | undefined | null> {
    return await UserModel.findByIdAndDelete({ _id: authUser._id })
      .then((id) => {
        res.clearCookie('auth_token');
        return id;
      })
      .catch((err) => {
        throw new ApolloError(`There was a problem: ${err}`);
      });
  }

  @Authorized(ROLES.USER)
  @Mutation(() => User)
  async editPassword(
    @Ctx() { authUser }: IContext,
    @Arg('data') { password, newPassword }: Types.EditPasswordInput
  ): Promise<User | undefined> {
    const hashedPassword = await hashPassword(newPassword);
    const isMatch = async (dbPassword: string) =>
      await comparePassword(password, dbPassword);
    const user = await UserModel.findById({ _id: authUser._id })
      .then((res) => res)
      .catch(() => {
        throw new ApolloError(`No user found`);
      });
    if (!user?.password) {
      throw new ApolloError(`There was a problem: The user couldn't be found`);
    }

    if (!isMatch(user.password)) {
      throw new ApolloError(`There was a problem: The password is incorrect`);
    }
    try {
      if (await isMatch(user.password)) {
        user.password = hashedPassword;
        const savedUser = await user.save();
        return savedUser;
      }
    } catch (error) {
      throw new ApolloError('Something went wrong');
    }
  }

  @Authorized(ROLES.USER)
  @Mutation(() => User)
  async editProfileImage(
    @Ctx() { authUser }: IContext,
    @Arg('data', { validate: false }) { public_id, url }: Types.EditImageInput
  ): Promise<User | undefined | null> {
    return await UserModel.findByIdAndUpdate(
      { _id: authUser._id },
      {
        image: {
          public_id,
          url,
        },
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new ApolloError(`There was a problem: ${err}`);
      });
  }

  @Mutation(() => User)
  async forgotPassword(
    @Ctx() { res }: IContext,
    @Arg('data')
    { email }: Types.ForgotPasswordInput
  ): Promise<User> {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ApolloError('No user exists with that email address');
    }
    if (user) {
      const token = await generateUserToken(user._id, email);

      const mail = {
        to: user.email,
        from: EMAIL_ADDRESS,
        subject: 'Reset Password',
        html: passwordResetMail(URL, token),
      };

      await sendEmail(mail, res);
    }
    return user;
  }

  @Mutation(() => User)
  async resetPassword(
    @Arg('data')
    { password, token }: Types.ResetPasswordInput
  ): Promise<User | undefined> {
    if (!token) {
      throw new ApolloError('No token sent');
    }
    if (token) {
      const decoded = decodeToken(token as string) as { id: string };
      if (!decoded?.id) {
        throw new ApolloError('The token does not contain a user ID');
      }
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        throw new ApolloError('No user matched the provided ID');
      }
      if (user) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        const savedUser = await user.save();
        return savedUser;
      }
    }
  }
}
