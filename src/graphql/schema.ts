import { buildSchema } from 'type-graphql';
import { customAuthChecker } from '../middleware';
import * as RESOLVERS from '../resolvers';

export const customSchema = buildSchema({
  resolvers: [
    RESOLVERS.OrganizationMutationsResolver,
    RESOLVERS.OrganizationQueriesResolver,
    RESOLVERS.UserQueriesResolver,
    RESOLVERS.UserMutationsResolver,
    RESOLVERS.TeamQueriesResolver,
    RESOLVERS.TeamMutationsResolver,
    RESOLVERS.PlayerQueriesResolver,
    RESOLVERS.PlayerMutationsResolver,
    RESOLVERS.TeamSeasonQueriesResolver,
    RESOLVERS.TeamSeasonsMutationsResolver,
    RESOLVERS.MatchMutationsResolver,
    RESOLVERS.MatchQueriesResolver,
    RESOLVERS.CompetitionQueriesResolver,
    RESOLVERS.CompetitionsMutationsResolver,
    RESOLVERS.TrophyQueriesResolver,
    RESOLVERS.TrophyMutationsResolver,
    RESOLVERS.AwardQueriesResolver,
    RESOLVERS.AwardMutationsResolver,
  ],
  emitSchemaFile: true,
  dateScalarMode: 'timestamp',
  authChecker: customAuthChecker,
});
