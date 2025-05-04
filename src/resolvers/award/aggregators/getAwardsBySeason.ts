import mongoose from 'mongoose';
import { AwardModel } from '../../../entities';

export const getAwardsBySeason = (seasonId: string) =>
  AwardModel.aggregate([
    {
      $match: {
        seasonId: new mongoose.Types.ObjectId(seasonId),
      },
    },
    {
      $lookup: {
        as: 'winners',
        from: 'players',
        foreignField: '_id',
        localField: 'winners',
      },
    },
    {
      $project: {
        _id: '$_id',
        winners: '$winners.name',
        awardName: '$awardName',
        seasonId: '$seasonId',
        awardValue: '$awardValue',
        comment: '$comment',
      },
    },
  ]).exec();
