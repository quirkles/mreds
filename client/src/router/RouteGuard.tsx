import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AUTH_ROLES } from 'app/constants';
import { useAuth } from 'hooks';
import { showAlert } from 'modules/alerts';
import { AUTH, PROFILE } from './paths';

interface Props {
  children: ReactNode;
  authorization: AUTH_ROLES;
  teamId?: string;
  orgId?: string;
}

const RouteGuard: React.FC<Props> = ({
  children,
  authorization,
  teamId,
  orgId,
}) => {
  const dispatch = useDispatch();
  const { isTeamAdmin, isSiteAdmin, isTeamAuth, isAuth } = useAuth(teamId);
  const { isOrgAuth } = useAuth(orgId);

  if (authorization === AUTH_ROLES.USER && !isAuth) {
    return <Navigate to={AUTH.SIGN_IN} replace />;
  }
  if (authorization === AUTH_ROLES.ORG_ADMIN && !isOrgAuth) {
    dispatch(showAlert('Only team admin users can access this page!', 'info'));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAuth) {
    dispatch(showAlert('You are not an admin for this team', 'info'));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAdmin) {
    dispatch(showAlert('Only team admin users can access this page!', 'info'));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.TEAM_ADMIN && !isTeamAuth) {
    dispatch(showAlert('You are not an admin for this team', 'info'));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (authorization === AUTH_ROLES.SITE_ADMIN && !isSiteAdmin) {
    dispatch(showAlert('Only admin users can access this page!', 'info'));
    return <Navigate to={PROFILE.PROFILE} replace />;
  }
  if (isAuth && authorization === 'none')
    return <Navigate to={PROFILE.PROFILE} replace />;
  return <>{children}</>;
};

export default RouteGuard;
