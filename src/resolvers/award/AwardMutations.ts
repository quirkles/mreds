import { ApolloError } from 'apollo-server-core';
import mongoose from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import { Award, AwardModel } from '../../entities';
import { isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class AwardMutationsResolver {
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Award)
  async addSeasonAward(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('seasonId') seasonId: string,
    @Arg('data')
    { awardName, awardValue, winners, comment }: Types.AddAwardInput
  ): Promise<Award | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const mapWinners = winners.map(
        (item) => new mongoose.Types.ObjectId(item)
      );

      const newAward = new AwardModel({
        seasonId,
        awardName,
        awardValue: +awardValue,
        winners: mapWinners,
        comment,
      });
      const award = await newAward.save();
      return award;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the award');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Award)
  async editAward(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('awardId') awardId: string,
    @Arg('seasonId') seasonId: string,
    @Arg('data')
    { awardName, awardValue, winners, comment }: Types.AddAwardInput
  ): Promise<Award | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const award = await AwardModel.findByIdAndUpdate(
        { _id: awardId },
        {
          seasonId,
          awardName,
          awardValue,
          winners,
          comment,
        }
      );
      if (!award) {
        return new ApolloError('Something went wrong while editing the award');
      }
      return award;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while editing the award');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Award)
  async deleteAward(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('awardId') awardId: string
  ): Promise<Award | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const award = await AwardModel.findByIdAndDelete({ _id: awardId });
      if (!award) {
        return new ApolloError('Something went wrong while deleting the award');
      }
      return award;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the award');
    }
  }
}
