import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class TrophyTotals {
  @Field()
  _id: string;
  @Field()
  total: number;
  @Field()
  winner: number;
  @Field()
  final: number;
}

@ObjectType()
export class TrophyResponse {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  season: string;
  @Field()
  isWinner: boolean;
  @Field()
  isFinal: boolean;
  @Field({ nullable: true })
  comment: string;
  @Field({ nullable: true })
  opponent: string;
}

@InputType()
export class TrophyByPlayer {
  @Field(() => [String])
  seasonIds: string[];
}
