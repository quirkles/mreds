import React from 'react';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AppIcon from 'components/icons/AppIcon';
import { IIconType } from 'components/icons/types';
import { theme } from 'theme';

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 0,
  },
}));

interface Props {
  icon: IIconType;
  size?: string;
  color?: string;
  onClick: () => void;
}

const CustomIconButton: React.FC<Props> = ({
  icon,
  size = '1rem',
  color = theme.palette.common.white,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.button}>
      <AppIcon icon={icon} size={size} color={color} />
    </Button>
  );
};

export default CustomIconButton;
