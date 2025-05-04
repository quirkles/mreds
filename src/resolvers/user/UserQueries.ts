import { ApolloError } from 'apollo-server-core';
import { Resolver, Query, Ctx, Authorized } from 'type-graphql';
import { ROLES } from '../../constants/constants';
import { User, UserModel } from '../../entities';
import { IContext } from '../../types';

@Resolver()
export class UserQueriesResolver {
  @Authorized(ROLES.USER)
  @Query(() => User)
  async user(@Ctx() { authUser }: IContext) {
    try {
      return authUser;
    } catch (error) {
      console.log(error);
      return new ApolloError('There was a problem fetching the user');
    }
  }

  @Authorized(ROLES.SITE_ADMIN)
  @Query(() => [User])
  async getUsers() {
    try {
      const users = await UserModel.find().sort([['name', 'asc']]);
      return users;
    } catch (error) {
      console.log(error);
      return new ApolloError('There was a problem fetching the user');
    }
  }
}
