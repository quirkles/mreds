import express, { Request, Response } from 'express';
const router = express.Router();
import { API_ROUTES, EMAIL_ADDRESS, URL } from '../constants/constants';
import { User, UserModel } from '../entities';
import { decodeToken, generateVerificationToken } from '../services/jwt';
import { Logger } from '../services/Logger/Logger';
import { sendEmail, sendEmailAndThrow, verifyAccountMail } from '../services/mail';

router.post(
  `${API_ROUTES.PUBLIC}/verify_email`,
  async (req: Request, res: Response) => {
    const { token } = req.query;
    const {logger = console} = req as Request & {logger: Logger};

    logger.info("VerifyEmail begin")

    if (!token) {
      logger.warn("VerifyEmail: Missing token")
      return res.status(400).send({
        message: 'No token sent',
      });
    }
    if (token) {
      const decoded = decodeToken(token as string) as { id: string };
      logger.info("VerifyEmail: Decoded token", { decoded })
      if (!decoded?.id) {
        logger.warn("VerifyEmail: The token does not contain a user ID")
        return res.status(400).send({
          message: 'The token does not contain a user ID',
        });
      }

      const user = await UserModel.findById(decoded.id);

      logger.info("VerifyEmail: User", { user })

      if (!user) {
        logger.warn("VerifyEmail: No user matched the provided ID")
        return res.status(400).send({
          message: 'No user could be matched to this verification code',
        });
      }
      if (user) {
        user.isVerified = true;
        user.verificationToken = '';
        user.save((err, _doc) => {
          if (err){
            logger.warn("VerifyEmail: Error saving user", { err })
            return res.json({ err });
          }
          logger.info("VerifyEmail: User saved", { _doc })
          return res.json(_doc);
        });
      }
    }
  }
);

router.post(
  `${API_ROUTES.PUBLIC}/resend_validation_email`,

  async (req: Request, res: Response) => {

    const { logger = console } = req as Request & {logger: Logger};
    const { email } = req.body;




    logger.info("ResendValidationEmail begin")

    let user
    try {
       user = await UserModel.findOne({ email })
    }catch(err){
      logger.warn("ResendValidationEmail: Error finding user", { err })
      return res.status(500).send({
        message: 'Error finding user: ',
      });
    };


    if (!user) {
      logger.warn("ResendValidationEmail: No user matched the provided ID")
      return res.status(400).send({
        message: 'No user could be matched to this email address',
      });
    }


    logger.info("ResendValidationEmail: User", { user })

    user.verificationToken = generateVerificationToken(user._id);

    logger.info("ResendValidationEmail: Generated Verification Token")


    let savedUser

    try {
      savedUser = await user.save();
      logger.info("ResendValidationEmail: User saved", { savedUser })
    } catch (err) {
      logger.warn("ResendValidationEmail: Error saving user", { err })
      return res.status(500).send({
        message: 'Error saving user: ',
      });
    }



    const mail = {
      to: savedUser.email,
      from: EMAIL_ADDRESS,
      subject: 'Verify Account',
      html: verifyAccountMail(URL, savedUser.verificationToken),
    };

    logger.info("ResendValidationEmail: Sending email")

    try {
      await sendEmailAndThrow(mail);
      logger.info("ResendValidationEmail: Email sent")
    } catch (err) {
      logger.warn("ResendValidationEmail: Error sending email", { err, mail })
      return res.status(500).send({
        message: 'Error sending email: ',
      });
    }
  }
);

export { router };
