import { ApolloError } from 'apollo-server-core';
import mongoose from 'mongoose';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types/inputTypes';
import { ROLES } from '../../constants/constants';
import { MatchModel } from '../../entities';
import { Match } from '../../entities/Match';
import { isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class MatchMutationsResolver {
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Match)
  async addMatch(
    @Ctx() { authUser }: IContext,
    @Arg('data')
    {
      teamId,
      seasonId,
      opponentId,
      competitionId,
      date,
      isHome,
      teamGoals,
      opponentGoals,
      leaguePosition,
      cupRound,
      isForfeit,
      matchPlayers,
    }: Types.AddMatchInput
  ): Promise<Match | ApolloError> {
    try {
      isUserTeamAdmin(authUser, teamId);
      const mapMatchPlayers = matchPlayers.map((player) => {
        return {
          ...player,
          playerId: new mongoose.Types.ObjectId(player.playerId),
        };
      });
      try {
        const dateAsString = new Date(date).toISOString();
        const newMatch = new MatchModel({
          teamId,
          seasonId,
          competitionId,
          date: dateAsString,
          isHome,
          opponentId,
          teamGoals,
          opponentGoals,
          leaguePosition,
          cupRound,
          isForfeit,
          matchPlayers: mapMatchPlayers,
        });
        const match = await newMatch.save();
        return match;
      } catch (error) {
        console.log(error);
        return new ApolloError('Something went wrong while creating the match');
      }
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while adding the match');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Match)
  async editMatch(
    @Ctx() { authUser }: IContext,
    @Arg('matchId') matchId: string,
    @Arg('data')
    {
      teamId,
      seasonId,
      opponentId,
      competitionId,
      date,
      isHome,
      teamGoals,
      opponentGoals,
      leaguePosition,
      cupRound,
      isForfeit,
      matchPlayers,
    }: Types.AddMatchInput
  ): Promise<Match | null | ApolloError> {
    try {
      isUserTeamAdmin(authUser, teamId);
      const mapMatchPlayers = matchPlayers.map((player) => {
        return {
          ...player,
          playerId: new mongoose.Types.ObjectId(player.playerId),
        };
      });

      const dateAsString = new Date(date).toISOString();
      const updatedMatch = MatchModel.findByIdAndUpdate(
        { _id: matchId },
        {
          seasonId,
          competitionId,
          date: dateAsString,
          isHome,
          opponentId,
          teamGoals,
          opponentGoals,
          leaguePosition,
          cupRound,
          isForfeit,
          matchPlayers: mapMatchPlayers,
        }
      );
      return await updatedMatch;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while updating the match');
    }
  }
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Match)
  async deleteMatch(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('matchId') matchId: string
  ): Promise<any | ApolloError> {
    try {
      isUserTeamAdmin(authUser, teamId);
      try {
        const match = await MatchModel.findByIdAndDelete({ _id: matchId });
        return match;
      } catch (error) {
        console.log(error);
        return new ApolloError('Something went wrong while deleting the match');
      }
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the match');
    }
  }
}
