import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';
import { JWT_SECRET } from '../../constants/constants';

export const generateUserToken = async (id: ObjectId, email: string) =>
  jwt.sign(
    {
      id,
      email,
    },
    JWT_SECRET
  );
