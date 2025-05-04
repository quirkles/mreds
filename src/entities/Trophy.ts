import { prop as Property, Ref, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Team } from './Team';
import { TeamSeason } from './TeamSeason';
import {
  MAX_TEXT_LENGTH_LONG,
  MAX_TEXT_LENGTH_MID,
} from '../constants/constants';

@ObjectType({ description: 'The Trophy model' })
export class Trophy {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => Team)
  @Property({ ref: () => Team })
  teamId: Ref<Team>;

  @Field(() => TeamSeason)
  @Property({ ref: () => TeamSeason })
  seasonId: Ref<TeamSeason>;

  @Field()
  @Property({ required: true, maxlength: MAX_TEXT_LENGTH_MID })
  name: string;

  @Field()
  @Property()
  year: string;

  @Field()
  @Property()
  isWinner: boolean;

  @Field()
  @Property()
  isFinal: boolean;

  @Field({ nullable: true })
  @Property({ maxlength: MAX_TEXT_LENGTH_LONG })
  comment: string;

  @Field({ nullable: true })
  @Property({ maxlength: MAX_TEXT_LENGTH_MID })
  opponent: string;
}

export const TrophyModel = getModelForClass(Trophy);
