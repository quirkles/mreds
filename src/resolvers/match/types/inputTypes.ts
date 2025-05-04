import { prop as Property } from '@typegoose/typegoose';
import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class PlayerInMatchInput {
  @Field(() => ID)
  playerId: string;

  @Field()
  @Property({ min: 0, max: 180, default: 0 })
  minutes: number;

  @Field()
  @Property({ default: true })
  isStarter: boolean;

  @Field({ nullable: true })
  @Property()
  matchPosition: string;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  goals: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  assists: number;

  @Field()
  @Property({ default: false })
  mvp: boolean;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  conceded: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  ownGoals: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensScored: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensMissed: number;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  pensSaved: number;

  @Field()
  @Property({ default: false })
  cleanSheet: boolean;

  @Field()
  @Property({ default: false })
  redCard: boolean;

  @Field()
  @Property({ min: 0, max: 99, default: 0 })
  yellowCards: number;
}

@InputType()
export class AddMatchInput {
  @Field()
  @Property()
  date: string;

  @Field(() => ID)
  @Property()
  competitionId: string;

  @Field(() => ID)
  @Property()
  seasonId: string;

  @Field(() => ID)
  @Property()
  teamId: string;

  @Field(() => ID)
  @Property()
  opponentId: string;

  @Field()
  @Property({ default: 0 })
  teamGoals: number;

  @Field()
  @Property({ default: 0 })
  opponentGoals: number;

  @Field()
  @Property()
  isHome: boolean;

  @Field()
  @Property()
  isForfeit: boolean;

  @Field({ nullable: true })
  @Property()
  leaguePosition: number;

  @Field({ nullable: true })
  @Property()
  cupRound: string;

  @Field(() => [PlayerInMatchInput])
  matchPlayers: [PlayerInMatchInput];
}
