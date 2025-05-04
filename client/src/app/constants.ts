import { ISelectOptions } from 'components/inputs/SelectInput';
import packageJSON from '../../package.json';

const date = new Date();

export const ROOT_URL = 'https://madrid-reds-6z4rr5ysna-pd.a.run.app';
export const VERSION: string = packageJSON.version;

export const BASE_YEAR = 2005;
export const MAX_YEAR = 2050;

export const CURRENT_YEAR: number = date.getFullYear();

export enum AUTH_ROLES {
  NONE = 'none',
  PUBLIC = 'public',
  USER = 'user',
  TEAM_ADMIN = 'team_admin',
  ORG_ADMIN = 'org_admin',
  SITE_ADMIN = 'site_admin',
}

export enum IMAGE_TYPE {
  USER = 'user',
  TEAM = 'team',
  ORG = 'org',
}

export enum LINK_TYPE {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export enum API_PATH {
  USER = '/api/users',
  ADMIN = '/api/admin',
  PUBLIC = '/api/public',
}

export const positionOptions: ISelectOptions[] = [
  { value: '', label: '' },
  { value: 'GK', label: 'Goalkeeper' },
  { value: 'DF', label: 'Defender' },
  { value: 'MF', label: 'Midfielder' },
  { value: 'FW', label: 'Forward' },
];

export const TAB_TYPES = {
  PROFILE: 'profile',
  ORG: 'org',
  ORG_TEAMS: 'orgTeams',
  TEAM: 'team',
  OVERVIEW: 'overview',
  MATCHES: 'matches',
  MATCH: 'match',
  SQUAD: 'squad',
  PLAYER: 'player',
  HISTORY: 'history',
  SEASON: 'season',
};

export const BORDER_STYLE = {
  STANDARD: 'standard' as const,
};

export const BACKGROUND_STYLE = {
  STATIC: 'static' as const,
};
