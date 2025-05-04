import { ApolloError } from 'apollo-server-core';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import * as Types from './types';
import { ROLES } from '../../constants/constants';
import { Player, PlayerModel } from '../../entities';
import { isUserTeamAdmin } from '../../middleware';
import { IContext } from '../../types';

@Resolver()
export class PlayerMutationsResolver {
  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Player)
  async addPlayer(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('data')
    {
      name,
      nationality,
      dateOfBirth,
      position,
      squadNumber,
      yearJoined,
      isActive,
      isCaptain,
      isViceCaptain,
      isHallOfFame,
      seasonIds,
    }: Types.AddPlayerInput
  ): Promise<Player | ApolloError> {
    if (seasonIds.length === 0) {
      return new ApolloError('No seasons selected');
    }
    isUserTeamAdmin(authUser, teamId);
    try {
      const newPlayer = new PlayerModel({
        name,
        nationality,
        dateOfBirth,
        position,
        squadNumber,
        yearJoined,
        isCaptain,
        isViceCaptain,
        isHallOfFame,
        isActive,
        seasonIds,
        teamIds: [teamId],
      });
      const player = await newPlayer.save();
      return player;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the player');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Player)
  async updatePlayer(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string,
    @Arg('data')
    {
      name,
      nationality,
      dateOfBirth,
      position,
      squadNumber,
      yearJoined,
      isActive,
      isCaptain,
      isViceCaptain,
      isHallOfFame,
      seasonIds,
    }: Types.EditPlayerInput
  ): Promise<Player | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    if (seasonIds.length === 0) {
      return new ApolloError('No seasons selected');
    }
    try {
      const player = await PlayerModel.findByIdAndUpdate(
        { _id: playerId },
        {
          name,
          nationality,
          dateOfBirth,
          position,
          squadNumber,
          yearJoined,
          isCaptain,
          isViceCaptain,
          isHallOfFame,
          isActive,
          seasonIds,
        }
      );
      if (!player) {
        return new ApolloError(
          'Something went wrong while updating the player'
        );
      }
      return player;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while creating the player');
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Player)
  async editPlayerPhoto(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string,
    @Arg('data', { validate: false }) { public_id, url }: Types.EditPhotoInput
  ): Promise<Player | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const player = await PlayerModel.findById({ _id: playerId });
      if (!player) {
        return new ApolloError(
          'Something went wrong while fetching the player'
        );
      }
      player.image = {
        public_id,
        url,
      };
      await player.save();
      return player;
    } catch (error) {
      console.log(error);
      return new ApolloError(
        'Something went wrong while updating the player photo'
      );
    }
  }

  @Authorized(ROLES.TEAM_ADMIN)
  @Mutation(() => Player)
  async deletePlayer(
    @Ctx() { authUser }: IContext,
    @Arg('teamId') teamId: string,
    @Arg('playerId') playerId: string
  ): Promise<Player | ApolloError> {
    isUserTeamAdmin(authUser, teamId);
    try {
      const player = await PlayerModel.findByIdAndDelete({
        _id: playerId,
      });
      if (!player) {
        return new ApolloError(
          'Something went wrong while deleting the player'
        );
      }
      return player;
    } catch (error) {
      console.log(error);
      return new ApolloError('Something went wrong while deleting the player');
    }
  }
}
