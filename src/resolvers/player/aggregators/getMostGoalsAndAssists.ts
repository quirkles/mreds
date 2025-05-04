import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMostGoalsAndAssists = (teamId: string, playerId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    { $unwind: '$matchPlayers' },
    {
      $match: {
        'matchPlayers.playerId': new mongoose.Types.ObjectId(playerId),
      },
    },
    {
      $group: {
        _id: '$matchPlayers.playerId',
        maxGoals: { $max: '$matchPlayers.goals' },
        maxAssists: {
          $max: '$matchPlayers.assists',
        },
      },
    },
  ]).exec();
