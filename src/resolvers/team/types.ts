import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import {
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../../constants/constants';

@InputType()
export class AddTeamInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  teamName: string;

  @Field({ nullable: true })
  yearFounded: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  location: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  country: string;

  @Field()
  isActive: boolean;
}

@InputType()
export class UpdateTeamInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  teamName: string;

  @Field({ nullable: true })
  yearFounded: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  location: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  country: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  stadiumName: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  stadiumLocation: string;

  @Field({ nullable: true })
  stadiumCapacity: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  stadiumSurface: string;

  @Field({ nullable: true })
  homeShirt: string;

  @Field({ nullable: true })
  homeShorts: string;

  @Field({ nullable: true })
  homeSocks: string;

  @Field({ nullable: true })
  awayShirt: string;

  @Field({ nullable: true })
  awayShorts: string;

  @Field({ nullable: true })
  awaySocks: string;

  @Field({ nullable: true })
  kitsBackground: string;

  @Field()
  isActive: boolean;
}

@InputType()
export class UpdateTeamRolesInput {
  @Field()
  @MaxLength(MAX_TEXT_LENGTH_MID)
  role: string;

  @Field()
  @MaxLength(MAX_TEXT_LENGTH_MID)
  name: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  contact: string;
}

@InputType()
export class EditBadgeInput {
  @Field()
  public_id: string;
  @Field()
  url: string;
}
