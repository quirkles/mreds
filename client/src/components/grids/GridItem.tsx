import React from 'react';
import Grid, { GridSize } from '@mui/material/Grid';

interface Props {
  children: React.ReactNode;
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  lg?: GridSize;
  xl?: GridSize;
  textAlign?: string;
  alignContent?: string;
  alignItems?: string;
  justifyContent?: string;
  margin?: string;
}

const GridItem: React.FC<Props> = ({
  children,
  xs = 12,
  sm = 6,
  md = 6,
  lg = 6,
  xl = 6,
  textAlign = 'center',
  alignContent = 'center',
  alignItems = 'center',
  justifyContent = 'center',
  margin,
}) => {
  return (
    <Grid
      item
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xl={xl}
      sx={{
        textAlign,
        alignContent,
        alignItems,
        justifyContent,
        paddingTop: '4px !important',
        margin: margin,
      }}
    >
      {children}
    </Grid>
  );
};

export default GridItem;
