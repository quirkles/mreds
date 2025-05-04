import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import {
  CompetitionModel,
  Competition,
  OrganizationModel,
} from '../../entities';
import { isUserOrgAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class CompetitionsMutationsResolver {
  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Competition)
  async addCompetition(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('data')
    {
      name,
      isActive,
      matchMinutes,
      competitionType,
      playersPerTeam,
      numberOfTeams,
    }: Types.CompetitionInput
  ): Promise<Competition | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const newCompetition = new CompetitionModel({
        orgId,
        name,
        competitionType,
        isActive,
        matchMinutes,
        playersPerTeam,
        numberOfTeams,
      });
      const competition = await newCompetition.save();
      const org = await OrganizationModel.findById({ _id: orgId });
      if (org) {
        if (!org.competitions.includes(competition.id)) {
          org.competitions.push(competition.id);
          org.save();
        }
      }
      return competition;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while creating the competition'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Competition)
  async updateCompetition(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('compId') compId: string,
    @Arg('data')
    {
      name,
      isActive,
      matchMinutes,
      competitionType,
      playersPerTeam,
      numberOfTeams,
    }: Types.CompetitionInput
  ): Promise<Competition | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const competition = await CompetitionModel.findByIdAndUpdate(
        { _id: compId },
        {
          name,
          isActive,
          matchMinutes,
          competitionType,
          playersPerTeam,
          numberOfTeams,
        }
      );
      if (!competition) {
        return new ApolloError(
          'Something went wrong while updating the competition'
        );
      }
      return competition;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while creating the competition'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Competition)
  async deleteCompetition(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('compId') compId: string
  ): Promise<Competition | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const competition = await CompetitionModel.findByIdAndDelete({
        _id: compId,
      });
      if (!competition) {
        return new ApolloError(
          'Something went wrong while deleting the competition'
        );
      }
      return competition;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while deleting the competition'
      );
    }
  }
}
