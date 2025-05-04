import { prop as Property } from '@typegoose/typegoose';
import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class AddTrophyInput {
  @Field()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @Field()
  @Property()
  seasonId: string;

  @Field()
  @Property()
  year: string;

  @Field()
  isWinner: boolean;

  @Field()
  isFinal: boolean;

  @Field({ nullable: true })
  @MaxLength(200)
  comment: string;

  @Field({ nullable: true })
  opponent: string;
}

@InputType()
export class EditTrophyInput {
  @Field()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  @Field()
  @Property()
  seasonId: string;

  @Field()
  @Property()
  year: string;

  @Field()
  isWinner: boolean;

  @Field()
  isFinal: boolean;

  @Field({ nullable: true })
  @MaxLength(200)
  comment: string;

  @Field({ nullable: true })
  opponent: string;
}
