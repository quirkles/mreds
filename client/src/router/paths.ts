export enum HOME {
  HOME = '/',
}

export enum AUTH {
  SIGN_IN = '/sign_in',
  SIGN_UP = '/sign_up',
  FORGOT = '/forgot_password',
  RESET = '/reset_password/:token',
  VERIFY = '/verify_email/:token',
}

export enum PROFILE {
  PROFILE = '/profile',
  EDIT = 'edit',
  EDIT_IMAGE = 'edit_image',
  CHANGE_PASSWORD = 'change_password',
  DELETE = 'delete',
}

export enum TEAM {
  TEAM = 'team/:teamId',
  EDIT = 'edit',
  DELETE_TEAM = 'delete',
  EDIT_ROLES = 'edit_roles',
  EDIT_BADGE = 'edit_badge',
  ADD_PLAYER = 'add_player',
  SEASON = 'season/:seasonId',
  EDIT_SEASON = 'season/:seasonId/edit',
  ADD_SEASON = 'add_season',
  TROPHY = 'trophy/:trophyId',
  ADD_TROPHY = 'add_trophy',
  EDIT_TROPHY = 'trophy/:trophyId/edit',
  ADD_AWARD = 'add_award',
  EDIT_AWARD = 'award/:awardId/edit',
}

export enum PLAYER {
  PLAYER = 'player/:playerId',
  EDIT = 'edit',
  EDIT_PHOTO = 'edit_photo',
  DELETE = 'delete',
}

export enum ORG {
  ORG = '/org/:orgId',
  ADD = '/add_org',
  ADD_TEAM = 'add_team',
  ADD_COMPETITION = 'add_competition',
  COMPETITION = 'competition/:competitionId',
  EDIT_COMPETITION = 'edit_comp',
  EDIT = 'edit',
  EDIT_BADGE = 'edit_badge',
}

export enum MATCH {
  ADD_MATCH = 'add_match',
  EDIT_MATCH = 'edit',
  MATCH = 'match/:matchId',
  DELETE_MATCH = 'delete',
}
