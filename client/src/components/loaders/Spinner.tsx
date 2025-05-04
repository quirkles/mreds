import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import { CustomTypography } from 'components/typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto',
  },
  circle: {
    display: 'flex',
    margin: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
}));

interface Props {
  isSecondary?: boolean;
}

const Spinner: React.FC<Props> = ({ isSecondary = false }) => {
  const classes = useStyles();
  const spinner = isSecondary ? (
    <div className={classes.circle}>
      <CircularProgress color="secondary" />
    </div>
  ) : (
    <div className={classes.root}>
      <CircularProgress className={classes.icon} />
      <CustomTypography size="xs" color="label">
        loading...
      </CustomTypography>
    </div>
  );
  return spinner;
};

export default Spinner;
