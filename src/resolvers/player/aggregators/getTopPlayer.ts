import mongoose from 'mongoose';
import { MATCH_KEYS } from '../../../constants/constants';
import { MatchModel } from '../../../entities';

export const getTopPlayerStats = (teamId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    {
      $project: {
        _id: 0,
        matchPlayers: MATCH_KEYS.MATCH_PLAYERS,
      },
    },
  ]).exec();
