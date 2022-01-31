import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  split,
  Operation,
  FetchResult,
  Observable,
  useQuery,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink as WebSocketLinkLegacy } from '@apollo/client/link/ws';
import gql from 'graphql-tag';
import { networkConfigs } from '../../helpers/config/markets-and-network-config';
import { governanceConfig, stakeConfig } from '../../ui-config';
import { createClient, ClientOptions, Client } from 'graphql-ws';
import { print } from 'graphql';

/**
 *
 * @param target
 * @returns if thegraph is valid or not - valid means not broken right now
 */
export const useGraphValid = (target: string) => {
  const { data } = useQuery(gql`
  query ErrorCheck${target} {
    error: ${target} @client
  }
`);
  return data?.error !== 1;
};

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

export const APOLLO_QUERY_TARGET = {
  STAKE: 'STAKE',
  GOVERNANCE: 'GOVERNANCE',
  CHAIN: (num: number) => `CHAIN_${num}`,
};

const isSubscription = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
};

const getGovernanceLink = (link?: ApolloLink) => {
  if (governanceConfig) {
    const condition = (operation: Operation) =>
      operation.getContext().target === APOLLO_QUERY_TARGET.GOVERNANCE;
    const http = new HttpLink({ uri: governanceConfig.queryGovernanceDataUrl });
    const ws = createWsLinkLegacy(governanceConfig.wsGovernanceDataUrl);
    return split(
      (operation) => condition(operation) && isSubscription(operation),
      ws,
      split((operation) => condition(operation), http, link)
    );
  }
  return link;
};

const getStakeLink = (link?: ApolloLink) => {
  if (stakeConfig) {
    const condition = (operation: Operation) =>
      operation.getContext().target === APOLLO_QUERY_TARGET.STAKE;
    const http = new HttpLink({ uri: stakeConfig.queryStakeDataUrl });
    const ws = createWsLink(stakeConfig.wsStakeDataUrl);
    return split(
      (operation) => condition(operation) && isSubscription(operation),
      ws,
      split((operation) => condition(operation), http, link)
    );
  }
  return link;
};

export const getApolloClient = () => {
  const link = getStakeLink(getGovernanceLink());

  const combinedLink = Object.entries(networkConfigs).reduce((acc, [key, cfg]) => {
    if (cfg.cachingServerUrl && cfg.cachingWSServerUrl) {
      const condition = (operation: Operation) =>
        operation.getContext().target === APOLLO_QUERY_TARGET.CHAIN(key as unknown as number);
      const http = new HttpLink({ uri: cfg.cachingServerUrl });
      const ws = createWsLink(cfg.cachingWSServerUrl);
      return split(
        (operation) => condition(operation) && isSubscription(operation),
        ws,
        split((operation) => condition(operation), http, acc)
      );
    }
    return acc;
  }, link);

  const cache = new InMemoryCache({});

  if (combinedLink) {
    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        onError(({ graphQLErrors, networkError, operation, response }) => {
          const context = operation.getContext();
          console.log('graphQLErrors', graphQLErrors);
          cache.writeQuery({
            query: gql`
              query MainnetConnectionStatus {
                ${context.target} @client
              }
            `,
            data: { [context.target]: 1 },
          });
          if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        combinedLink as ApolloLink,
      ]),
      connectToDevTools: true,
    });

    return client;
  }
};

export const apolloClient = getApolloClient();
