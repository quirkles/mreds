import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getPlayerSeasonStats = (teamId: string, seasonId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
        seasonId: new mongoose.Types.ObjectId(seasonId),
      },
    },
    {
      $project: {
        matchPlayers: 1,
      },
    },
    {
      $unwind: {
        path: '$matchPlayers',
      },
    },
    {
      $group: {
        _id: '$matchPlayers.playerId',
        apps: {
          $count: {},
        },
        goals: {
          $sum: '$matchPlayers.goals',
        },
        assists: {
          $sum: '$matchPlayers.assists',
        },
        conceded: {
          $sum: '$matchPlayers.conceded',
        },
        cleanSheets: {
          $sum: { $cond: ['$matchPlayers.cleanSheet', 1, 0] },
        },
        mvp: {
          $sum: { $cond: ['$matchPlayers.mvp', 1, 0] },
        },
        goalsPerGame: {
          $avg: '$matchPlayers.goals',
        },
        assistsPerGame: {
          $avg: '$matchPlayers.assists',
        },
        concededPerGame: {
          $avg: '$matchPlayers.conceded',
        },
        mvpPerGame: {
          $avg: {
            $cond: ['$matchPlayers.mvp', 1, 0],
          },
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
        nationality: {
          $first: '$playerId.nationality',
        },
        dateOfBirth: {
          $first: '$playerId.dateOfBirth',
        },
        apps: '$apps',
        goals: '$goals',
        goalsPerGame: '$goalsPerGame',
        assistsPerGame: '$assistsPerGame',
        concededPerGame: '$concededPerGame',
        mvpPerGame: '$mvpPerGame',
        assists: '$assists',
        conceded: '$conceded',
        cleanSheets: '$cleanSheets',
        mvp: '$mvp',
      },
    },
  ]).exec();
