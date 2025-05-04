import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { CustomTypography } from 'components/typography';
import { theme } from 'theme';

interface Data {
  apps: string;
  goals: number;
  assists: number;
}

interface Props {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  columns: any[];
  sortBy?: string;
  isSortable: boolean;
}

const CustomTableHead: React.FC<Props> = ({
  columns,
  onRequestSort,
  sortBy,
  isSortable,
}) => {
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ background: theme.palette.dark.main }}>
      <TableRow>
        {columns.map((headCell) => {
          const renderSort = sortBy === headCell.id && sortBy !== 'position';
          const stringCell = () =>
            typeof headCell.label === 'string' && headCell.label !== '' ? (
              <CustomTypography
                bold
                color={renderSort ? 'secondary' : 'label'}
                size="xs"
              >
                {headCell.label}
              </CustomTypography>
            ) : (
              headCell.label
            );
          return (
            <TableCell
              key={headCell.id}
              align="center"
              sx={{
                padding: '4px',
                minWidth: headCell.width,
                lineHeight: '0',
                background: renderSort
                  ? theme.palette.primary.main
                  : theme.palette.secondary.dark,
              }}
              sortDirection={renderSort ? 'desc' : false}
            >
              {isSortable ? (
                <TableSortLabel
                  active={renderSort}
                  direction="desc"
                  onClick={createSortHandler(headCell.id)}
                  sx={{
                    '& .MuiTableSortLabel-icon': {
                      display: 'none !important',
                    },
                  }}
                >
                  {stringCell()}
                </TableSortLabel>
              ) : (
                stringCell()
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
