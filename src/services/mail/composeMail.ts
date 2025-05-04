import { EMAIL_ADDRESS } from '../../constants/constants';

interface IEmailParams {
  to: string;
  subject: string;
  body: any;
}

export const composeMail = ({ to, subject, body }: IEmailParams) => {
  return {
    to,
    from: EMAIL_ADDRESS,
    subject,
    html: body,
  };
};
