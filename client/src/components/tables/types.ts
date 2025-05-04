import { ReactElement } from 'react';

export interface HeadCell {
  id: string;
  label: string | ReactElement;
  numeric?: boolean;
  width?: number | string;
  border?: boolean;
  padding?: string;
}

export interface CellStyleByIndex {
  index: number;
  border?: '0px' | 'standard';
  background?: 'static';
  textColor?: string;
}
