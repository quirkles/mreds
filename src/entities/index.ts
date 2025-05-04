import { getModelForClass } from '@typegoose/typegoose';
import { Award } from './Award';
import { Competition } from './Competition';
import { Match } from './Match';
import { Organization } from './Organization';
import { Player } from './Player';
import { Team } from './Team';
import { TeamSeason } from './TeamSeason';
import { User } from './User';
export * from './Trophy';

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
export const CompetitionModel = getModelForClass(Competition);
export const OrganizationModel = getModelForClass(Organization);
export const PlayerModel = getModelForClass(Player);
export const TeamModel = getModelForClass(Team);
export const TeamSeasonModel = getModelForClass(TeamSeason);
export const MatchModel = getModelForClass(Match);
export const AwardModel = getModelForClass(Award);
export { Organization, Player, Team, TeamSeason, User, Competition, Award };
