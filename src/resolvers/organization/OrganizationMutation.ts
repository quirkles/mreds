import { randomUUID } from 'crypto';
import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import {
  Organization,
  OrganizationModel,
  TeamModel,
  UserModel,
} from '../../entities';
import { isUserOrgAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class OrganizationMutationsResolver {
  @Authorized(ROLES.USER)
  @Mutation(() => Organization)
  async addOrganization(
    @Ctx() { authUser }: IContext,
    @Arg('data')
    { name, yearFounded, website, city, country }: Types.AddOrganizationInput
  ): Promise<Organization | ApolloError> {
    try {
      const newOrganization = new OrganizationModel({
        name,
        website,
        yearFounded,
        city,
        country,
        competitions: [],
        orgSeasons: [],
        adminIds: [String(authUser._id)],
      });
      const organization = await newOrganization.save();
      const user = await UserModel.findById({ _id: authUser._id });
      if (user) {
        user.orgIds.push(organization._id);
        if (!user.roles.includes(ROLES.ORG_ADMIN)) {
          user.roles.push(ROLES.ORG_ADMIN);
        }
        user.save();
      }
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while creating the organization'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Organization)
  async updateOrganization(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('data')
    { name, website, yearFounded, city, country }: Types.UpdateOrganizationInput
  ): Promise<Organization | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const organization = await OrganizationModel.findByIdAndUpdate(
        { _id: orgId },
        { name, website, yearFounded, city, country }
      );
      if (!organization) {
        return new ApolloError(
          'Something went wrong while fetching the organization'
        );
      }
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while fetching the organization'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Organization)
  async editOrgBadge(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('data', { validate: false })
    { public_id, url }: Types.EditOrgBadgeInput
  ): Promise<Organization | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const org = await OrganizationModel.findById({ _id: orgId });
      if (!org) {
        return new ApolloError(
          'Something went wrong while fetching the organization'
        );
      }
      org.badge = {
        public_id,
        url,
      };
      await org.save();
      return org;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while updating the organization badge'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Organization)
  async c(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('data', { validate: false })
    { public_id, url }: Types.EditOrgBadgeInput
  ): Promise<Organization | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const organization = await OrganizationModel.findById({ _id: orgId });
      if (!organization) {
        return new ApolloError(
          'Something went wrong while fetching the organization'
        );
      }
      organization.badge = {
        public_id,
        url,
      };
      await organization.save();
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while updating the organization badge'
      );
    }
  }

  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Organization)
  async deleteOrg(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string
  ): Promise<Organization | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const organization = await OrganizationModel.findByIdAndDelete({
        _id: orgId,
      });
      if (!organization) {
        return new ApolloError(
          'Something went wrong while deleting the organization'
        );
      }
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while deleting the organization'
      );
    }
  }
  @Authorized(ROLES.ORG_ADMIN)
  @Mutation(() => Organization)
  async addTeamToOrg(
    @Ctx() { authUser }: IContext,
    @Arg('orgId') orgId: string,
    @Arg('teamId') teamId: string
  ): Promise<Organization | ApolloError> {
    isUserOrgAdmin(authUser, orgId);
    try {
      const organization = await OrganizationModel.findById({
        _id: orgId,
      });
      if (!organization) {
        return new ApolloError(
          'Something went wrong while fetching the organization'
        );
      }
      const team = await TeamModel.findById({ _id: teamId });
      if (!team) {
        return new ApolloError('Something went wrong while fetching the team');
      }

      if (organization.teamIds.includes(teamId)) {
        organization.teamIds.push(teamId);
      }
      await organization.save();
      return organization;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while adding the team to the organization'
      );
    }
  }
}
