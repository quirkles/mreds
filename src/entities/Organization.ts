import { prop as Property, Severity, modelOptions } from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { Competition } from './Competition';
import { UploadedImage } from './types';
import { CURRENT_YEAR, MAX_TEXT_LENGTH_MID } from '../constants/constants';

@ObjectType({ description: 'The Organization model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Organization {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @Property({ minlength: 2, maxlength: MAX_TEXT_LENGTH_MID })
  name: string;

  @Field({ nullable: true })
  @Property({ maxlength: 100 })
  website: string;

  @Field()
  @Property({ default: false })
  isVerified: boolean;

  @Field(() => UploadedImage)
  @Property({ default: { url: 'default', public_id: '0' } })
  badge: UploadedImage;

  @Field({ nullable: true })
  @Property({ minlength: 0 })
  city: string;

  @Field({ nullable: true })
  @Property({ minlength: 0 })
  country: string;

  @Field({ nullable: true })
  @Property({ default: String(CURRENT_YEAR) })
  yearFounded: string;

  @Field(() => [Competition])
  @Property({ ref: () => Competition })
  competitions: Competition[];

  @Field(() => [String])
  @Property()
  adminIds: [string];

  @Field(() => [String])
  @Property()
  teamIds: [string];

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
