import { prop as Property } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class UploadedImage {
  @Field()
  @Property({ default: 'default' })
  url: string;

  @Field()
  @Property({ default: '' })
  public_id: string;
}
