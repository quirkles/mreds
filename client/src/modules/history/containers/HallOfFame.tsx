import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from 'components/containers';
import FlagIcon from 'components/icons/FlagIcon';
import CircularImage from 'components/images/CircularImage';
import LinksList from 'components/lists/LinksList';
import { Spinner } from 'components/loaders';
import PositionString from 'components/tables/PositionString';
import { CustomTypography } from 'components/typography';
import { useCustomParams } from 'hooks/useCustomParams';
import { IListItem } from 'types';
import { GET_HALL_OF_FAME } from '../graphql/getHallOfFame.graphql';

const HallOfFame: React.FC = () => {
  const { teamId } = useCustomParams();

  const { loading, data } = useQuery(GET_HALL_OF_FAME, {
    variables: { teamId },
  });

  const links: IListItem[] =
    data?.players.map((player) => {
      return {
        avatar: <CircularImage size="40px" image={player.image.url} />,
        link: `player/${player._id}`,
        label: (
          <CustomTypography color="data" bold size="sm">
            {player.name}
          </CustomTypography>
        ),
        secondary: (
          <>
            <PositionString>{player.position}</PositionString> |{' '}
            <FlagIcon nationality={player.nationality} /> |{' '}
            <CustomTypography color="label" bold>
              <CustomTypography size="xs" color="label">
                #
              </CustomTypography>
              {player.squadNumber}
            </CustomTypography>
          </>
        ),
      };
    }) || [];

  return !loading ? (
    <>
      {!data.players.length ? (
        <CustomTypography color="warning">
          No hall of fame players yet
        </CustomTypography>
      ) : (
        <SectionContainer>
          <LinksList links={links} />
        </SectionContainer>
      )}
    </>
  ) : (
    <Spinner />
  );
};

export default HallOfFame;
