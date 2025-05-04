import { ApolloError } from 'apollo-server-core';
import { User } from '../entities';

export const isUserOrgAdmin = (authUser: User | null, id: string) => {
  if (!authUser) {
    return false;
  }

  const isAdmin = authUser.orgIds.map((orgId) => orgId.toString()).includes(id);

  if (!isAdmin) {
    return new ApolloError(
      'Unauthorized to perform this operation on this team'
    );
  }
};
