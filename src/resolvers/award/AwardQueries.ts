import { ApolloError } from 'apollo-server-core';
import { Arg, Query, Resolver } from 'type-graphql';
import { getAwardsByPlayer } from './aggregators/getAwardsByPlayer';
import { getAwardsBySeason } from './aggregators/getAwardsBySeason';
import { AwardByPlayer } from './types';
import { Award } from '../../entities';

@Resolver()
export class AwardQueriesResolver {
  @Query(() => [Award])
  async awardsBySeason(
    @Arg('seasonId') seasonId: string
  ): Promise<Award[] | ApolloError> {
    try {
      const awards = await getAwardsBySeason(seasonId);
      if (!awards) {
        return [];
      }

      return awards;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => [AwardByPlayer])
  async awardsByPlayer(
    @Arg('playerId') playerId: string
  ): Promise<AwardByPlayer[] | ApolloError> {
    try {
      const awards = await getAwardsByPlayer(playerId);
      if (!awards) {
        return [];
      }

      return awards;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }
}
