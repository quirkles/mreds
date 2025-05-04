import {
  prop as Property,
  Ref,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team, TeamSeason } from '.';
import { UploadedImage } from './types';
import {
  CURRENT_YEAR,
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../constants/constants';

@ObjectType({ description: 'The Player model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Player {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @Property({
    minlength: MIN_TEXT_LENGTH,
    maxlength: MAX_TEXT_LENGTH_MID,
    trim: true,
  })
  name: string;

  @Field()
  @Property()
  position: string;

  @Field()
  @Property({ maxlength: 3 })
  squadNumber: string;

  @Field()
  @Property({ default: false })
  isActive: boolean;

  @Field()
  @Property({ default: false })
  isCaptain: boolean;

  @Field()
  @Property({ default: false })
  isViceCaptain: boolean;

  @Field(() => UploadedImage)
  @Property({ default: { url: 'default', public_id: '0' } })
  image: UploadedImage;

  @Field({ nullable: true })
  @Property()
  dateOfBirth: string;

  @Field({ nullable: true })
  @Property({ minlength: 0 })
  nationality: string;

  @Field()
  @Property({ default: CURRENT_YEAR })
  yearJoined: string;

  @Field()
  @Property()
  isHallOfFame: boolean;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field(() => [Team])
  @Property({ ref: () => Team })
  teamIds: Ref<Team>[];

  @Field(() => [TeamSeason])
  @Property({ ref: () => TeamSeason })
  seasonIds: Ref<TeamSeason>[];
}
