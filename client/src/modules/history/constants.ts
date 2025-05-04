import { theme } from 'theme';
import { ITrophy } from 'types';
import { IAward, ITeamSeason } from './types';

export enum PAGES {
  TROPHY = 'Trophy',
  ADD_TROPHY = 'Add New Trophy',
  EDIT_TROPHY = 'Edit Trophy',
  SEASON = 'Season',
  EDIT_SEASON = 'Edit Season',
  ADD_SEASON = 'Add New Season',
  ADD_AWARD = 'Add Season Award',
  EDIT_AWARD = 'Edit Season Award',
}

export const initialTrophyFormState: Partial<ITrophy> = {
  name: '',
  seasonId: '',
  year: '',
  isFinal: false,
  isWinner: true,
  opponentId: '',
  comment: '',
};

export const initialTeamSeasonState: Partial<ITeamSeason> = {
  yearStarted: '',
  yearEnded: '',
  leaguePosition: 1,
  division: '',
  comment: '',
};

export const initialAwardState: Partial<IAward> = {
  awardName: '',
  winners: [],
  comment: '',
};

export const seasonColors = [
  {
    color: `${theme.palette.tertiary.main}`,
    border: `${theme.palette.tertiary.main}`,
  },
  {
    color: `${theme.palette.primary.main}`,
    border: `${theme.palette.primary.main}`,
  },
  {
    color: `${theme.palette.info.main}`,
    border: `${theme.palette.info.light}`,
  },
  {
    color: `${theme.palette.secondary.main}`,
    border: `${theme.palette.secondary.light}`,
  },
];
