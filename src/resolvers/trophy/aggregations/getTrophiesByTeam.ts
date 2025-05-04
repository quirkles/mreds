import mongoose from 'mongoose';
import { TrophyModel } from '../../../entities';

export const getTrophiesByTeam = (teamId: string) =>
  TrophyModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },

    {
      $lookup: {
        from: 'teamseasons',
        localField: 'seasonId',
        foreignField: '_id',
        as: 'season',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        comment: 1,
        opponent: 1,
        isFinal: 1,
        isWinner: 1,
        season: { $first: '$season.name' },
      },
    },
    {
      $sort: {
        season: -1,
      },
    },
  ]).exec();
