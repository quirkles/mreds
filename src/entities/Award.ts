import {
  prop as Property,
  Ref,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Player } from './Player';
import { TeamSeason } from './TeamSeason';
import { AwardWinner } from '../resolvers/award/types';

@ObjectType()
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Award {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => TeamSeason)
  @Property({ ref: () => TeamSeason })
  seasonId: Ref<TeamSeason>;

  @Field()
  @Property({ maxlength: 50 })
  awardName: string;

  @Field(() => [String])
  @Property()
  winners: Ref<Player[]>;

  @Field({ nullable: true })
  @Property()
  awardValue: number;

  @Field({ nullable: true })
  @Property({ maxlength: 200 })
  comment: string;
}
