import { ApolloError } from 'apollo-server-core';
import { Arg, Query, Resolver } from 'type-graphql';
import {
  getAllTimeMatchStats,
  getMatchStats,
  getMostAssistsInMatch,
  getMostGoalsInMatch,
  getOpponentTable,
  getPlayerVsStats,
} from './aggregators';
import { getAllTimeSquadStats } from './aggregators/getAllTimeSquadStats';
import { getBestMatches } from './aggregators/getBestMatches';
import { getMatchesByOpponent } from './aggregators/getMatchesByOpponent';
import { getMatchesBySeason } from './aggregators/getMatchesBySeason';
import { getPlayerSeasonStats } from './aggregators/getPlayerSeasonStats';
import { getTopPlayerStats } from './aggregators/getTopPlayerStats';
import {
  MatchStats,
  MatchesBySeason,
  MostInMatch,
  MostGoalsStats,
  SquadSeasonStats,
  TopPlayerStats,
  OpponentTable,
  SquadAllTimeStats,
  PlayerVsStats,
} from './types/objectTypes';
import { MatchModel } from '../../entities';
import { Match } from '../../entities/Match';

@Resolver()
export class MatchQueriesResolver {
  @Query(() => [MatchesBySeason])
  async matchesBySeason(
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string,
    @Arg('limit') limit: number,
    @Arg('offset') offset: number
  ): Promise<MatchesBySeason[] | ApolloError> {
    try {
      const matches = await getMatchesBySeason(teamId, seasonId);
      const data = matches.slice(offset, offset + limit);
      if (!data) {
        return new ApolloError('Could not find a match with that ID');
      }
      return data;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => Match)
  async matchById(
    @Arg('matchId') matchId: string
  ): Promise<Match | ApolloError> {
    try {
      const match = await MatchModel.findById({ _id: matchId })
        .populate({
          path: 'teamId',
          select: 'teamName teamBadge',
        })
        .populate({
          path: 'opponentId',
          select: 'teamName teamBadge',
        })
        .populate({
          path: 'matchPlayers',
          populate: {
            path: 'playerId',
            model: 'Player',
            select: '_id name position',
          },
        })
        .populate({
          path: 'competitionId',
          select: 'name competitionType',
        });
      if (!match) {
        return new ApolloError('Could not find a match with that ID');
      }

      return match;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [MatchesBySeason])
  async matchesByOpponent(
    @Arg('teamId') teamId: string,
    @Arg('opponentId') opponentId: string
  ): Promise<MatchesBySeason[] | ApolloError> {
    try {
      const matches = await getMatchesByOpponent(teamId, opponentId);
      if (!matches) {
        return new ApolloError('Could not find a match with that ID');
      }
      return matches;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => MatchStats)
  async matchStats(
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string
  ): Promise<MatchStats[] | ApolloError> {
    try {
      const stats = await getMatchStats(teamId, seasonId);
      return stats[0] || [];
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => MatchStats)
  async allTimeMatchStats(
    @Arg('teamId') teamId: string
  ): Promise<MatchStats[] | ApolloError> {
    try {
      const stats = await getAllTimeMatchStats(teamId);

      return stats[0] || [];
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => MostGoalsStats)
  async highLowStats(
    @Arg('teamId') teamId: string
  ): Promise<MostGoalsStats | ApolloError> {
    try {
      const bestMatches = await getBestMatches(teamId);

      return bestMatches[0] || [];
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => TopPlayerStats)
  async topPlayerStats(
    @Arg('teamId') teamId: string
  ): Promise<TopPlayerStats | ApolloError> {
    try {
      const playerStats = await getTopPlayerStats(teamId);

      return playerStats[0] || [];
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [SquadSeasonStats])
  async squadSeasonStats(
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string
  ): Promise<SquadSeasonStats[] | ApolloError> {
    try {
      const stats = await getPlayerSeasonStats(teamId, seasonId);
      if (!stats) {
        return new ApolloError('Could not find any players');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [SquadAllTimeStats])
  async allTimeSquadStats(
    @Arg('teamId') teamId: string
  ): Promise<SquadAllTimeStats[] | ApolloError> {
    try {
      const stats = await getAllTimeSquadStats(teamId);
      if (!stats) {
        return new ApolloError('Could not find any players');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [MostInMatch])
  async mostGoalsInGame(
    @Arg('teamId') teamId: string
  ): Promise<MostInMatch[] | ApolloError> {
    try {
      const stats = await getMostGoalsInMatch(teamId);
      if (!stats) {
        return new ApolloError('Could not find any matches');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }
  @Query(() => [MostInMatch])
  async mostAssistsInGame(
    @Arg('teamId') teamId: string
  ): Promise<MostInMatch[] | ApolloError> {
    try {
      const stats = await getMostAssistsInMatch(teamId);
      if (!stats) {
        return new ApolloError('Could not find any matches');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [OpponentTable])
  async opponentTable(
    @Arg('teamId') teamId: string
  ): Promise<OpponentTable[] | ApolloError> {
    try {
      const stats = await getOpponentTable(teamId);
      if (!stats) {
        return new ApolloError('Could not find any matches');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PlayerVsStats])
  async playerVsStats(
    @Arg('playerId') playerId: string
  ): Promise<PlayerVsStats[] | ApolloError> {
    try {
      const stats = await getPlayerVsStats(playerId);
      if (!stats) {
        return new ApolloError('Could not find any player stats');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }
}
