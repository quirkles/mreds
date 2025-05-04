import { BACKGROUND_STYLE, BORDER_STYLE } from 'app/constants';
import { CellStyleByIndex, HeadCell } from 'components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const player_vs_stats: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: '',
    width: 130,
  },
  {
    id: 'matches',
    label: 'Pl',
    width: 30,
  },
  {
    id: 'goals',
    label: 'Goals',
    width: 30,
  },
  {
    id: 'goalsAvg',
    numeric: false,
    label: 'Avg',
    width: 30,
  },
  {
    id: 'assists',
    numeric: false,
    label: 'Assists',
    width: 30,
  },
  {
    id: 'assistsAvg',
    numeric: true,
    label: 'Avg',
    width: 30,
  },
  {
    id: 'conceded',
    numeric: true,
    label: 'Conc',
    width: 30,
  },
  {
    id: 'concededAvg',
    numeric: true,
    label: 'Avg',
    width: 30,
  },
];

export const player_vs_styles: CellStyleByIndex[] = [
  {
    index: 0,
    border: STANDARD,
    background: STATIC,
  },
  {
    index: 1,
    border: STANDARD,
  },
  { index: 3, border: STANDARD, textColor: 'label' },
  { index: 5, border: STANDARD, textColor: 'label' },
  { index: 7, border: STANDARD, textColor: 'label' },
];
