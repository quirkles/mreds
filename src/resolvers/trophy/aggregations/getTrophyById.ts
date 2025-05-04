import mongoose from 'mongoose';
import { TrophyModel } from '../../../entities';

export const getTrophyById = (trophyId: string) =>
  TrophyModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(trophyId),
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
  ]).exec();
