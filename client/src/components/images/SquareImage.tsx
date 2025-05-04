import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import defaultBadge from 'assets/images/badge.png';

interface Props {
  image: string;
  size?: string;
  alt?: string;
  isPlayer?: boolean;
}

const SquareImage: React.FC<Props> = ({ image, size, alt, isPlayer }) => {
  if (!isPlayer && image === 'default') {
    image = defaultBadge;
  }
  const useStyles = makeStyles((theme) => ({
    image: {
      color: theme.palette.secondary.light,
      background: 'rgba(0, 0, 0, 0)',
      objectFit: 'contain',
      width: '160px',
      height: '160px',
    },
    fallback: {
      width: size || '160px',
      height: size || '160px',
      color: theme.palette.secondary.light,
      background: theme.palette.primary.light,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  }));
  const classes = useStyles();
  return (
    <Box>
      {image ? (
        <img src={image} className={classes.image} alt={alt || ''} />
      ) : (
        <div className={classes.fallback} />
      )}
    </Box>
  );
};

export default SquareImage;
