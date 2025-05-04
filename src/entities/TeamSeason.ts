import { prop as Property, Severity, modelOptions } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Award } from './Award';

@ObjectType({ description: 'The Team Season model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class TeamSeason {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  yearStarted: string;

  @Field()
  @Property()
  yearEnded: string;

  @Field(() => [Award])
  @Property({ default: [] })
  awards: Award[];

  @Field({ nullable: true })
  @Property()
  leaguePosition: number;

  @Field({ nullable: true })
  @Property()
  division: string;

  @Field(() => ID)
  @Property()
  teamId: string;

  @Field({ nullable: true })
  @Property()
  comment: string;
}
