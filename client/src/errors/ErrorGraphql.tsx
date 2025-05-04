import React from 'react';
import { SectionContainer } from 'components/containers';
import TextList from 'components/lists/TextList';
import { CustomTypography } from 'components/typography';
import { theme } from 'theme';
import { IListItem } from 'types';

type Props = {
  error: any;
};

const undefinedError = 'Something went wrong';
const ErrorGraphql: React.FC<Props> = ({ error }) => {
  const data: IListItem[] = Array.isArray(error)
    ? error.map((err) => {
        return { label: err ? err.message : undefinedError };
      })
    : [];
  return (
    <SectionContainer
      border={theme.palette.error.main}
      background={theme.palette.error.dark}
    >
      <CustomTypography bold color="secondary">
        Something went wrong
      </CustomTypography>
      {data.length ? (
        <TextList data={data} />
      ) : (
        <CustomTypography color="warning">{error.message}</CustomTypography>
      )}
    </SectionContainer>
  );
};

export default ErrorGraphql;
