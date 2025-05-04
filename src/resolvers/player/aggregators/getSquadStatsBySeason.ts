import mongoose from 'mongoose';
import { MATCH_KEYS } from '../../../constants/constants';
import { MatchModel } from '../../../entities';

export const getSquadStatsBySeason = (teamId: string, seasonId: string) =>
  MatchModel.aggregate([
    {
      $match: {
        teamId: new mongoose.Types.ObjectId(teamId),
        seasonId: new mongoose.Types.ObjectId(seasonId),
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
        minutes: {
          $sum: MATCH_KEYS.MINS,
        },
        goals: {
          $sum: MATCH_KEYS.GOALS,
        },
        assists: {
          $sum: MATCH_KEYS.ASSISTS,
        },
        mvp: {
          $sum: MATCH_KEYS.MVP,
        },
      },
    },
  ]).exec();
