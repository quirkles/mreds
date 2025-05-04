import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useCustomParams } from 'hooks/useCustomParams';
import { useSeasons } from 'hooks/useSeasons';
import Averages from 'modules/matches/components/Averages';
import MatchStatsTable from 'modules/matches/components/MatchStatsTable';
import SelectSeason from 'modules/team/containers/SelectSeason';
import { IMatchStats } from 'types';
import GamesWithStat from '../components/GamesWithStat';
import PlayerStatsTable from '../components/PlayerStatsTable';
import { GET_PLAYER_SEASON_STATS } from '../graphql';
import { mapPlayerAverages } from '../helpers/mapPlayerAverages';
import { mapPlayerMatchStats } from '../helpers/mapPlayerMatchStats';

const PlayerSeasonStats: React.FC = () => {
  const { seasonId } = useSeasons();
  const { playerId } = useCustomParams();

  const { loading, data, refetch } = useQuery(GET_PLAYER_SEASON_STATS, {
    variables: { seasonId, playerId },
    skip: !seasonId,
    refetchWritePolicy: 'overwrite',
  });

  useEffect(() => {
    refetch();
  }, [playerId, refetch, seasonId]);

  const player = data?.player[0] || [];

  return (
    <>
      <SelectSeason playerId={playerId} />
      <MatchStatsTable
        stats={mapPlayerMatchStats(player, loading) as unknown as IMatchStats}
        loading={loading}
      />
      <Averages stats={mapPlayerAverages(player)} loading={loading} />
      <PlayerStatsTable stats={player} loading={loading} />
      <GamesWithStat player={player} loading={loading} />
    </>
  );
};

export default PlayerSeasonStats;
