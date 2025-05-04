import { Response } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { smtpConfig } from '../../config/stmp';

const transporter = nodemailer.createTransport(smtpConfig);

export const sendEmail = async (mail: Mail.Options, res: Response) => {
  return transporter.sendMail(mail, (err, result) => {
    if (err) {
      return res.json(err.message);
    } else {
      transporter.close();
      return res.json({ email: result.accepted[0] });
    }
  });
};
