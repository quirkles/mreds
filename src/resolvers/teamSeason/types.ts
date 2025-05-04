import { Field, InputType, ObjectType } from 'type-graphql';

@InputType()
export class AddTeamSeasonInput {
  @Field()
  yearStarted: string;

  @Field()
  yearEnded: string;

  @Field({ nullable: true })
  leaguePosition: number;

  @Field({ nullable: true })
  division: string;

  @Field({ nullable: true })
  comment: string;
}

@ObjectType()
export class PositionFinishes {
  @Field({ nullable: true })
  seasonId: string;
  @Field({ nullable: true })
  name: string;
  @Field({ nullable: true })
  position: number;
  @Field({ nullable: true })
  division: string;
}
