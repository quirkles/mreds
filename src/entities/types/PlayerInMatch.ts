import { prop as Property, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Match } from '../Match';
import { Player } from '../Player';

@ObjectType()
export class PlayerInMatch {
  @Field(() => ID)
  @Property()
  _id: ObjectId;

  @Field(() => Player)
  @Property()
  playerId: Ref<Player>;

  @Field(() => Match)
  @Property({ ref: () => Match })
  match: Ref<Match>;

  @Field()
  @Property({ min: 0, max: 180, default: 0 })
  minutes: number;

  @Field({ nullable: true })
  @Property()
  matchPosition: string;

  @Field()
  @Property({ max: 1, min: 0 })
  apps: number;

  @Field()
  @Property({ default: true })
  isStarter: boolean;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  goals: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  assists: number;

  @Field()
  @Property({ default: false })
  mvp: boolean;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  conceded: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  ownGoals: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensScored: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensMissed: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensSaved: number;

  @Field()
  @Property({ default: false })
  cleanSheet: boolean;

  @Field()
  @Property({ default: false })
  redCard: boolean;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  yellowCards: number;
}
