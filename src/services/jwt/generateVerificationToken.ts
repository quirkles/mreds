import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { USER_VERIFICATION_SECRET } from '../../constants/constants';

export const generateVerificationToken = (id: ObjectId) => {
  const verificationToken = jwt.sign({ id }, USER_VERIFICATION_SECRET);
  return verificationToken;
};
