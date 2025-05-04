import { AuthChecker } from 'type-graphql';
import { ROLES } from '../constants/constants';
import { IContext } from '../types';

export const customAuthChecker: AuthChecker<IContext> = (
  { context },
  roles
): boolean => {
  const {
    authUser: { roles: userRoles, isVerified },
  } = context;
  if (!isVerified) {
    return false;
  }

  if (roles.includes(ROLES.SITE_ADMIN) && isVerified) {
    return true;
  }

  if (
    roles.includes(ROLES.TEAM_ADMIN) &&
    userRoles.includes(ROLES.TEAM_ADMIN) &&
    isVerified
  ) {
    return true;
  }
  if (
    roles.includes(ROLES.ORG_ADMIN) &&
    userRoles.includes(ROLES.ORG_ADMIN) &&
    isVerified
  ) {
    return true;
  }

  if (roles.includes(ROLES.USER) && userRoles.includes(ROLES.USER)) {
    return true;
  }
  return false;
};
