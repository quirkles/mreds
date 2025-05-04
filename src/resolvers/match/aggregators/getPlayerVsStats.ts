import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getPlayerVsStats = (playerId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        'matchPlayers.playerId': new mongoose.Types.ObjectId(playerId),
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
        _id: '$opponentId',
        matches: { $count: {} },
        goals: { $sum: '$matchPlayers.goals' },
        assists: {
          $sum: '$matchPlayers.assists',
        },
        conceded: {
          $sum: '$matchPlayers.conceded',
        },
      },
    },
    {
      $lookup: {
        from: 'teams',
        localField: '_id',
        foreignField: '_id',
        as: 'opponent',
      },
    },
    {
      $project: {
        _id: 0,
        opponentId: '$_id',
        matches: 1,
        goals: 1,
        assists: 1,
        conceded: 1,
        opponent: { $first: '$opponent.teamName' },
        opponentBadge: { $first: '$opponent.teamBadge.url' },
      },
    },
  ]).exec();
