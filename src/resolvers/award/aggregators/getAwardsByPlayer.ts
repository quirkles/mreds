import mongoose from 'mongoose';
import { AwardModel } from '../../../entities';

export const getAwardsByPlayer = (playerId: string) =>
  AwardModel.aggregate([
    {
      $match: {
        winners: new mongoose.Types.ObjectId(playerId),
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
      $sort: {
        season: 1,
      },
    },
    {
      $project: {
        season: { $first: '$season.name' },
        awardName: 1,
        awardValue: 1,
        comment: 1,
      },
    },
  ]).exec();
