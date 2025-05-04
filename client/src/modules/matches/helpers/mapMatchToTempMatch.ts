import { ITeamSeason } from 'modules/history/types';
import { ICompetition, IMatchResponse, ITeam, ITempMatch } from 'types';

export const mapMatchToTempMatch = (match: IMatchResponse): ITempMatch => {
  return {
    _id: match._id,
    teamId: (match.teamId as ITeam)._id,
    teamName: (match.teamId as ITeam).teamName,
    seasonId: (match.seasonId as unknown as ITeamSeason)._id,
    opponentId: (match.opponentId as ITeam)._id,
    opponentName: (match.opponentId as ITeam).teamName,
    competitionId: (match.competitionId as ICompetition)._id,
    competition: match.competitionId as ICompetition,
    date: match.date,
    isHome: match.isHome,
    teamGoals: match.teamGoals,
    opponentGoals: match.opponentGoals,
    leaguePosition: match.leaguePosition,
    cupRound: match.cupRound,
    isForfeit: match.isForfeit,
  } as ITempMatch;
};
