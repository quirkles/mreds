import bcrypt from 'bcrypt';
import { SALT } from '../../constants/constants';

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT);
};
