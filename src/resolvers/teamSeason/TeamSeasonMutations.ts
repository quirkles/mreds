import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import { TeamModel, TeamSeason, TeamSeasonModel } from '../../entities';
import { isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class TeamSeasonsMutationsResolver {
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => TeamSeason)
  async addTeamSeason(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data')
    {
      yearStarted,
      yearEnded,
      leaguePosition,
      division,
      comment,
    }: Types.AddTeamSeasonInput
  ): Promise<TeamSeason | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const started = new Date(yearStarted).getFullYear().toString();
      const ended = new Date(yearEnded).getFullYear().toString();
      const newTeamSeason = new TeamSeasonModel({
        name: `${started}-${ended.substring(2)}`,
        yearStarted: new Date(yearStarted).getFullYear(),
        yearEnded: new Date(yearEnded).getFullYear(),
        leaguePosition,
        comment,
        division,
        teamId,
      });
      const teamSeason = await newTeamSeason.save();
      const team = await TeamModel.findById({ _id: teamId });
      if (team) {
        team.seasonIds.push(teamSeason);
        team.save();
      }
      return teamSeason;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the season');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => TeamSeason)
  async editSeason(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string,
    @Arg('data')
    {
      yearStarted,
      yearEnded,
      leaguePosition,
      division,
      comment,
    }: Types.AddTeamSeasonInput
  ): Promise<TeamSeason | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const started = new Date(yearStarted).getFullYear().toString();
      const ended = new Date(yearEnded).getFullYear().toString();
      const teamSeason = await TeamSeasonModel.findByIdAndUpdate(
        { _id: seasonId },
        {
          name: `${started}-${ended.substring(2)}`,
          yearStarted: new Date(yearStarted).getFullYear(),
          yearEnded: new Date(yearEnded).getFullYear(),
          leaguePosition,
          division,
          comment,
          teamId,
        }
      );
      if (!teamSeason) {
        return new ApolloError('Something went wrong while editing the season');
      }
      return teamSeason;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the season');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => TeamSeason)
  async deleteSeason(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string
  ): Promise<TeamSeason | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const teamSeason = await TeamSeasonModel.findByIdAndDelete({
        _id: seasonId,
      });
      if (!teamSeason) {
        return new ApolloError(
          'Something went wrong while deleting the season'
        );
      }
      return teamSeason;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the season');
    }
  }
}
