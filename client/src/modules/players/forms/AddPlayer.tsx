import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { useSeasons } from 'hooks/useSeasons';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { IPlayer } from 'types';
import { PAGES, initialPlayerState } from '../constants';
import { GET_PLAYERS_BY_SEASON_ID } from '../graphql';
import { ADD_PLAYER } from '../graphql';
import PlayerForm from './components/PlayerForm';

const AddPlayer: React.FC = () => {
  const { teamId } = useCustomParams();
  let navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();
  const { seasonOptions, seasonId, loading } = useSeasons();

  const [defaultValues, setDefaultValues] = useState<Partial<IPlayer>>(null);

  const [addPlayer, { error, loading: addLoading }] = useMutation(ADD_PLAYER, {
    refetchQueries: [
      { query: GET_PLAYERS_BY_SEASON_ID, variables: { teamId, seasonId } },
    ],
  });

  useEffect(() => {
    setDefaultValues({ ...initialPlayerState });
  }, []);
  const onSubmit = async (formData: Partial<IPlayer>) => {
    try {
      return addPlayer({ variables: { teamId: teamId, ...formData } }).then(
        (res) => {
          dispatch(showAlert('Player added successfully!', 'success'));
          navigate(-1);
        }
      );
    } catch (error) {
      dispatch(showAlert('Something went wrong', 'error'));
    }
  };

  if (error) return <ErrorGraphql error={[error.message]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.ADD_PLAYER} />
      {!loading && !addLoading && defaultValues ? (
        <PlayerForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          seasonOptions={seasonOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default AddPlayer;
