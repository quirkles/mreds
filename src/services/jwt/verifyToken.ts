import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../constants/constants';

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
