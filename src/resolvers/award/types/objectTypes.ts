import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AwardByPlayer {
  @Field()
  _id: string;

  @Field()
  season: string;

  @Field()
  awardName: string;

  @Field({ nullable: true })
  awardValue: number;

  @Field({ nullable: true })
  comment: string;
}

@ObjectType()
export class AwardWinner {
  @Field()
  id: string;
  @Field()
  name: string;
}
