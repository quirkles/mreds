import { RootState } from 'reduxStore/rootReducer';

export const getAuthState = (state: RootState) => state.auth;
export const getAlertMessage = (state: RootState) => state.alert;
export const getTabIndex = (state: RootState) => state.tab;
export const getTempMatch = (state: RootState) => state.match;
export const getTempPlayers = (state: RootState) => state.players;
