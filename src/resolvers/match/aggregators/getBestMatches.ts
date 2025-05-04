import mongoose from 'mongoose';
import { MatchModel } from '../../../entities';

export const getBestMatches = async (teamId: string) => {
  return MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
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
      $project: {
        opponent: {
          $first: '$opponentId.teamName',
        },
        opponentId: {
          $first: '$opponentId._id',
        },
        isHome: '$isHome',
        date: '$date',
        scored: '$teamGoals',
        conceded: '$opponentGoals',
      },
    },
    {
      $group: {
        _id: 1,
        maxGoals: {
          $max: '$scored',
        },
        maxConceded: {
          $max: '$conceded',
        },
        maxDiff: {
          $max: {
            $subtract: ['$scored', '$conceded'],
          },
        },
        minDiff: {
          $max: {
            $subtract: ['$conceded', '$scored'],
          },
        },
        docs: {
          $push: {
            _id: '$_id',
            opponent: '$opponent',
            opponentId: '$opponentId',
            teamGoals: '$scored',
            opponentGoals: '$conceded',
            date: '$date',
            isHome: '$isHome',
            maxDiff: {
              $sum: {
                $subtract: ['$scored', '$conceded'],
              },
            },
            minDiff: {
              $sum: {
                $subtract: ['$conceded', '$scored'],
              },
            },
            maxGoals: {
              $max: '$scored',
            },
            maxConceded: {
              $max: '$conceded',
            },
          },
        },
      },
    },
    {
      $project: {
        maxDiff: {
          $setDifference: [
            {
              $map: {
                input: '$docs',
                as: 'doc',
                in: {
                  $cond: [
                    {
                      $eq: ['$maxDiff', '$$doc.maxDiff'],
                    },
                    '$$doc',
                    false,
                  ],
                },
              },
            },
            [false],
          ],
        },
        minDiff: {
          $setDifference: [
            {
              $map: {
                input: '$docs',
                as: 'doc',
                in: {
                  $cond: [
                    {
                      $eq: ['$minDiff', '$$doc.minDiff'],
                    },
                    '$$doc',
                    false,
                  ],
                },
              },
            },
            [false],
          ],
        },
        maxGoals: {
          $setDifference: [
            {
              $map: {
                input: '$docs',
                as: 'doc',
                in: {
                  $cond: [
                    {
                      $eq: ['$maxGoals', '$$doc.maxGoals'],
                    },
                    '$$doc',
                    false,
                  ],
                },
              },
            },
            [false],
          ],
        },
        maxConceded: {
          $setDifference: [
            {
              $map: {
                input: '$docs',
                as: 'doc',
                in: {
                  $cond: [
                    {
                      $eq: ['$maxConceded', '$$doc.maxConceded'],
                    },
                    '$$doc',
                    false,
                  ],
                },
              },
            },
            [false],
          ],
        },
      },
    },
  ]);
};
