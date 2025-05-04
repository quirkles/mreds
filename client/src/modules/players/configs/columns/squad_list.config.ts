import { BACKGROUND_STYLE, BORDER_STYLE } from 'app/constants';
import { CellStyleByIndex, HeadCell } from 'components/tables/types';

const { STATIC } = BACKGROUND_STYLE;
const { STANDARD } = BORDER_STYLE;

export const squad_list: HeadCell[] = [
  {
    id: 'number',
    numeric: false,
    label: '',
    width: 20,
  },
  {
    id: 'position',
    label: '',
    width: 20,
  },
  {
    id: 'nationality',
    label: '',
    width: 20,
  },
  {
    id: 'image',
    numeric: false,
    label: '',
  },
  {
    id: 'name',
    numeric: false,
    label: '',
    border: true,
  },
  {
    id: 'apps',
    numeric: true,
    label: 'Apps',
    width: 30,
  },
  {
    id: 'goals',
    numeric: true,
    label: 'Goals',
    width: 30,
  },
  {
    id: 'assists',
    numeric: true,
    label: 'Assists',
    width: 30,
  },
];

export const squad_list_styles: CellStyleByIndex[] = [
  { index: 0, background: STATIC, textColor: 'label' },
  { index: 1, background: STATIC },
  { index: 2, background: STATIC },
  { index: 3, background: STATIC },
  {
    index: 4,
    background: STATIC,
    border: STANDARD,
  },
];
