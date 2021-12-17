import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  split,
  Operation,
  FetchResult,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink as WebSocketLinkLegacy } from '@apollo/client/link/ws';
import { DocumentNode, NameNode } from 'graphql';
import gql from 'graphql-tag';
import { NetworkConfig } from '../../helpers/config/types';
import { getNetworkConfig } from '../../helpers/config/markets-and-network-config';
import {
  GET_MAINNET_CACHED_SERVER_WS_ERROR,
  GET_NETWORK_CACHED_SERVER_WS_ERROR,
  GET_QUERY_ERROR,
  WsErrorCountKey,
} from '../pool-data-provider/hooks/use-graph-check';
import { governanceConfig } from '../../ui-config';
import { ChainId } from '@aave/contract-helpers';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import { print } from 'graphql';

class WebSocketLink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: sink.next.bind(sink),
          complete: sink.complete.bind(sink),
          error: (err) => {
            if (Array.isArray(err))
              // GraphQLError[]
              return sink.error(new Error(err.map(({ message }) => message).join(', ')));

            if (err instanceof CloseEvent)
              return sink.error(
                new Error(
                  `Socket closed with event ${err.code} ${err.reason || ''}` // reason will be available on clean closes only
                )
              );

            return sink.error(err);
          },
        }
      );
    });
  }
}

enum WsConnectonStatusKey {
  wsNetworkConnectonStatusKey = 'networkIsDisconnected',
  wsMainnetConnectonStatusKey = 'mainnetIsDisconnected',
}

const networkWsConnectionStatusDocument = gql`
  query NetworkConnectionStatus {
    networkIsDisconnected @client
  }
`;

const mainnetWsConnectionStatusDocument = gql`
  query MainnetConnectionStatus {
    mainnetIsDisconnected @client
  }
`;

function createWsLink(uri: string): WebSocketLink {
  const wsLink = new WebSocketLink({
    url: uri,
    connectionAckWaitTimeout: 30000,
    keepAlive: 10000,
    lazy: true,
  });
  return wsLink;
}

function createWsLinkLegacy(uri: string): WebSocketLinkLegacy {
  const wsLink = new WebSocketLinkLegacy({
    uri,
    options: {
      reconnect: true,
      timeout: 30000,
      lazy: true,
    },
  });
  // @ts-ignore
  wsLink.subscriptionClient.maxConnectTimeGenerator.setMin(15000);
  return wsLink;
}

function supportsOnlyMainnetCacheLayer(name: NameNode) {
  // add to here with prefix of only support on mainnet call names
  return name.value.startsWith('C_Stake');
}

function getCachedServerLink(
  cachingServerUrl: string | undefined,
  cachingWSServerUrl: string | undefined
):
  | {
      link: ApolloLink;
      mainnetCachingWSLink?: WebSocketLink;
      networkCachingWSLink: WebSocketLink;
    }
  | undefined {
  if (!cachingServerUrl || !cachingWSServerUrl || !governanceConfig) {
    return undefined;
  }

  const networkCachingWSLink = createWsLink(cachingWSServerUrl);

  const mainnetConfig = getNetworkConfig(ChainId.mainnet);
  if (mainnetConfig.cachingWSServerUrl !== cachingWSServerUrl && mainnetConfig.cachingWSServerUrl) {
    const mainnetCachingWSLink = createWsLink(mainnetConfig.cachingWSServerUrl);

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return supportsOnlyMainnetCacheLayer(definition.name!);
      },
      getMainnetCachingLink(mainnetCachingWSLink),
      getNetworkCachingLink(cachingServerUrl, networkCachingWSLink)
    );

    return {
      link,
      mainnetCachingWSLink,
      networkCachingWSLink,
    };
  } else {
    return {
      link: getNetworkCachingLink(cachingServerUrl, networkCachingWSLink),
      networkCachingWSLink,
    };
  }
}

function getMainnetCachingLink(mainnetCachingWSLink: WebSocketLink) {
  return getCachingWsLink(governanceConfig!.wsGovernanceDataUrl, mainnetCachingWSLink);
}

function getNetworkCachingLink(cachingServerUrl: string, networkCachingWSLink: WebSocketLink) {
  return getCachingWsLink(cachingServerUrl, networkCachingWSLink);
}

function getCachingWsLink(cachingServerUrl: string, wsLink: WebSocketLink) {
  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    new HttpLink({ uri: cachingServerUrl })
  );
}

