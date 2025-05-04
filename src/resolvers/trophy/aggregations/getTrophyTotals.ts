import mongoose from 'mongoose';
import { TrophyModel } from '../../../entities';

export const getTrophyTotals = (teamId: string) =>
  TrophyModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    {
      $project: {
        winner: {
          $cond: [{ $eq: ['$isWinner', true] }, 1, 0],
        },
        final: {
          $cond: [{ $eq: ['$isFinal', true] }, 1, 0],
        },
      },
    },
    {
      $group: {
        _id: 'totals',
        total: { $count: {} },
        winner: { $sum: '$winner' },
        final: { $sum: '$final' },
      },
    },
  ]).exec();
