import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import RouteGuard from 'router/RouteGuard';
import { PAGES } from '../constants';
import {
  DELETE_PLAYER,
  GET_PLAYERS_BY_SEASON_ID,
  GET_PLAYERS_BY_TEAM_ID,
  GET_PLAYER_BY_ID,
} from '../graphql';
import DeletePlayerForm from './components/DeletePlayerForm';

const DeletePlayer: React.FC = () => {
  const { teamId, playerId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_PLAYER_BY_ID, {
    variables: { playerId: playerId },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deletePlayer, { loading: deleteLoading }] = useMutation(
    DELETE_PLAYER,
    {
      refetchQueries: [
        { query: GET_PLAYERS_BY_TEAM_ID, variables: { teamId } },
        {
          query: GET_PLAYERS_BY_SEASON_ID,
          variables: { teamId, seasonId: 'all' },
        },
      ],
    }
  );

  const onDelete = async () => {
    return await deletePlayer({ variables: { teamId, playerId } })
      .then(() => {
        dispatch(showAlert('Player deleted', 'success'));
        navigate(-2);
      })
      .catch(() => {
        dispatch(showAlert('Something went wrong', 'error'));
      });
  };

  if (error) return <ErrorGraphql error={[error]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN} teamId={teamId}>
      <PageHeader title={PAGES.DELETE_PLAYER} />
      {!loading && !deleteLoading ? (
        <DeletePlayerForm
          onSubmit={onDelete}
          defaultValues={undefined}
          playerName={data.player.name}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default DeletePlayer;
