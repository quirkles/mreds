import { ApolloError } from 'apollo-server-core';
import { ObjectId } from 'mongoose';
import { User } from '../entities';

export const isUserTeamAdmin = (
  authUser: User | null,
  id: string | ObjectId
) => {
  if (!authUser) {
    return false;
  }

  const isAdmin = authUser.teamIds
    .map((teamId) => teamId.toString())
    .includes(id.toString());

  if (!isAdmin) {
    return new ApolloError(
      'Unauthorized to perform this operation on this team'
    );
  }
};
