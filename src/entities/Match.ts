import {
  prop as Property,
  Ref,
  Severity,
  modelOptions,
} from '@typegoose/typegoose';
import { ObjectId } from 'mongoose';
import { ObjectType, Field, ID } from 'type-graphql';
import { TeamSeason, Team, Competition } from '.';
import { PlayerInMatch } from './types/PlayerInMatch';

@ObjectType({ description: 'The Match model' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class Match {
  @Field(() => ID)
  _id: ObjectId;

  @Field()
  @Property()
  date: string;

  @Field(() => Competition)
  @Property({ ref: () => Competition })
  competitionId: Ref<Competition>;

  @Field(() => TeamSeason)
  @Property({ ref: () => TeamSeason })
  seasonId: Ref<TeamSeason>;

  @Field(() => Team)
  @Property({ ref: () => Team })
  teamId: Ref<Team>;

  @Field(() => Team)
  @Property({ ref: () => Team })
  opponentId: Ref<Team>;

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

  @Field(() => [PlayerInMatch])
  @Property()
  matchPlayers: PlayerInMatch[];
}
