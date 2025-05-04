import { ApolloError } from 'apollo-server-core';
import mongoose from 'mongoose';
import { Arg, Query, Resolver } from 'type-graphql';
import { getTrophiesByTeam } from './aggregations/getTrophiesByTeam';
import { getTrophyById } from './aggregations/getTrophyById';
import { getTrophyTotals } from './aggregations/getTrophyTotals';
import { TrophyByPlayer, TrophyResponse, TrophyTotals } from './types';
import { Trophy, TrophyModel } from '../../entities';

@Resolver()
export class TrophyQueriesResolver {
  @Query(() => [TrophyResponse])
  async trophiesByTeam(
    @Arg('teamId') teamId: string
  ): Promise<TrophyResponse[] | ApolloError> {
    try {
      const trophies = await getTrophiesByTeam(teamId);
      if (!trophies) {
        return [];
      }
      return trophies;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [Trophy])
  async trophiesByPlayer(
    @Arg('data') { seasonIds }: TrophyByPlayer
  ): Promise<Trophy[] | ApolloError> {
    try {
      const mappedIds = seasonIds.map((id) => new mongoose.Types.ObjectId(id));
      const trophies = await TrophyModel.find({
        seasonId: { $in: mappedIds },
      }).sort({ year: -1 });
      if (!trophies) {
        return [];
      }
      return trophies;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => TrophyTotals)
  async trophyTotals(
    @Arg('teamId') teamId: string
  ): Promise<TrophyTotals | ApolloError> {
    try {
      const totals = await getTrophyTotals(teamId);
      if (!totals[0]) {
        return new ApolloError('Could not find any trophies');
      }
      return totals[0];
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => TrophyResponse)
  async trophyById(
    @Arg('trophyId') trophyId: string
  ): Promise<TrophyResponse | ApolloError> {
    try {
      const trophy = await getTrophyById(trophyId);
      if (!trophy[0]) {
        return new ApolloError('There was a problem fetching the trophy');
      }
      return trophy[0];
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while fetching the trophy');
    }
  }
}
