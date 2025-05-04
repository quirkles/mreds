import { ApolloError } from 'apollo-server-core';
import mongoose from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import { Trophy, TrophyModel } from '../../entities';
import { isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class TrophyMutationsResolver {
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Trophy)
  async addTrophy(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data')
    {
      seasonId,
      name,
      year,
      opponent,
      isWinner,
      isFinal,
      comment,
    }: Types.AddTrophyInput
  ): Promise<Trophy | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const newTrophy = new TrophyModel({
        name,
        teamId,
        seasonId,
        year,
        isFinal,
        isWinner,
        opponent,
        comment,
      });
      const trophy = await newTrophy.save();
      return trophy;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the trophy');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Trophy)
  async editTrophy(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('trophyId') trophyId: string,
    @Arg('data')
    {
      name,
      seasonId,
      isFinal,
      year,
      isWinner,
      opponent,
      comment,
    }: Types.EditTrophyInput
  ): Promise<Trophy | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const trophy = await TrophyModel.findByIdAndUpdate(
        { _id: trophyId },
        {
          name,
          seasonId: new mongoose.Types.ObjectId(seasonId),
          year,
          isFinal,
          isWinner,
          opponent,
          comment,
        }
      );
      if (!trophy) {
        return new ApolloError('Something went wrong while editing the trophy');
      }
      return trophy;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while editing the trophy');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Trophy)
  async deleteTrophy(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('trophyId') trophyId: string
  ): Promise<Trophy | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const trophy = await TrophyModel.findByIdAndDelete({ _id: trophyId });
      if (!trophy) {
        return new ApolloError(
          'Something went wrong while deleting the trophy'
        );
      }
      return trophy;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the trophy');
    }
  }
}
