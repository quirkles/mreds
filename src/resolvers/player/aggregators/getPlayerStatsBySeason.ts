import mongoose from 'mongoose';
import { MATCH_KEYS } from '../../../constants/constants';
import { MatchModel } from '../../../entities';

export const getPlayerStatsBySeason = (seasonId: string, playerId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        seasonId: new mongoose.Types.ObjectId(seasonId),
        'matchPlayers.playerId': new mongoose.Types.ObjectId(playerId),
      },
    },
    {
      $project: {
        stats: '$matchPlayers',
        opponentId: '$opponentId',
        teamGoals: '$teamGoals',
        opponentGoals: '$opponentGoals',
        date: '$date',
      },
    },
    {
      $addFields: {
        stats: {
          $filter: {
            input: '$stats',
            cond: {
              $eq: ['$$this.playerId', new mongoose.Types.ObjectId(playerId)],
            },
          },
        },
      },
    },
    {
      $unwind: '$stats',
    },
    {
      $group: {
        _id: 0,
        apps: {
          $count: {},
        },
        minutes: {
          $sum: '$stats.minutes',
        },
        goals: {
          $sum: '$stats.goals',
        },
        goalsAvg: {
          $avg: '$stats.goals',
        },
        assists: {
          $sum: '$stats.assists',
        },
        ownGoals: {
          $sum: '$stats.ownGoals',
        },
        conceded: {
          $sum: '$stats.conceded',
        },
        pensScored: {
          $sum: '$stats.pensScored',
        },
        pensMissed: {
          $sum: '$stats.pensMissed',
        },
        pensSaved: {
          $sum: '$stats.pensSaved',
        },
        yellowCards: {
          $sum: '$stats.yellowCards',
        },
        redCard: {
          $sum: { $cond: ['$stats.redCard', 1, 0] },
        },
        cleanSheet: {
          $sum: { $cond: ['$stats.cleanSheet', 1, 0] },
        },
        mvp: {
          $sum: { $cond: ['$stats.mvp', 1, 0] },
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
        goalsFor: {
          $sum: '$teamGoals',
        },
        goalsAgainst: {
          $sum: '$opponentGoals',
        },
        difference: {
          $sum: {
            $subtract: [MATCH_KEYS.TEAM_GOALS, MATCH_KEYS.OPP_GOALS],
          },
        },
        gamesWithGoal: {
          $sum: {
            $cond: ['$stats.goals', 1, 0],
          },
        },
        gamesWithAssist: {
          $sum: {
            $cond: ['$stats.assists', 1, 0],
          },
        },
        gamesWithGoalAndAssist: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gte: ['$stats.goals', 1] },
                  { $gte: ['$stats.assists', 1] },
                ],
              },
              1,
              0,
            ],
          },
        },
        gamesWithGoalOrAssist: {
          $sum: {
            $cond: [
              {
                $or: [
                  { $gte: ['$stats.goals', 1] },
                  { $gte: ['$stats.assists', 1] },
                ],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]).exec();
