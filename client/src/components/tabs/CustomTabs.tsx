import React, { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { setTabIndex } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import { getTabIndex } from 'selectors';
import { theme } from 'theme';
import TabPanel from './TabPanel';

export interface ITab {
  label: string | ReactElement;
  icon?: string | ReactElement;
  component: ReactElement;
  isHidden?: boolean;
}

interface TabProps {
  type: string;
  tabs: ITab[];
  level: 'primary' | 'secondary';
}

const CustomTabs: React.FC<TabProps> = ({ type, tabs, level }) => {
  const dispatch: AppDispatch = useDispatch();
  const value = useSelector(getTabIndex);
  const tabsToShow = tabs.filter((tab) => !tab.isHidden);
  const isPrimary = level === 'primary';
  const handleChange = (event: React.ChangeEvent, newValue: number) => {
    dispatch(setTabIndex(type, newValue));
  };

  interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
  }

  const StyledTabs = styled((props: StyledTabsProps) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
    },
    '& .MuiTabs-flexContainer': {
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  interface StyledTabProps {
    label: string | ReactElement;
    icon?: string | ReactElement;
  }

  const StyledTab = styled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
  ))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 'bold',
    fontSize: '12px',
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
      fontSize: '14px',
    },
    '&.MuiTab-fullWidth': {
      padding: '0px',
      marginRight: '0px',
    },
    '&.MuiTab-root': {
      padding: '0px',
      marginRight: '0px',
    },
  }));

  return (
    <>
      <>
        <AppBar
          position="sticky"
          elevation={10}
          sx={{
            marginBottom: '4px',
            background: isPrimary
              ? theme.palette.dark.main
              : theme.palette.secondary.dark,
          }}
        >
          <StyledTabs value={value[type]} onChange={handleChange}>
            {tabsToShow.map((tab: ITab, i: number) => (
              <StyledTab key={i} label={tab.label} icon={tab.icon} />
            ))}
          </StyledTabs>
        </AppBar>
      </>

      {tabsToShow.map((tab: ITab, i: number) => (
        <TabPanel key={i} value={value[type]} index={i}>
          <>{tab.component}</>
        </TabPanel>
      ))}
    </>
  );
};

export default CustomTabs;
