import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMostAssistByPlayerMatches = (
  teamId: string,
  playerId: string
) =>
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
        maxAssists: { $max: '$matchPlayers.assists' },
      },
    },
    {
      $lookup: {
        from: 'matches',
        let: {
          playerId: '$_id',
          maxAssists: '$maxAssists',
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
                    $eq: ['$matchPlayers.assists', '$$maxAssists'],
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
        total: '$matchPlayers.assists',
      },
    },
  ]).exec();
