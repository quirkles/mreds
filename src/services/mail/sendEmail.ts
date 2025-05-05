import { Response } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { smtpConfig } from '../../config/stmp';
import { SentMessageInfo } from 'nodemailer/lib/smtp-pool';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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

export const sendEmailAndThrow = async (mail: Mail.Options): Promise<SMTPTransport.SentMessageInfo> => {
  try {
    transporter.close()
    return transporter.sendMail(mail)
  } catch(err) {
    if(err instanceof Error) {
      throw new Error(`Error sending email: ${err.message}`)
    }
    if(typeof err == "string") {
      throw new Error(`Error sending email: ${err}`)
    }
    throw new Error(`Error sending email`)
  }
};
