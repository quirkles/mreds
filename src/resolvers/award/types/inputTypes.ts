import { prop as Property } from '@typegoose/typegoose';
import { MaxLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class AddAwardInput {
  @Field()
  @Property()
  @MaxLength(200)
  awardName: string;

  @Field(() => [String])
  @Property()
  winners: string[];

  @Field({ nullable: true })
  @Property({ maxlength: 50 })
  awardValue: number;

  @Field({ nullable: true })
  @Property()
  @MaxLength(200)
  comment: string;
}
