import { BORDER_STYLE } from 'app/constants';
import { CellStyleByIndex } from '../types';

export const getBorderStyle = (
  cellIndexStyles: CellStyleByIndex[],
  i: number
) => {
  const cellIndex = cellIndexStyles.map((cell) => cell.index);
  let borderStyle = '0px';
  if (cellIndex.includes(i)) {
    borderStyle =
      cellIndexStyles.find((cell) => cell.index === i)?.border || '0px';
  }

  return borderStyle === BORDER_STYLE.STANDARD
    ? '0.1px solid white'
    : borderStyle;
};
