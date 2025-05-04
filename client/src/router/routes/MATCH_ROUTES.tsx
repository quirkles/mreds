import React from 'react';
import { Route } from 'react-router-dom';
import * as MATCH_COMP from 'modules/matches/routes';
import { MATCH } from '../paths';

export const MATCH_ROUTES = () => (
  <>
    <Route path={MATCH.MATCH}>
      <Route index={true} element={<MATCH_COMP.Match />} />
      <Route path={MATCH.ADD_MATCH} element={<MATCH_COMP.AddMatch />} />
      <Route path={MATCH.EDIT_MATCH} element={<MATCH_COMP.EditMatch />} />
      <Route path={MATCH.DELETE_MATCH} element={<MATCH_COMP.DeleteMatch />} />
    </Route>
  </>
);
