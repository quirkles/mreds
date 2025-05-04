import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMostGoalsByPlayerMatches = (teamId: string, playerId: string) =>
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
      },
    },
    {
      $lookup: {
        from: 'matches',
        let: {
          playerId: '$_id',
          maxGoals: '$maxGoals',
        },
        pipeline: [
          { $unwind: '$matchPlayers' },
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$matchPlayers.playerId', '$$playerId'],
                  },
                  {
                    $eq: ['$matchPlayers.goals', '$$maxGoals'],
                  },
                ],
              },
            },
          },
        ],
        as: 'matchDetails',
      },
    },
    { $unwind: '$matchDetails' },
    {
      $replaceRoot: { newRoot: '$matchDetails' },
    },
    {
      $lookup: {
        from: 'teams',
        localField: 'opponentId',
        foreignField: '_id',
        as: 'opponent',
      },
    },
    {
      $project: {
        _id: '$_id',
        teamGoals: 1,
        opponentGoals: 1,
        date: 1,
        opponent: {
          $first: '$opponent.teamName',
        },
        total: '$matchPlayers.goals',
      },
    },
  ]).exec();
