import express, { Request, Response } from 'express';
const router = express.Router();
import { API_ROUTES, EMAIL_ADDRESS, URL } from '../constants/constants';
import { UserModel } from '../entities';
import { decodeToken, generateVerificationToken } from '../services/jwt';
import { sendEmail, verifyAccountMail } from '../services/mail';

router.post(
  `${API_ROUTES.PUBLIC}/verify_email`,
  async (req: Request, res: Response) => {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send({
        message: 'No token sent',
      });
    }
    if (token) {
      const decoded = decodeToken(token as string) as { id: string };
      if (!decoded?.id) {
        return res.status(400).send({
          message: 'The token does not contain a user ID',
        });
      }
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(400).send({
          message: 'No user could be matched to this verification code',
        });
      }
      if (user) {
        user.isVerified = true;
        user.verificationToken = '';
        user.save((err, _doc) => {
          if (err) return res.json({ err });
          return res.json(_doc);
        });
      }
    }
  }
);

router.post(
  `${API_ROUTES.PUBLIC}/resend_validation_email`,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        message: 'No user could be matched to this email address',
      });
    }
    if (user) {
      user.verificationToken = generateVerificationToken(user._id);

      const savedUser = await user.save();

      const mail = {
        to: savedUser.email,
        from: EMAIL_ADDRESS,
        subject: 'Verify Account',
        html: verifyAccountMail(URL, savedUser.verificationToken),
      };

      await sendEmail(mail, res);
    }
  }
);

export { router };
