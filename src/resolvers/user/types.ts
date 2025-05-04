import { IsString, MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
export class SignInUserInput {
  @Field()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}

@InputType()
export class RegisterUserInput {
  @Field()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field({ nullable: true })
  username: string;
}

@InputType()
export class EditUserInput {
  @Field()
  @MinLength(5)
  email: string;

  @Field()
  @MinLength(2)
  username: string;

  @Field({ nullable: true })
  dateOfBirth: string;

  @Field({ nullable: true })
  nationality: string;
}

@InputType()
export class EditPasswordInput {
  @Field()
  password: string;
  @Field()
  @MinLength(6)
  newPassword: string;
}

@InputType()
export class EditImageInput {
  @Field()
  public_id: string;
  @Field()
  url: string;
}

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsString()
  email: string;
}

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  password: string;
  @Field()
  token: string;
}
