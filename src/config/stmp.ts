import {
  EMAIL_ADDRESS,
  EMAIL_PASSWORD,
  EMAIL_PROVIDER,
} from '../constants/constants';

export const smtpConfig = {
  host: EMAIL_PROVIDER,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
