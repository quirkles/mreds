import { ICompetition } from './IOrganization';
import { IPlayer } from './iPlayer';
import { IPlayerInMatch } from './IPlayerInMatch';
import { ITeam } from './iTeam';

export interface IMatch {
  _id: string;
  teamId: string;
  date: string;
  competitionId: string;
  seasonId: string;
  opponentId: string;
  teamGoals: number;
  opponentGoals: number;
  isHome: boolean;
  leaguePosition: number;
  cupRound: string;
  isForfeit: boolean;
  matchPlayers: Partial<IPlayerInMatch>[];
}

export interface IMatchResponse
  extends Omit<
    IMatch,
    'teamId' | 'opponentId' | 'matchPlayers' | 'competitionId'
  > {
  opponentId: string | ITeam;
  teamId: string | ITeam;
  competitionId: string | ICompetition;
  matchPlayers: Partial<IPlayerInMatch>[] | IPlayerResponse[];
}

export interface IPlayerResponse extends Omit<IPlayerInMatch, 'playerId'> {
  playerId: string | IPlayer;
}

export interface ITempMatch extends IMatch {
  teamName: string;
  opponentName: string;
  competition: ICompetition | null;
}

export type MatchStatsKeys = keyof IMatch;

export interface IMostMatch {
  _id: string;
  opponent: string;
  opponentId: string;
  teamGoals: number;
  opponentGoals: number;
  date: string;
  isHome: boolean;
}
