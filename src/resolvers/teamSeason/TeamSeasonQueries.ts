import { ApolloError } from 'apollo-server-core';
import { Arg, Query, Resolver } from 'type-graphql';
import { getPositionFinishes } from './aggregators.ts/getPositionFinishes';
import { PositionFinishes } from './types';
import { TeamSeason, TeamSeasonModel } from '../../entities';

@Resolver()
export class TeamSeasonQueriesResolver {
  @Query(() => [TeamSeason])
  async teamSeasonsByTeam(
    @Arg('teamId') teamId: string
  ): Promise<TeamSeason[] | ApolloError> {
    try {
      const teamSeasons = await TeamSeasonModel.find({ teamId: teamId }).sort({
        yearEnded: -1,
      });
      if (!teamSeasons) {
        return [];
      }
      return teamSeasons;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => TeamSeason)
  async teamSeasonById(
    @Arg('seasonId') seasonId: string
  ): Promise<TeamSeason | ApolloError> {
    try {
      const teamSeason = await TeamSeasonModel.findById({ _id: seasonId });
      if (!teamSeason) {
        return new ApolloError('There was a problem fetching the season');
      }
      return teamSeason;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the season');
    }
  }
  @Query(() => [PositionFinishes])
  async positionFinishes(
    @Arg('teamId') teamId: string
  ): Promise<PositionFinishes[] | ApolloError> {
    try {
      const stats = await getPositionFinishes(teamId);

      if (!stats) {
        return new ApolloError('Could not find any stats');
      }
      return stats;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }
}
