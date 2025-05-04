import * as React from 'react';
import { Box } from '@mui/material';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { theme } from 'theme';

interface Props {
  data: any;
  height?: number;
  colors?: string[];
}

const CustomPieChart: React.FC<Props> = ({ data, colors, height = 100 }) => {
  return (
    <Box sx={{ padding: '4px' }}>
      <PieChart
        colors={colors}
        series={[{ data, innerRadius: 25, outerRadius: 50, paddingAngle: 5 }]}
        height={height}
        slotProps={{
          legend: { hidden: true },
        }}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        sx={{
          [`& .${pieArcClasses.root}`]: {
            stroke: theme.palette.data.main,
            strokeWidth: '0px',
          },
        }}
      />
    </Box>
  );
};

export default CustomPieChart;
