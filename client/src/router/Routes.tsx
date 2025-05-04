import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NotFound from 'components/navigation/NotFound';
import * as AUTH_COMP from 'modules/auth/routes/auth.routes';
import * as HISTORY_COMP from 'modules/history/routes';
import Home from 'modules/home/containers/Home';
import { resetTempMatch } from 'modules/matches/actions/matches.actions';
import { resetTempPlayers } from 'modules/matches/actions/players.actions';
import * as MATCH_COMP from 'modules/matches/routes';
import * as ORG_COMP from 'modules/organization/routes';
import * as PLAYER_COMP from 'modules/players/routes';
import * as PROFILE_COMP from 'modules/profile/routes';
import * as TEAM_COMP from 'modules/team/routes';
import { AUTH, ORG, PROFILE } from './paths';
import { MATCH, TEAM, HOME } from './paths';
import * as ROUTES from './routes/index';

const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path={HOME.HOME} element={<Home />} />
      <Route path={AUTH.SIGN_IN} element={<AUTH_COMP.SignIn />} />
      <Route path={AUTH.SIGN_UP} element={<AUTH_COMP.SignUp />} />
      <Route path={AUTH.FORGOT} element={<AUTH_COMP.ForgotPassword />} />
      <Route path={AUTH.RESET} element={<AUTH_COMP.ResetPassword />} />
      <Route path={AUTH.VERIFY} element={<AUTH_COMP.ValidatedEmail />} />
      <Route path={ORG.ADD} element={<ORG_COMP.AddOrg />} />
      <Route path={PROFILE.PROFILE}>
        <Route index={true} element={<PROFILE_COMP.Profile />} />
        <Route path={PROFILE.EDIT} element={<PROFILE_COMP.EditProfile />} />
        <Route
          path={PROFILE.EDIT_IMAGE}
          element={<PROFILE_COMP.EditUserImage />}
        />
        <Route
          path={PROFILE.CHANGE_PASSWORD}
          element={<PROFILE_COMP.EditPassword />}
        />
        <Route path={PROFILE.DELETE} element={<PROFILE_COMP.DeleteAccount />} />
      </Route>
      <Route path={ORG.ORG}>
        <Route index={true} element={<ORG_COMP.Org />} />
        <Route path={ORG.EDIT} element={<ORG_COMP.EditOrg />} />
        <Route path={ORG.ADD_TEAM} element={<TEAM_COMP.AddTeam />} />
        <Route
          path={ORG.ADD_COMPETITION}
          element={<ORG_COMP.AddCompetition />}
        />
        <Route path={ORG.COMPETITION}>
          <Route index={true} element={<ORG_COMP.Competition />} />
          <Route
            path={ORG.EDIT_COMPETITION}
            element={<ORG_COMP.EditCompetition />}
          />
        </Route>
        <Route path={ORG.EDIT_BADGE} element={<ORG_COMP.EditOrgBadge />} />
        <Route path={TEAM.TEAM}>
          <Route index={true} element={<TEAM_COMP.Team />} />
          <Route path={TEAM.ADD_PLAYER} element={<PLAYER_COMP.AddPlayer />} />
          <Route path={TEAM.SEASON}>
            <Route index={true} element={<HISTORY_COMP.Season />} />
          </Route>
          <Route
            path={TEAM.ADD_SEASON}
            element={<HISTORY_COMP.AddTeamSeason />}
          />
          <Route
            path={TEAM.EDIT_SEASON}
            element={<HISTORY_COMP.EditTeamSeason />}
          />
          <Route path={TEAM.TROPHY} element={<HISTORY_COMP.Trophy />} />
          <Route path={TEAM.ADD_TROPHY} element={<HISTORY_COMP.AddTrophy />} />
          <Route
            path={TEAM.EDIT_TROPHY}
            element={<HISTORY_COMP.EditTrophy />}
          />
          <Route
            path={MATCH.ADD_MATCH}
            element={<MATCH_COMP.AddMatch />}
            action={async () => {
              dispatch(resetTempPlayers);
              dispatch(resetTempMatch);
            }}
          />
          <Route path={TEAM.EDIT_BADGE} element={<TEAM_COMP.EditBadge />} />
          <Route path={TEAM.EDIT} element={<TEAM_COMP.EditTeam />} />
          <Route path={TEAM.EDIT_ROLES} element={<TEAM_COMP.EditRoles />} />
          <Route path={TEAM.DELETE_TEAM} element={<TEAM_COMP.DeleteTeam />} />
          {/* // ------ */}

          <Route path={TEAM.SEASON}>
            <Route index={true} element={<HISTORY_COMP.Season />} />
            <Route path={TEAM.ADD_AWARD} element={<HISTORY_COMP.AddAward />} />
            <Route
              path={TEAM.EDIT_AWARD}
              element={<HISTORY_COMP.EditAward />}
            />
            {ROUTES.PLAYER_ROUTES()}
            {ROUTES.MATCH_ROUTES()}
          </Route>
          {/* // --------- */}
          {ROUTES.PLAYER_ROUTES()}
          {ROUTES.MATCH_ROUTES()}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
