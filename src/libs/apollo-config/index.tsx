import { ChainId } from '@aave/contract-helpers';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useProtocolDataContext } from '../protocol-data-provider';
import { getApolloClient } from './client-config';

const ApolloConfigContext = React.createContext<{ chainId?: ChainId }>({});

export default function WrappedApolloProvider({ children }: PropsWithChildren<{}>) {
  const { networkConfig, chainId } = useProtocolDataContext();
  const [apolloClient, setApolloClient] = useState<{
    client: ApolloClient<NormalizedCacheObject>;
    chainId: ChainId;
  }>({
    client: getApolloClient(networkConfig).client,
    chainId,
  });

  useEffect(() => {
    const cfg = getApolloClient(networkConfig);
    setApolloClient({ client: cfg.client, chainId });
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
  }, [chainId]);

  return (
    <ApolloConfigContext.Provider value={{ chainId: apolloClient.chainId }}>
      <ApolloProvider client={apolloClient.client}>{children}</ApolloProvider>
    </ApolloConfigContext.Provider>
  );
}

export const useApolloConfigContext = () => useContext(ApolloConfigContext);
