import React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
  container: {
    background: theme.palette.dark.main,
    minHeight: '100vh',
  },
}));

interface Props {
  children: React.ReactNode;
  admin?: boolean;
}

const PageContainer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  return (
    <Container
      className={classes.container}
      sx={{ padding: '2px 2px 0px 2px' }}
    >
      <div>{children}</div>
    </Container>
  );
};

export default PageContainer;
