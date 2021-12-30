import { ApolloProvider } from '@apollo/client';
import React, { PropsWithChildren } from 'react';
import { apolloClient } from './client-config';

export default function WrappedApolloProvider({ children }: PropsWithChildren<{}>) {
  if (!apolloClient) return <>{children}</>;
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
