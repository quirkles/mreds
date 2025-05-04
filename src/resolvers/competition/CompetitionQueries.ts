import { ApolloError } from 'apollo-server-core';
import { Arg, Query, Resolver } from 'type-graphql';
import { CompetitionModel } from '../../entities';
import { Competition } from '../../entities/Competition';

@Resolver()
export class CompetitionQueriesResolver {
  @Query(() => [Competition])
  async competitionsByOrg(
    @Arg('orgId') orgId: string
  ): Promise<Competition[] | ApolloError> {
    try {
      const competitions = await CompetitionModel.find({ orgId: orgId }).sort({
        name: 'asc',
      });
      if (!competitions) {
        return [];
      }
      return competitions;
    } catch (error) {
      console.log(error);
      return new ApolloError(error as string);
    }
  }

  @Query(() => Competition)
  async competitionById(
    @Arg('compId') compId: string
  ): Promise<Competition | ApolloError> {
    try {
      const competition = await CompetitionModel.findById({ _id: compId });
      if (!competition) {
        return new ApolloError('There was a problem fetching the competition');
      }
      return competition;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while fetching the competition'
      );
    }
  }
}
