import { prop as Property } from '@typegoose/typegoose';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CompetitionInput {
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
  @Property({ max: 15 })
  playersPerTeam: number;

  @Field()
  @Property({ max: 999 })
  numberOfTeams: number;

  @Field()
  @Property({ default: true })
  isActive: boolean;
}
