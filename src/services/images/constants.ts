import { API_ROUTES } from '../../constants/constants';

export const PATHS = {
  UPLOAD_PLAYER_PHOTO: `${API_ROUTES.ADMIN}/upload_player_photo`,
  DELETE_PLAYER_PHOTO: `${API_ROUTES.ADMIN}/remove_player_photo`,
  UPLOAD_ORG_BADGE: `${API_ROUTES.ADMIN}/upload_org_badge`,
  DELETE_ORG_BADGE: `${API_ROUTES.ADMIN}/remove_org_badge`,
  UPLOAD_TEAM_BADGE: `${API_ROUTES.ADMIN}/upload_team_badge`,
  DELETE_TEAM_BADGE: `${API_ROUTES.ADMIN}/remove_team_badge`,
  UPLOAD_USER_PHOTO: `${API_ROUTES.USER}/upload_user_image`,
  DELETE_USER_PHOTO: `${API_ROUTES.USER}/remove_user_image`,
};
