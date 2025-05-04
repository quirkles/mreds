import { Response } from 'express';
import { User } from '../entities';

export interface IContext {
  res: Response;
  authUser: User;
  userTeamIds: string[];
}
