import {
  prop as Property,
  Severity,
  getModelForClass,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { UploadedImage } from './types';
import {
  CURRENT_YEAR,
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../constants/constants';

@ObjectType({ description: 'The User model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class User {
  @Field(() => ID)
  _id: ObjectId;

  @Field(() => [String])
  @Property({ default: ['user'] })
  roles: string[];

  @Field()
  @Property({
    minlength: MIN_TEXT_LENGTH,
    maxlength: MAX_TEXT_LENGTH_MID,
    trim: true,
  })
  username: string;

  @Field()
  @Property({
    minlength: 6,
  })
  password: string;

  @Field()
  @Property({
    minlength: 5,
    maxlength: MAX_TEXT_LENGTH_MID,
    unique: true,
    trim: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  })
  email: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field()
  @Property({ default: false })
  isVerified: boolean;

  @Field({ nullable: true })
  @Property()
  verificationToken: string;

  @Field(() => UploadedImage)
  @Property({ default: { url: 'default', public_id: '0' } })
  image: UploadedImage;

  @Field({ nullable: true })
  @Property()
  dateOfBirth: string;

  @Field({ nullable: true })
  @Property({ minlength: 0 })
  nationality: string;

  @Field()
  @Property({ default: CURRENT_YEAR })
  yearJoined: string;

  @Field(() => ID)
  @Property()
  playerId: ObjectId;

  @Field(() => [ID])
  @Property()
  teamIds: [ObjectId];

  @Field(() => [ID])
  @Property()
  orgIds: [ObjectId];
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
