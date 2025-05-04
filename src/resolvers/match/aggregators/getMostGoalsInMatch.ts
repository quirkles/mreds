import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMostGoalsInMatch = (teamId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    {
      $unwind: '$matchPlayers',
    },
    {
      $group: {
        _id: {
          matchId: '$_id',
          playerId: '$matchPlayers.playerId',
        },
        goals: {
          $sum: '$matchPlayers.goals',
        },
      },
    },
    {
      $group: {
        _id: null,
        maxGoals: {
          $max: '$goals',
        },
      },
    },
    {
      $lookup: {
        from: 'matches',
        let: {
          maxGoals: '$maxGoals',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$teamId', new mongoose.Types.ObjectId(teamId)],
              },
            },
          },
          {
            $unwind: '$matchPlayers',
          },
          {
            $match: {
              $expr: {
                $eq: ['$matchPlayers.goals', '$$maxGoals'],
              },
            },
          },
        ],
        as: 'result',
      },
    },
    {
      $unwind: '$result',
    },
    {
      $replaceRoot: {
        newRoot: '$result',
      },
    },
    {
      $lookup: {
        as: 'player',
        from: 'players',
        foreignField: '_id',
        localField: 'matchPlayers.playerId',
      },
    },
    {
      $lookup: {
        as: 'opponent',
        from: 'teams',
        foreignField: '_id',
        localField: 'opponentId',
      },
    },
    {
      $project: {
        matchId: '$_id',
        date: '$date',
        teamGoals: '$teamGoals',
        opponentGoals: '$opponentGoals',
        opponentName: {
          $first: '$opponent.teamName',
        },
        total: '$matchPlayers.goals',
        player: {
          $first: '$player.name',
        },
      },
    },
  ]).exec();
