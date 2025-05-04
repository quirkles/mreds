import { randomUUID } from 'crypto';
import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import { Team, TeamModel, UserModel } from '../../entities';
import { isUserOrgAdmin, isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class TeamMutationsResolver {
  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Team)
  async addTeam(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('data')
    { teamName, yearFounded, location, country, isActive }: Types.AddTeamInput
  ): Promise<Team | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const newTeam = new TeamModel({
        teamName,
        yearFounded,
        location,
        country,
        trophies: [],
        orgId,
        adminIds: [authUser._id],
        playerIds: [],
        isActive,
      });
      const team = await newTeam.save();
      const user = await UserModel.findById({ _id: authUser._id });
      if (user) {
        user.teamIds.push(team._id);
        if (!user.roles.includes(ROLES.TEAM_ADMIN)) {
          user.roles.push(ROLES.TEAM_ADMIN);
        }
        user.save();
      }
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the team');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Team)
  async updateTeamDetails(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data')
    {
      teamName,
      yearFounded,
      location,
      country,
      stadiumName,
      stadiumLocation,
      stadiumCapacity,
      stadiumSurface,
      homeShirt,
      homeShorts,
      homeSocks,
      awayShirt,
      awayShorts,
      awaySocks,
      kitsBackground,
      isActive,
    }: Types.UpdateTeamInput
  ): Promise<Team | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const team = await TeamModel.findByIdAndUpdate(
        { _id: teamId },
        {
          teamName,
          yearFounded,
          location,
          country,
          stadiumName,
          stadiumLocation,
          stadiumCapacity,
          stadiumSurface,
          homeShirt,
          homeShorts,
          homeSocks,
          awayShirt,
          awayShorts,
          awaySocks,
          kitsBackground,
          isActive,
        }
      );
      if (!team) {
        return new ApolloError('Something went wrong while fetching the team');
      }
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the team');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Team)
  async updateTeamRoles(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data')
    { name, role, contact }: Types.UpdateTeamRolesInput
  ): Promise<Team | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const team = await TeamModel.findById({ _id: teamId });
      if (!team) {
        return new ApolloError('Something went wrong while fetching the team');
      }
      const roleId = randomUUID();
      team.teamRoles.push({ name, role, contact, roleId });
      await team.save();
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the team');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Team)
  async deleteTeamRole(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('roleId') roleId: string
  ): Promise<Team | undefined | null | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      return await TeamModel.findByIdAndUpdate(
        { _id: teamId },
        {
          $pull: {
            teamRoles: {
              roleId: roleId,
            },
          },
        }
      )
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.log(error);
          return new ApolloError(
            'Something went wrong while deleting the role'
          );
        });
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the role');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Team)
  async editTeamBadge(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data', { validate: false }) { public_id, url }: Types.EditBadgeInput
  ): Promise<Team | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const team = await TeamModel.findById({ _id: teamId });
      if (!team) {
        return new ApolloError('Something went wrong while fetching the team');
      }
      team.teamBadge = {
        public_id,
        url,
      };
      await team.save();
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while updating the team badge'
      );
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Team)
  async deleteTeam(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string
  ): Promise<Team | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const team = await TeamModel.findByIdAndDelete({ _id: teamId });
      if (!team) {
        return new ApolloError('Something went wrong while deleting the team');
      }
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the team');
    }
  }
}
