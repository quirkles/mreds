import { ApolloError } from 'apollo-server-core';
import { Arg, Query, Resolver } from 'type-graphql';
import { getPlayerStatsBySeason } from './aggregators';
import { getMostAssistByPlayerMatches } from './aggregators/getMostAssistsByPlayerMatches';
import { getMostGoalsAndAssists } from './aggregators/getMostGoalsAndAssists';
import { getMostGoalsByPlayerMatches } from './aggregators/getMostGoalsByPlayerMatches';
import { getPastPlayers } from './aggregators/getPastPlayers';
import { getPlayerAllTimeStats } from './aggregators/getPlayerAllTimeStats';
import { getSquadStatsBySeason } from './aggregators/getSquadStatsBySeason';
import {
  MostByPlayerMatches,
  MostGoalsAndAssists,
  PastPlayer,
  PlayerStats,
} from './types';
import { Player, PlayerModel } from '../../entities';
import { PlayerInMatch } from '../../entities/types/PlayerInMatch';

@Resolver()
export class PlayerQueriesResolver {
  @Query(() => Player)
  async playerById(
    @Arg('playerId') playerId: string
  ): Promise<Player | ApolloError> {
    try {
      const player = await PlayerModel.findById({ _id: playerId });
      if (!player) {
        return new ApolloError('Could not find a player with that ID');
      }
      await player.populate('seasonIds');
      return player;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the player');
    }
  }
  @Query(() => [Player])
  async allPlayers(): Promise<Player[] | ApolloError> {
    try {
      const players = await PlayerModel.find({});
      if (!players) {
        return new ApolloError('Could not find any players');
      }
      return players;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the players');
    }
  }

  @Query(() => [Player])
  async playersByTeam(
    @Arg('teamId') teamId: string
  ): Promise<Player[] | ApolloError> {
    try {
      const players = await PlayerModel.find({ teamIds: teamId });
      if (!players) {
        return new ApolloError('Could not find any players');
      }
      return players;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the players');
    }
  }

  @Query(() => [Player])
  async playersBySeason(
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string
  ): Promise<Player[] | ApolloError> {
    if (!seasonId) return [];
    try {
      const players = await PlayerModel.find({
        teamIds: teamId,
        seasonIds: seasonId,
      }).sort({ name: 'asc' });

      if (!players) {
        return [];
      }
      return players;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PlayerInMatch])
  async playersSeasonStats(
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string
  ): Promise<PlayerInMatch[] | ApolloError> {
    if (!seasonId) return [];
    try {
      const playerStats = await getSquadStatsBySeason(teamId, seasonId);
      if (!playerStats) {
        return [];
      }
      return playerStats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PlayerStats])
  async playerSeasonStats(
    @Arg('seasonId') seasonId: string,
    @Arg('playerId') playerId: string
  ): Promise<PlayerStats[] | ApolloError> {
    if (!seasonId) return [];

    try {
      const playerStats = await getPlayerStatsBySeason(seasonId, playerId);
      if (!playerStats) {
        return [];
      }
      return playerStats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PlayerStats])
  async playerAllTimeStats(
    @Arg('playerId') playerId: string
  ): Promise<PlayerStats[] | ApolloError> {
    try {
      const playerStats = await getPlayerAllTimeStats(playerId);
      if (!playerStats) {
        return [];
      }
      return playerStats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PlayerStats])
  async topPlayerStats(
    @Arg('playerId') playerId: string
  ): Promise<PlayerStats[] | ApolloError> {
    try {
      const playerStats = await getPlayerAllTimeStats(playerId);
      if (!playerStats) {
        return [];
      }
      return playerStats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [PastPlayer])
  async pastPlayers(
    @Arg('teamId') teamId: string
  ): Promise<PastPlayer[] | ApolloError> {
    try {
      const players = await getPastPlayers(teamId);
      if (!players) {
        return new ApolloError('Could not find any players');
      }
      return players;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the players');
    }
  }

  @Query(() => [Player])
  async hallOfFamePlayers(
    @Arg('teamId') teamId: string
  ): Promise<Player[] | ApolloError> {
    try {
      const players = await PlayerModel.find({
        teamIds: teamId,
        isActive: false,
        isHallOfFame: true,
      });
      if (!players) {
        return new ApolloError('Could not find any players');
      }
      return players;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the players');
    }
  }

  @Query(() => [MostGoalsAndAssists])
  async mostGoalsAndMostAssistsByPlayer(
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string
  ): Promise<MostGoalsAndAssists[] | ApolloError> {
    try {
      const stats = await getMostGoalsAndAssists(teamId, playerId);
      if (!stats) {
        return [];
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [MostByPlayerMatches])
  async mostGoalsByPlayerInMatches(
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string
  ): Promise<MostByPlayerMatches[] | ApolloError> {
    try {
      const stats = await getMostGoalsByPlayerMatches(teamId, playerId);
      if (!stats) {
        return [];
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [MostByPlayerMatches])
  async mostAssistsByPlayerInMatches(
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string
  ): Promise<MostByPlayerMatches[] | ApolloError> {
    try {
      const stats = await getMostAssistByPlayerMatches(teamId, playerId);
      if (!stats) {
        return [];
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }
}
