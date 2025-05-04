import React from 'react';
import { VERSION } from 'app/constants';
import { LogoutButton } from 'components/buttons';
import { CenteredGrid } from 'components/grids';
import { CustomTypography } from 'components/typography';
import { useAuth } from 'hooks';
import { useLogout } from 'modules/auth/hooks/useLogout.hook';

const date = new Date().getFullYear();

interface Props {
  toggleDrawer: () => void;
}

const Footer: React.FC<Props> = ({ toggleDrawer }) => {
  const { isAuth } = useAuth();
  const { onLogout } = useLogout(toggleDrawer);

  return (
    <div style={{ marginTop: '20px' }}>
      <CenteredGrid>
        {isAuth && <LogoutButton onClick={onLogout} />}
        <CustomTypography size="xs" color="label">
          {'Copyright © '}
          {date}
        </CustomTypography>
        <CustomTypography size="xs" bold color="label">
          version {VERSION}
        </CustomTypography>
      </CenteredGrid>
    </div>
  );
};

export default Footer;
