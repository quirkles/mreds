import React from 'react';
import { makeStyles } from '@mui/styles';
import { IMAGE_TYPE } from 'app/constants';
import CustomAvatar from 'components/avatars/CustomAvatar';
import AppIcon from 'components/icons/AppIcon';
import { IIconType } from 'components/icons/types';

interface Props {
  image: string;
  size?: string;
  alt?: string;
  type?: IMAGE_TYPE;
}

const CircularImage: React.FC<Props> = ({ image, size, alt, type }) => {
  const useStyles = makeStyles((theme) => ({
    imageContainer: {
      margin: theme.spacing(1),
    },
    image: {
      objectFit: 'cover',
      color: theme.palette.secondary.light,
      background: 'transparent',
      width: size || '150px',
      height: size || '150px',
      borderRadius: '50%',
      boxShadow: '0px 0px 30px -10px #fff',
    },
  }));
  const classes = useStyles();
  if (image === 'default') {
    let icon: IIconType = 'user';
    if (type === IMAGE_TYPE.TEAM) icon = 'team';
    if (type === IMAGE_TYPE.ORG) icon = 'profile';
    return (
      <div style={{ margin: '8px' }}>
        <CustomAvatar size={size} centered>
          <AppIcon size={'5rem'} icon={icon} />
        </CustomAvatar>
      </div>
    );
  }
  return (
    <div className={classes.imageContainer}>
      <img src={image} className={classes.image} alt={alt || ''} />
    </div>
  );
};

export default CircularImage;
