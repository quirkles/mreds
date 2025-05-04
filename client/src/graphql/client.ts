import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

export const client = new ApolloClient({
  uri: '/graphql',
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          matchesBySeason: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ['seasonId', 'teamId'],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing, incoming, { args: { offset = 0 } }) {
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),

  link: createUploadLink(),
});
