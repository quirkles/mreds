import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppIcon from 'components/icons/AppIcon';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 0,
  },
}));

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(-1);
  };
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.button}>
      <AppIcon icon="back" size="20px" color="white" />
    </Button>
  );
};

export default BackButton;