function buildClientQueries(
  wsLink: WebSocketLink,
  client: ApolloClient<NormalizedCacheObject>,
  cachedServerWsErrorContext: {
    query: DocumentNode;
    errorKey: WsErrorCountKey;
  },
  wsConnectionStatus: { query: DocumentNode; connectionStatusKey: WsConnectonStatusKey },
  queryError: DocumentNode
) {
  // Provide initial state for counting websocket errors
  client.writeQuery({
    query: wsConnectionStatus.query,
    data: {
      [wsConnectionStatus.connectionStatusKey]: false,
    },
  });
  client.writeQuery({
    query: cachedServerWsErrorContext.query,
    data: { [cachedServerWsErrorContext.errorKey]: 0 },
  });
  client.writeQuery({ query: queryError, data: { queryErrorCount: 0 } });

  wsLink['client'].on('closed', () => {
    client.writeQuery({
      query: wsConnectionStatus.query,
      data: { [wsConnectionStatus.connectionStatusKey]: true },
    });
  });

  wsLink['client'].on('connected', async () => {
    console.log('reconnected');
    client.writeQuery({
      query: wsConnectionStatus.query,
      data: { [wsConnectionStatus.connectionStatusKey]: false },
    });
    client.writeQuery({
      query: cachedServerWsErrorContext.query,
      data: { [cachedServerWsErrorContext.errorKey]: 0 },
    });
    await client.resetStore();
    console.log('data refetched');
  });

  wsLink['client'].on('error', () => {
    const previous = client.readQuery({ query: cachedServerWsErrorContext.query });
    console.log(
      `WebSocket error occurred (${
        previous?.[cachedServerWsErrorContext.errorKey] || 0
      }), retrying...`
    );
    client.writeQuery({
      query: cachedServerWsErrorContext.query,
      data: {
        [cachedServerWsErrorContext.errorKey]:
          (previous?.[cachedServerWsErrorContext.errorKey] || 0) + 1,
      },
    });
  });
}

export function getApolloClient({
  cachingServerUrl,
  cachingWSServerUrl,
  protocolDataUrl,
}: NetworkConfig): { client: ApolloClient<NormalizedCacheObject>; wsClients: any[] } {
  const poolTheGraphLink = new HttpLink({ uri: protocolDataUrl });
  const governanceDataLink = governanceConfig
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
          );
        },
        createWsLinkLegacy(governanceConfig.wsGovernanceDataUrl),
        new HttpLink({ uri: governanceConfig.queryGovernanceDataUrl })
      )
    : undefined;

  const thegraphDataLink =
    governanceDataLink === undefined
      ? poolTheGraphLink
      : split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'query' &&
              definition.name?.value === 'UserHistory'
            );
          },
          poolTheGraphLink,
          governanceDataLink
        );

  const cachedServerDataLink = getCachedServerLink(cachingServerUrl, cachingWSServerUrl);
  const generalLink =
    cachedServerDataLink === undefined
      ? thegraphDataLink
      : split(
          ({ query }) => {
            const definition = getMainDefinition(query);
            return (
              definition.kind === 'OperationDefinition' && !!definition.name?.value.startsWith('C_')
            );
          },
          cachedServerDataLink.link,
          thegraphDataLink
        );

  const cache = new InMemoryCache({});

  const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, operation, response }) => {
        console.log(operation, response);
        // TODO: should be customized
        console.log('graphQLErrors', graphQLErrors);
        client.writeQuery({ query: GET_QUERY_ERROR, data: { queryErrorCount: 1 } });
        if (networkError) console.log(`[Network error]: ${networkError}`);
      }),
      generalLink,
    ]),
    resolvers: {
      Queries: {
        isDisconnected: (rootValue, args, context, info) => false,
      },
    },
  });

  const wsClients = [];

  if (cachedServerDataLink) {
    buildClientQueries(
      cachedServerDataLink.networkCachingWSLink,
      client,
      { query: GET_NETWORK_CACHED_SERVER_WS_ERROR, errorKey: WsErrorCountKey.wsNetworkErrorCount },
      {
        query: networkWsConnectionStatusDocument,
        connectionStatusKey: WsConnectonStatusKey.wsNetworkConnectonStatusKey,
      },
      GET_QUERY_ERROR
    );

    if (cachedServerDataLink.mainnetCachingWSLink) {
      buildClientQueries(
        cachedServerDataLink.mainnetCachingWSLink,
        client,
        {
          query: GET_MAINNET_CACHED_SERVER_WS_ERROR,
          errorKey: WsErrorCountKey.wsMainnetErrorCount,
        },
        {
          query: mainnetWsConnectionStatusDocument,
          connectionStatusKey: WsConnectonStatusKey.wsMainnetConnectonStatusKey,
        },
        GET_QUERY_ERROR
      );
    }

    wsClients.push(cachedServerDataLink.networkCachingWSLink['client']);
    if (cachedServerDataLink.mainnetCachingWSLink) {
      wsClients.push(cachedServerDataLink.mainnetCachingWSLink['client']);
    }
  }

  return {
    client,
    wsClients,
  };
}
