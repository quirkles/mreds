import { UserModel } from '../entities';
import { verifyToken } from '../services/jwt/verifyToken';

export const getUser = async (cookie: { auth_token: string }) => {
  if (!cookie.auth_token) {
    return null;
  }
  const decoded = verifyToken(cookie.auth_token);
  const { id } = decoded as { id: string };
  const result = await UserModel.findById({ _id: id });
  return result;
};
