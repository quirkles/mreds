import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

interface Props {
  children: any;
  auth?: boolean;
  admin?: boolean;
  canEdit?: boolean;
  storeData?: any;
}

const ReduxWrapper: React.FC<Props> = ({
  children,
  auth = true,
  admin = false,
  canEdit = true,
  storeData = {},
}) => {
  const mockStore = configureStore();
  const store = mockStore({
    ...storeData,
    auth: {
      isAuth: auth,
      isTeamAdmin: admin,
      canEdit: canEdit,
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
