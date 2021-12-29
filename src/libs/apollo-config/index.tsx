import { ApolloProvider } from '@apollo/client';
import React, { PropsWithChildren } from 'react';
import { getApolloClient2 } from './client-config';

const apolloCLient = getApolloClient2();

export default function WrappedApolloProvider({ children }: PropsWithChildren<{}>) {
  if (!apolloCLient) return <>{children}</>;
  return <ApolloProvider client={apolloCLient}>{children}</ApolloProvider>;
}
