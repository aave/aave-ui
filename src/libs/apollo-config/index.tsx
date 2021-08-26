import { Network } from '@aave/protocol-js';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useProtocolDataContext } from '../protocol-data-provider';
import { getApolloClient } from './client-config';

const ApolloConfigContext = React.createContext<{ network?: Network }>({});

export default function WrappedApolloProvider({ children }: PropsWithChildren<{}>) {
  const { networkConfig, network } = useProtocolDataContext();
  const [apolloClient, setApolloClient] = useState<{
    client: ApolloClient<NormalizedCacheObject>;
    network: Network;
  }>({
    client: getApolloClient(networkConfig).client,
    network,
  });

  useEffect(() => {
    const cfg = getApolloClient(networkConfig);
    setApolloClient({ client: cfg.client, network });
    return () => {
      cfg.client?.clearStore();
      cfg.client?.stop();
      for (let i = 0; i < cfg.wsClients.length; i++) {
        if (cfg.wsClients[i] && cfg.wsClients[i].close) {
          cfg.wsClients[i].close();
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network]);

  return (
    <ApolloConfigContext.Provider value={{ network: apolloClient.network }}>
      <ApolloProvider client={apolloClient.client}>{children}</ApolloProvider>
    </ApolloConfigContext.Provider>
  );
}

export const useApolloConfigContext = () => useContext(ApolloConfigContext);
