import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ISelectOptions } from 'components/inputs/SelectInput';
import { GET_TEAM_SEASONS } from 'modules/history/graphql/getTeamSeasons.graphql';
import { useCustomParams } from './useCustomParams';

export const useSeasons = () => {
  const [seasonToUse, setSeasonToUse] = useState('');
  const { teamId, seasonId } = useCustomParams();
  let [searchParams, setSearchParams] = useSearchParams();
  const seasonParam = searchParams.get('season');

  const { data, loading, error } = useQuery(GET_TEAM_SEASONS, {
    variables: { teamId },
  });

  const seasonOptions: ISelectOptions[] = [];

  if (data && data.seasons.length) {
    data.seasons.forEach((season) => {
      let label = season.name;
      let value = season._id;
      if (season._id === data.seasons[0]._id) {
        label = `${season.name} *`;
      }
      seasonOptions.push({ label, value });
    });
  }

  useEffect(() => {
    if (seasonId) {
      setSeasonToUse(seasonId);
    }
    if (seasonParam) {
      setSeasonToUse(seasonParam);
    }
    const defaultSeason = data?.seasons.length ? data?.seasons[0]._id : '';
    if (!seasonId && !seasonParam) {
      setSeasonToUse(defaultSeason);
    }
  }, [data?.seasons, seasonId, seasonParam]);

  const onSelectSeason = useCallback(
    (seasonId) => {
      let params = { season: seasonId };
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const seasonEndDate =
    data?.seasons?.find((season) => season._id === seasonToUse)?.yearEnded ||
    null;

  return {
    seasonId: seasonToUse,
    onSelectSeason,
    loading,
    error,
    data,
    seasonOptions,
    seasonEndDate,
  };
};
