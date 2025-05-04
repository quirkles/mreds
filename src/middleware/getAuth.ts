import { Request, Response } from 'express';
import { ROLES } from '../constants/constants';
import { UserModel } from '../entities';
import { verifyToken } from '../services/jwt/verifyToken';

export const auth = async (req: Request, res: Response, next: () => void) => {
  const token = req.cookies.auth_token;
  const decoded = verifyToken(token);
  const { id } = decoded as { id: string };
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
  if (user.roles.includes(ROLES.USER) && user.isVerified) {
    next();
  } else {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
};

export const teamAdmin = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies.auth_token;
  const decoded = verifyToken(token);
  const { id } = decoded as { id: string };
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
  if (user.roles.includes(ROLES.TEAM_ADMIN) && user.isVerified) {
    next();
  } else {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
};

export const orgAdmin = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies.auth_token;
  const decoded = verifyToken(token);
  const { id } = decoded as { id: string };
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
  if (user.roles.includes(ROLES.ORG_ADMIN) && user.isVerified) {
    next();
  } else {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
};

export const siteAdmin = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  const token = req.cookies.auth_token;
  const decoded = verifyToken(token);
  const { id } = decoded as { id: string };
  const user = await UserModel.findById({ _id: id });
  if (!user) {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
  if (user.roles.includes(ROLES.SITE_ADMIN) && user.isVerified) {
    next();
  } else {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
};
