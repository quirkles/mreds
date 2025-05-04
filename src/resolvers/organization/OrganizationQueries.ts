import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { ROLES } from '../../constants/constants';
import {
  Organization,
  OrganizationModel,
  Team,
  TeamModel,
} from '../../entities';
import { IContext } from '../../types';

@Resolver()
export class OrganizationQueriesResolver {
  @Query(() => Organization)
  async organizationById(
    @Arg('orgId') orgId: string
  ): Promise<Organization | ApolloError> {
    try {
      const organization = await OrganizationModel.findById({
        _id: orgId,
      }).populate({
        path: 'competitions',
      });
      if (!organization) {
        return new ApolloError('Could not find an organization with that ID');
      }
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while fetching the organization'
      );
    }
  }
  @Authorized(ROLES.USER)
  @Query(() => [Organization])
  async userOrganizations(
    @Ctx() { authUser }: IContext
  ): Promise<Organization[] | ApolloError> {
    try {
      const organizations = await OrganizationModel.find({
        adminIds: authUser._id,
      });
      if (!organizations) {
        return new ApolloError(
          'Something went wrong while fetching the organizations'
        );
      }
      return organizations;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while fetching the organizations'
      );
    }
  }
  @Query(() => [Team])
  async teamsByOrg(@Arg('orgId') orgId: string): Promise<Team[] | ApolloError> {
    try {
      const teams = await TeamModel.find({
        orgId: orgId,
      }).sort({ teamName: 'asc' });
      if (!teams) {
        return new ApolloError(
          'Something went wrong while fetching the organizations'
        );
      }
      return teams;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while fetching the organizations'
      );
    }
  }
}
