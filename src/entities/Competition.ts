import { prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { CompetitionWinner } from './types/CompetitionWinner';

@ObjectType()
export class Competition {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => ID)
  @Property()
  orgId: string;

  @Field()
  @Property({ maxlength: 50 })
  name: string;

  @Field()
  @Property({ maxlength: 50 })
  competitionType: string;

  @Field()
  @Property({ max: 120 })
  matchMinutes: number;

  @Field()
  @Property({ max: 25 })
  playersPerTeam: number;

  @Field()
  @Property({ max: 999 })
  numberOfTeams: number;

  @Field()
  @Property({ default: true })
  isActive: boolean;

  @Field(() => [CompetitionWinner])
  @Property()
  winners: CompetitionWinner[];
}
