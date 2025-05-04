import {
  prop as Property,
  Ref,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Organization, TeamSeason, Trophy, User } from '.';
import { TeamRole, UploadedImage } from './types';
import {
  CURRENT_YEAR,
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../constants/constants';

@ObjectType({ description: 'The Team model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Team {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @Property({
    minlength: MIN_TEXT_LENGTH,
    maxlength: MAX_TEXT_LENGTH_MID,
    trim: true,
  })
  teamName: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field()
  @Property({ default: false })
  isVerified: boolean;

  @Field()
  @Property({ default: true })
  isActive: boolean;

  @Field(() => UploadedImage)
  @Property({ default: { url: 'default', public_id: '0' } })
  teamBadge: UploadedImage;

  @Field({ nullable: true })
  @Property({ default: String(CURRENT_YEAR) })
  yearFounded: string;

  @Field({ nullable: true })
  @Property({ default: '' })
  location: string;

  @Field({ nullable: true })
  @Property({ default: '' })
  country: string;

  @Field({ nullable: true })
  @Property({ default: '', maxlength: 50 })
  stadiumName: string;

  @Field({ nullable: true })
  @Property({ default: '', maxlength: 999 })
  stadiumLocation: string;

  @Field({ nullable: true })
  @Property({ default: '', maxlength: 5 })
  stadiumCapacity: string;

  @Field({ nullable: true })
  @Property({ minlength: 0 })
  stadiumSurface: string;

  @Field({ nullable: true })
  @Property({ default: '#ffffff' })
  homeShirt: string;

  @Field({ nullable: true })
  @Property({ default: '#ffffff' })
  homeShorts: string;

  @Field({ nullable: true })
  @Property({ default: '#ffffff' })
  homeSocks: string;

  @Field({ nullable: true })
  @Property({ default: '#000000' })
  awayShirt: string;

  @Field({ nullable: true })
  @Property({ default: '#000000' })
  awayShorts: string;

  @Field({ nullable: true })
  @Property({ default: '#000000' })
  awaySocks: string;

  @Field({ nullable: true })
  @Property({ default: '#808080' })
  kitsBackground: string;

  @Field(() => [TeamRole])
  @Property({ default: [] })
  teamRoles: TeamRole[];

  @Field(() => [ID])
  @Property({ ref: () => Trophy })
  trophies: Ref<Trophy>[];

  @Field(() => [ID])
  @Property({ ref: () => TeamSeason })
  seasonIds: Ref<TeamSeason>[];

  @Field(() => [ID])
  @Property({ ref: () => User })
  adminIds: Ref<User>[];

  @Field(() => [ID])
  @Property({ ref: () => User })
  playerIds?: Ref<User>[];

  @Field(() => Organization)
  @Property({ ref: () => Organization })
  orgId?: Ref<Organization>;
}
