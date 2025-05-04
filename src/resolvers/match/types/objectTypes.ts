import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class MatchStats {
  @Field({ nullable: true })
  _id: string;
  @Field({ nullable: true })
  total: number;
  @Field({ nullable: true })
  scored: number;
  @Field({ nullable: true })
  teamAvg: number;
  @Field({ nullable: true })
  conceded: number;
  @Field({ nullable: true })
  oppAvg: number;
  @Field({ nullable: true })
  wins: number;
  @Field({ nullable: true })
  draws: number;
  @Field({ nullable: true })
  defeats: number;
  @Field({ nullable: true })
  difference: number;
}

@ObjectType()
export class MostGoalsMatches {
  @Field()
  _id: string;
  @Field()
  opponent: string;
  @Field()
  opponentId: string;
  @Field()
  teamGoals: number;
  @Field()
  opponentGoals: number;
  @Field()
  date: string;
  @Field()
  isHome: boolean;
}

@ObjectType()
export class MostGoalsStats {
  @Field(() => [MostGoalsMatches], { nullable: true })
  maxDiff: MostGoalsMatches[];
  @Field(() => [MostGoalsMatches], { nullable: true })
  minDiff: MostGoalsMatches[];
  @Field(() => [MostGoalsMatches], { nullable: true })
  maxGoals: MostGoalsMatches[];
  @Field(() => [MostGoalsMatches], { nullable: true })
  maxConceded: MostGoalsMatches[];
}

@ObjectType()
export class TopStatName {
  @Field()
  id: string;
  @Field()
  name: string;
}

@ObjectType()
export class TopStatNames {
  @Field()
  _id: number;
  @Field()
  value: number;
  @Field(() => [TopStatName])
  names: TopStatName[];
}

@ObjectType()
export class TopPlayerStats {
  @Field(() => [TopStatNames], { nullable: true })
  apps: TopStatNames[];
  @Field(() => [TopStatNames], { nullable: true })
  goals: TopStatNames[];
  @Field(() => [TopStatNames], { nullable: true })
  assists: TopStatNames[];
  @Field(() => [TopStatNames], { nullable: true })
  mvp: TopStatNames[];
}

@ObjectType()
export class SquadSeasonStats {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  nationality: string;
  @Field({ nullable: true })
  dateOfBirth: string;
  @Field()
  apps: number;
  @Field()
  goals: number;
  @Field()
  assists: number;
  @Field()
  mvp: number;
  @Field()
  goalsPerGame: number;
  @Field()
  assistsPerGame: number;
  @Field()
  concededPerGame: number;
  @Field()
  mvpPerGame: number;
  @Field()
  conceded: number;
  @Field()
  cleanSheets: number;
}

@ObjectType()
export class SquadAllTimeStats {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field({ nullable: true })
  nationality: string;
  @Field({ nullable: true })
  dateOfBirth: string;
  @Field()
  apps: number;
  @Field()
  goals: number;
  @Field()
  assists: number;
  @Field()
  mvp: number;
  @Field()
  goalsPerGame: number;
  @Field()
  assistsPerGame: number;
  @Field()
  concededPerGame: number;
  @Field()
  mvpPerGame: number;
  @Field()
  conceded: number;
  @Field()
  cleanSheets: number;
}

@ObjectType()
export class MatchesBySeason {
  @Field()
  _id: string;
  @Field()
  date: string;
  @Field()
  isHome: boolean;
  @Field()
  teamName: string;
  @Field()
  opponentName: string;
  @Field()
  opponentBadge: string;
  @Field()
  teamGoals: number;
  @Field()
  opponentGoals: number;
  @Field()
  competition: string;
  @Field()
  isForfeit: boolean;
}

@ObjectType()
export class MostInMatch {
  @Field()
  matchId: string;
  @Field()
  date: string;
  @Field()
  player: string;
  @Field()
  opponentName: string;
  @Field()
  teamGoals: number;
  @Field()
  opponentGoals: number;
  @Field()
  total: number;
}

@ObjectType()
export class OpponentTable {
  @Field()
  _id: string;
  @Field()
  opponentName: string;
  @Field()
  opponentBadge: string;
  @Field()
  total: number;
  @Field()
  wins: number;
  @Field()
  draws: number;
  @Field()
  losses: number;
  @Field()
  totalGoalsScored: number;
  @Field()
  totalGoalsConceded: number;
  @Field()
  totalGoalDifference: number;
  @Field()
  isActive: boolean;
}

@ObjectType()
export class PlayerVsStats {
  @Field()
  opponentId: string;
  @Field()
  opponent: string;
  @Field()
  opponentName: string;
  @Field()
  opponentBadge: string;
  @Field()
  matches: number;
  @Field()
  goals: number;
  @Field()
  assists: number;
  @Field()
  conceded: number;
}
