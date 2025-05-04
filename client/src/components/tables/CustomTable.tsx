import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import CustomTableHead from 'components/tables/CustomTableHead';
import { getComparator, stableSort } from 'components/tables/helpers/sort';
import CustomCellValue from './CustomCellValue';
import { getBackgroundColor } from './helpers/getBackgroundColor';
import { getBorderStyle } from './helpers/getBorderStyle';
import PositionString from './PositionString';
import { CellStyleByIndex } from './types';

interface Props {
  rows: any[];
  columns: any[];
  isSortable: boolean;
  sortByString?: string;
  cellIndexStyles?: CellStyleByIndex[];
}

interface Data {
  apps: string;
  goals: number;
  assists: number;
}

const CustomTable: React.FC<Props> = ({
  rows = [],
  columns,
  isSortable,
  sortByString = '',
  cellIndexStyles = [],
}) => {
  const [sortBy, setSortBy] = useState(sortByString);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    setSortBy(property);
  };

  const visibleRows = React.useMemo(
    () => stableSort(rows, getComparator('desc', sortBy)),
    [sortBy, rows]
  );

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader aria-labelledby="tableTitle" size={'small'}>
          <CustomTableHead
            onRequestSort={handleRequestSort}
            columns={columns.filter((column) => column.id !== 'isPercentage')}
            sortBy={sortBy}
            isSortable={isSortable}
          />
          <TableBody>
            {visibleRows.map((row, i) => {
              return (
                <TableRow hover key={i} sx={{ cursor: 'pointer' }}>
                  {Object.entries(row).map((item, i) => {
                    const cellIndex = cellIndexStyles.map((cell) => cell.index);

                    const textColor = cellIndex.includes(i)
                      ? cellIndexStyles.find((cell) => cell.index === i)
                          ?.textColor || 'data'
                      : 'data';

                    const customCellValue = () => {
                      if (item[0] === 'position') {
                        return (
                          <PositionString>{item[1] as number}</PositionString>
                        );
                      }

                      return typeof item[1] === 'object' && item[0] !== 'icon'
                        ? (item[1] as any)?.value
                        : item[1];
                    };

                    return (
                      <TableCell
                        className="custom-table-cell"
                        size="small"
                        align={
                          item[0] === 'name' || item[0] === 'label'
                            ? 'left'
                            : 'center'
                        }
                        key={item[0]}
                        id={item[0]}
                        sx={{
                          position: item[0] === 'name' ? 'sticky' : 'relative',
                          backgroundColor: getBackgroundColor(
                            item,
                            i,
                            sortBy,
                            cellIndexStyles
                          ),
                          zIndex: item[0] === 'name' ? 1 : 0,
                          left: 0,
                          padding: '0px',
                          height: '32px',
                          borderRight: getBorderStyle(cellIndexStyles, i),
                          borderBottom: '0.5px solid rgba(244, 244, 244, 0.1)',
                        }}
                      >
                        <CustomCellValue
                          isDifference={item[0] === 'difference'}
                          isPercentage={(item[1] as any)?.isPercentage}
                          textColor={textColor}
                          value={customCellValue()}
                        />
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
