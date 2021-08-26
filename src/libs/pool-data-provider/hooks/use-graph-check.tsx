import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export interface WsGraphCheck {
  wsErrorCount: number;
}

export enum WsErrorCountKey {
  wsNetworkErrorCount = 'wsNetworkErrorCount',
  wsMainnetErrorCount = 'wsMainnetErrorCount',
}

export const GET_NETWORK_CACHED_SERVER_WS_ERROR = gql`
  {
    wsNetworkErrorCount @client
  }
`;

export const GET_MAINNET_CACHED_SERVER_WS_ERROR = gql`
  {
    wsMainnetErrorCount @client
  }
`;

export function useNetworkCachedServerWsGraphCheck(): WsGraphCheck {
  const { data } = useQuery(GET_NETWORK_CACHED_SERVER_WS_ERROR);

  if (data) {
    return { wsErrorCount: data[WsErrorCountKey.wsNetworkErrorCount] };
  } else {
    return { wsErrorCount: 0 };
  }
}

export function useMainnetCachedServerWsGraphCheck(): WsGraphCheck {
  const { data } = useQuery(GET_MAINNET_CACHED_SERVER_WS_ERROR);

  if (data) {
    return { wsErrorCount: data[WsErrorCountKey.wsMainnetErrorCount] };
  } else {
    return { wsErrorCount: 0 };
  }
}

interface QueryGraphCheck {
  queryErrorCount: number;
}

export const GET_QUERY_ERROR = gql`
  {
    queryErrorCount @client
  }
`;

export function useQueryGraphCheck(): QueryGraphCheck {
  const { data } = useQuery(GET_QUERY_ERROR);

  if (data) {
    return { queryErrorCount: data.queryErrorCount };
  } else {
    return { queryErrorCount: 0 };
  }
}
