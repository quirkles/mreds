import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import { CustomTypography } from 'components/typography';

interface Props {
  progress: number;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  bar: {
    height: '10px',
    borderRadius: theme.spacing(3),
  },
}));

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <CustomTypography
          bold
          size='xs'
          color={props.value < 100 ? 'warning' : 'success'}
        >{`${Math.round(props.value)}%`}</CustomTypography>
      </Box>
    </Box>
  );
}

const ProgressBar: React.FC<Props> = ({ progress }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} className={classes.bar} />
    </div>
  );
};

export default ProgressBar;
