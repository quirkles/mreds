import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import {
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../../constants/constants';

@InputType()
export class AddOrganizationInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  name: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  website: string;

  @Field({ nullable: true })
  yearFounded: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  city: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  country: string;
}

@InputType()
export class UpdateOrganizationInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  name: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  website: string;

  @Field({ nullable: true })
  yearFounded: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  city: string;

  @Field({ nullable: true })
  @MaxLength(MAX_TEXT_LENGTH_MID)
  country: string;
}

@InputType()
export class EditOrgBadgeInput {
  @Field()
  public_id: string;
  @Field()
  url: string;
}

@InputType()
export class AddCompetitionInput {
  @Field()
  name: string;

  @Field()
  competitionType: string;

  @Field()
  isActive: boolean;
}
