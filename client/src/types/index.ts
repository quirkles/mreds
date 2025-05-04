import { ReactElement } from 'react';
import { LINK_TYPE } from 'app/constants';

export * from './iTeam';
export * from './iTrophy';
export * from './iUser';
export * from './IMatch';
export * from './IMatchStats';
export * from './iPlayer';
export * from './IPlayerInMatch';
export * from './iImage';
export * from './iAlert';
export * from './IOrganization';

export interface IListItem {
  label: string | ReactElement;
  secondary?: string | ReactElement;
  type?: LINK_TYPE;
  link?: string;
  value?: string | number | ReactElement;
  avatar?: string | ReactElement;
  icon?: ReactElement;
  border?: boolean;
  styles?: any;
  disabled?: boolean;
  hidden?: boolean;
  onClick?: () => void;
}

export interface ITabIndex {
  primary: number;
  secondary: number;
}
