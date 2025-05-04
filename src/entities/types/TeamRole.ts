import { prop as Property } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class TeamRole {
  @Field()
  @Property()
  roleId: string;

  @Field()
  @Property()
  role: string;

  @Field()
  @Property()
  name: string;

  @Field()
  @Property()
  contact: string;
}
