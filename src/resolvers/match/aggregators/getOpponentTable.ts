import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getOpponentTable = (teamId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    {
      $lookup: {
        from: 'teams',
        localField: 'opponentId',
        foreignField: '_id',
        as: 'opponent',
      },
    },
    { $unwind: '$opponent' },
    {
      $group: {
        _id: '$opponentId',
        isActive: {
          $first: '$opponent.isActive',
        },
        opponentName: {
          $first: '$opponent.teamName',
        },
        opponentBadge: {
          $first: '$opponent.teamBadge.url',
        },
        total: { $count: {} },
        wins: {
          $sum: {
            $cond: [
              {
                $gt: ['$teamGoals', '$opponentGoals'],
              },
              1,
              0,
            ],
          },
        },
        draws: {
          $sum: {
            $cond: [
              {
                $eq: ['$teamGoals', '$opponentGoals'],
              },
              1,
              0,
            ],
          },
        },
        losses: {
          $sum: {
            $cond: [
              {
                $lt: ['$teamGoals', '$opponentGoals'],
              },
              1,
              0,
            ],
          },
        },
        totalGoalsScored: { $sum: '$teamGoals' },
        totalGoalsConceded: {
          $sum: '$opponentGoals',
        },
        totalGoalDifference: {
          $sum: {
            $subtract: ['$teamGoals', '$opponentGoals'],
          },
        },
      },
    },
  ]).exec();
