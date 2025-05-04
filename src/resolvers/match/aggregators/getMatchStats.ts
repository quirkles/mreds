import mongoose from 'mongoose';
import { MATCH_KEYS } from '../../../constants/constants';
import { MatchModel } from '../../../entities';

export const getMatchStats = (teamId: string, seasonId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
        seasonId: new mongoose.Types.ObjectId(seasonId),
      },
    },
    {
      $project: {
        _id: 0,
        teamGoals: MATCH_KEYS.TEAM_GOALS,
        opponentGoals: MATCH_KEYS.OPP_GOALS,
      },
    },
    {
      $group: {
        _id: 'goals',
        total: { $sum: 1 },
        scored: {
          $sum: MATCH_KEYS.TEAM_GOALS,
        },
        teamAvg: {
          $avg: MATCH_KEYS.TEAM_GOALS,
        },
        conceded: {
          $sum: MATCH_KEYS.OPP_GOALS,
        },
        oppAvg: {
          $avg: MATCH_KEYS.OPP_GOALS,
        },
        wins: {
          $sum: {
            $cond: {
              if: {
                $gt: [MATCH_KEYS.TEAM_GOALS, MATCH_KEYS.OPP_GOALS],
              },
              then: 1,
              else: 0,
            },
          },
        },
        draws: {
          $sum: {
            $cond: {
              if: {
                $eq: [MATCH_KEYS.TEAM_GOALS, MATCH_KEYS.OPP_GOALS],
              },
              then: 1,
              else: 0,
            },
          },
        },
        defeats: {
          $sum: {
            $cond: {
              if: {
                $gt: [MATCH_KEYS.OPP_GOALS, MATCH_KEYS.TEAM_GOALS],
              },
              then: 1,
              else: 0,
            },
          },
        },
        difference: {
          $sum: {
            $subtract: [MATCH_KEYS.TEAM_GOALS, MATCH_KEYS.OPP_GOALS],
          },
        },
      },
    },
  ]).exec();
