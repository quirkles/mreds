import { MaxLength, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import {
  MAX_TEXT_LENGTH_MID,
  MIN_TEXT_LENGTH,
} from '../../constants/constants';

@InputType()
export class AddPlayerInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  name: string;

  @Field()
  position: string;

  @Field()
  squadNumber: string;

  @Field()
  isCaptain: boolean;

  @Field()
  isViceCaptain: boolean;

  @Field()
  isHallOfFame: boolean;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  dateOfBirth: string;

  @Field({ nullable: true })
  nationality: string;

  @Field()
  yearJoined: string;

  @Field(() => [String])
  seasonIds: string[];
}

@InputType()
export class EditPlayerInput {
  @Field()
  @MinLength(MIN_TEXT_LENGTH)
  @MaxLength(MAX_TEXT_LENGTH_MID)
  name: string;

  @Field()
  position: string;

  @Field()
  squadNumber: string;

  @Field()
  isCaptain: boolean;

  @Field()
  isViceCaptain: boolean;

  @Field()
  isHallOfFame: boolean;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  dateOfBirth: string;

  @Field({ nullable: true })
  nationality: string;

  @Field()
  yearJoined: string;

  @Field(() => [String])
  seasonIds: string[];
}

@InputType()
export class EditPhotoInput {
  @Field()
  public_id: string;
  @Field()
  url: string;
}

@ObjectType()
export class PlayerStats {
  @Field()
  _id: string;
  @Field()
  minutes: number;
  @Field()
  apps: number;
  @Field()
  isStarter: boolean;
  @Field()
  goals: number;
  @Field()
  assists: number;
  @Field()
  mvp: number;
  @Field()
  conceded: number;
  @Field()
  ownGoals: number;
  @Field()
  pensScored: number;
  @Field()
  pensMissed: number;
  @Field()
  pensSaved: number;
  @Field()
  cleanSheet: number;
  @Field()
  redCard: number;
  @Field()
  yellowCards: number;
  @Field()
  goalsFor: number;
  @Field()
  goalsAgainst: number;
  @Field()
  difference: number;
  @Field()
  wins: number;
  @Field()
  draws: number;
  @Field()
  defeats: number;
  @Field()
  gamesWithGoal: number;
  @Field()
  gamesWithAssist: number;
  @Field()
  gamesWithGoalAndAssist: number;
  @Field()
  gamesWithGoalOrAssist: number;
}

@ObjectType()
export class TopPlayer {
  @Field()
  _id: string;
  @Field()
  minutes: number;
  @Field()
  apps: number;
  @Field()
  isStarter: boolean;
  @Field()
  goals: number;
  @Field()
  assists: number;
  @Field()
  mvp: number;
  @Field()
  conceded: number;
  @Field()
  ownGoals: number;
  @Field()
  pensScored: number;
  @Field()
  pensMissed: number;
  @Field()
  pensSaved: number;
  @Field()
  cleanSheet: number;
  @Field()
  redCard: number;
  @Field()
  yellowCards: number;
  @Field()
  goalsFor: number;
  @Field()
  goalsAgainst: number;
  @Field()
  difference: number;
  @Field()
  wins: number;
  @Field()
  draws: number;
  @Field()
  defeats: number;
  @Field()
  gamesWithGoal: number;
  @Field()
  gamesWithAssist: number;
  @Field()
  gamesWithGoalAndAssist: number;
  @Field()
  gamesWithGoalOrAssist: number;
}

@ObjectType()
export class PastPlayer {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  image: string;
  @Field()
  position: string;
  @Field()
  nationality: string;
  @Field()
  joined: string;
  @Field()
  left: string;
  @Field()
  seasons: number;
}

@ObjectType()
export class MostGoalsAndAssists {
  @Field()
  maxGoals: number;
  @Field()
  maxAssists: number;
}

@ObjectType()
export class MostByPlayerMatches {
  @Field()
  _id: string;
  @Field()
  teamGoals: number;
  @Field()
  opponentGoals: number;
  @Field()
  date: string;
  @Field()
  opponent: string;
  @Field()
  total: number;
}
