import { prop as Property, Ref } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';
import { Team } from '../Team';

@ObjectType()
export class CompetitionWinner {
  @Field()
  @Property()
  year: string;

  @Field(() => Team)
  @Property({ ref: () => Team })
  teamId: Ref<Team>;

  @Field()
  @Property({ default: true })
  isWinner: boolean;

  @Field()
  @Property({ default: false })
  isRunnerUp: boolean;
}
