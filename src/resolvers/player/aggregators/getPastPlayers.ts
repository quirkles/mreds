import mongoose from 'mongoose';
import { PlayerModel } from '../../../entities';

export const getPastPlayers = (teamId: string) =>
  PlayerModel.aggregate([
    {
      $match: { teamIds: new mongoose.Types.ObjectId(teamId), isActive: false },
    },
    {
      $lookup: {
        from: 'teamseasons',
        localField: 'seasonIds',
        foreignField: '_id',
        as: 'seasonIds',
      },
    },
    {
      $project: {
        name: '$name',
        image: '$image.url',
        position: '$position',
        nationality: '$nationality',
        joined: {
          $min: '$seasonIds.yearStarted',
        },
        left: { $max: '$seasonIds.yearEnded' },
        seasons: { $size: '$seasonIds' },
      },
    },
    {
      $sort: {
        left: -1,
      },
    },
  ]).exec();
