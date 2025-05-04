import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMostAssistsInMatch = (teamId: string) =>
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
        assists: {
          $sum: '$matchPlayers.assists',
        },
      },
    },
    {
      $group: {
        _id: null,
        maxAssists: {
          $max: '$assists',
        },
      },
    },
    {
      $lookup: {
        from: 'matches',
        let: {
          maxAssists: '$maxAssists',
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
                $eq: ['$matchPlayers.assists', '$$maxAssists'],
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
        total: '$matchPlayers.assists',
        player: {
          $first: '$player.name',
        },
      },
    },
  ]).exec();
