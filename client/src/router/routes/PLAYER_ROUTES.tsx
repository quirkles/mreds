import React from 'react';
import { Route } from 'react-router-dom';
import * as HISTORY_COMP from 'modules/history/routes';
import * as PLAYER_COMP from 'modules/players/routes';
import { PLAYER, TEAM } from '../paths';

export const PLAYER_ROUTES = () => (
  <>
    <Route path={PLAYER.PLAYER}>
      <Route index={true} element={<PLAYER_COMP.Player />} />
      <Route path={PLAYER.EDIT} element={<PLAYER_COMP.EditPlayer />} />
      <Route
        path={PLAYER.EDIT_PHOTO}
        element={<PLAYER_COMP.EditPlayerPhoto />}
      />
      <Route path={PLAYER.DELETE} element={<PLAYER_COMP.DeletePlayer />} />
      <Route path={TEAM.TROPHY} element={<HISTORY_COMP.Trophy />} />
    </Route>
  </>
);
