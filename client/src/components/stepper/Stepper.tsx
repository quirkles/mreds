import React from 'react';
import { MobileStepper } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

interface Props {
  steps: any;
  step: number;
  handleBackClick: () => void;
}

const useStyles = makeStyles((theme) => ({
  dots: {
    color: theme.palette.success.light,
  },
  dot: {
    background: theme.palette.primary.light,
  },
  dotActive: {
    background: theme.palette.success.light,
  },
}));

const Stepper: React.FC<Props> = ({ steps, step, handleBackClick }) => {
  const classes = useStyles();
  return (
    <div>
      <MobileStepper
        variant='dots'
        steps={steps.length}
        position='static'
        activeStep={step}
        classes={{
          dots: classes.dots,
          dot: classes.dot,
          dotActive: classes.dotActive,
        }}
        sx={{ flexGrow: 1, background: 'transparent' }}
        nextButton={null}
        backButton={
          <Button disabled={step === 0} onClick={handleBackClick}>
            Back
          </Button>
        }
      />
      {steps[step].component}
    </div>
  );
};

export default Stepper;
