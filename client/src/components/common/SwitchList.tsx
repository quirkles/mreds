import React from 'react';
import { Control } from 'react-hook-form';
import ControlledSwitchInput from 'components/inputs/ControlledSwitchInput';
import TextList from 'components/lists/TextList';
import { IListItem } from 'types';

type Props = {
  control: Control;
  data: IListItem[];
};

const SwitchList: React.FC<Props> = ({ control, data }) => {
  const switchComp = (name: string) => {
    return <ControlledSwitchInput control={control} name={name} />;
  };

  const switchList: IListItem[] = data.map((item) => {
    return {
      label: item.label,
      value: switchComp(item.value as string),
    };
  });

  return <TextList data={switchList} />;
};

export default SwitchList;
