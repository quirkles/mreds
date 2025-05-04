import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ROLES } from '../../constants/constants';
import { Team, TeamModel } from '../../entities';
import { IContext } from '../../types';

@Resolver()
export class TeamQueriesResolver {
  @Query(() => Team)
  async teamById(@Arg('teamId') teamId: string): Promise<Team | ApolloError> {
    try {
      const team = await TeamModel.findById({ _id: teamId })
        .populate({
          path: 'orgId',
          select: 'name badge',
        })
        .exec();
      if (!team) {
        return new ApolloError('Could not find a team with that ID');
      }
      return team;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the team');
    }
  }
  @Query(() => [Team])
  async teamBySearch(
    @Arg('filter') filter: string
  ): Promise<Team[] | ApolloError> {
    try {
      const teams = await TeamModel.find({
        teamName: { $regex: new RegExp(filter, 'i') },
      }).exec();
      return teams;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the team');
    }
  }
  @Authorized(ROLES.USER)
  @Query(() => [Team])
  async userTeams(
    @Ctx() { authUser }: IContext
  ): Promise<Team[] | ApolloError> {
    try {
      const teams = await TeamModel.find({
        adminIds: authUser._id,
      });
      if (!teams) {
        return new ApolloError('Something went wrong while fetching the teams');
      }
      return teams;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the team');
    }
  }

  @Authorized(ROLES.SITE_ADMIN)
  @Query(() => Team)
  async getTeams(): Promise<Team[] | ApolloError> {
    try {
      const teams = await TeamModel.find({});
      return teams;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the teams');
    }
  }
}
