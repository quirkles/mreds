import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getMatchesBySeason = (teamId: string, seasonId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
        seasonId: new mongoose.Types.ObjectId(seasonId),
      },
    },
    {
      $project: {
        date: 1,
        teamGoals: 1,
        opponentGoals: 1,
        isHome: 1,
        seasonId: 1,
        teamId: 1,
        competitionId: 1,
        opponentId: 1,
        isForfeit: 1,
      },
    },
    {
      $sort: {
        date: -1,
      },
    },
    {
      $lookup: {
        as: 'competitionId',
        from: 'competitions',
        foreignField: '_id',
        localField: 'competitionId',
      },
    },
    {
      $lookup: {
        as: 'teamId',
        from: 'teams',
        foreignField: '_id',
        localField: 'teamId',
      },
    },
    {
      $lookup: {
        as: 'opponentId',
        from: 'teams',
        foreignField: '_id',
        localField: 'opponentId',
      },
    },
    {
      $lookup: {
        as: 'seasonId',
        from: 'teamseasons',
        foreignField: '_id',
        localField: 'seasonId',
      },
    },
    {
      $project: {
        date: '$date',
        isHome: '$isHome',
        teamName: {
          $first: '$teamId.teamName',
        },
        opponentName: {
          $first: '$opponentId.teamName',
        },
        opponentBadge: {
          $first: '$opponentId.teamBadge.url',
        },
        teamGoals: '$teamGoals',
        opponentGoals: '$opponentGoals',
        competition: {
          $first: '$competitionId.name',
        },
        isForfeit: '$isForfeit',
      },
    },
  ]);
