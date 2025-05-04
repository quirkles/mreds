import mongoose from 'mongoose';
import { MATCH_KEYS } from '../../../constants/constants';
import { MatchModel } from '../../../entities';

export const getTopPlayerStats = (teamId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
      },
    },
    {
      $project: {
        matchPlayers: MATCH_KEYS.MATCH_PLAYERS,
      },
    },
    {
      $unwind: MATCH_KEYS.MATCH_PLAYERS,
    },
    {
      $group: {
        _id: MATCH_KEYS.PLAYER_ID,
        apps: {
          $count: {},
        },
        goals: {
          $sum: MATCH_KEYS.GOALS,
        },
        assists: {
          $sum: MATCH_KEYS.ASSISTS,
        },
        mvp: {
          $sum: { $cond: [MATCH_KEYS.MVP, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        as: 'playerId',
        from: 'players',
        foreignField: '_id',
        localField: '_id',
      },
    },
    {
      $project: {
        name: { $first: '$playerId.name' },
        apps: '$apps',
        goals: '$goals',
        assists: '$assists',
        mvp: '$mvp',
      },
    },
    {
      $facet: {
        apps: [
          {
            $group: {
              _id: '$apps',
              value: {
                $first: '$apps',
              },
              names: {
                $push: { name: '$name', id: '$_id' },
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: 5,
          },
        ],
        goals: [
          {
            $group: {
              _id: '$goals',
              value: {
                $first: '$goals',
              },
              names: {
                $push: { name: '$name', id: '$_id' },
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: 5,
          },
        ],
        assists: [
          {
            $group: {
              _id: '$assists',
              value: {
                $first: '$assists',
              },
              names: {
                $push: { name: '$name', id: '$_id' },
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: 5,
          },
        ],
        mvp: [
          {
            $group: {
              _id: '$mvp',
              value: {
                $first: '$mvp',
              },
              names: {
                $push: { name: '$name', id: '$_id' },
              },
            },
          },
          {
            $sort: {
              _id: -1,
            },
          },
          {
            $limit: 5,
          },
        ],
      },
    },
  ]).exec();
