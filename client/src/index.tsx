import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from 'errors/ErrorBoundary';
import { client } from 'graphql/client';
import { createRoot } from 'react-dom/client';
import { store } from 'reduxStore';
import AppRouter from 'router/AppRouter';
import { theme } from 'theme';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  </ApolloProvider>
);
