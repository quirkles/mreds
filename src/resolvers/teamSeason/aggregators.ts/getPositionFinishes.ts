import { TeamSeasonModel } from '../../../entities';

export const getPositionFinishes = async (teamId: string) =>
  TeamSeasonModel.aggregate([
    {
      $match: {
        teamId: teamId,
      },
    },
    {
      $sort: { yearEnded: -1 },
    },
    {
      $project: {
        _id: 0,
        seasonId: '$_id',
        name: '$yearEnded',
        position: '$leaguePosition',
        division: '$division',
      },
    },
  ]).exec();
