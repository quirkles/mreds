import { alertReducer as alert } from 'modules/alerts';
import { tabReducer as tab } from 'modules/alerts';
import { authReducer as auth } from 'modules/auth';
import { tempMatchReducer as match } from 'modules/matches/reducers/match.reducer';
import { tempPlayersReducer as players } from 'modules/matches/reducers/players.reducer';
import { combineReducers } from 'redux';

import { store } from 'reduxStore';

const rootReducer = combineReducers({
  alert,
  tab,
  auth,
  match,
  players,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
