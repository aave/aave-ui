import { ChainId, Network } from '@aave/protocol-js';

type ExtendedSupportedNetworks = Network | 'unsupported';

console.log(
  'Set forkNetworkId, forkRPCUrl, forkWsRPCUrl, fork_enabled to an appropriate value to run against your fork'
);
const FORK_NETWORK_ID = Number(localStorage.getItem('forkNetworkId') || ChainId.fork);
const POLYGON_FORK_NETWORK_ID = Number(
  localStorage.getItem('polygonForkNetworkId') || ChainId.polygon_fork
);

export function mapChainIdToName(id: number): ExtendedSupportedNetworks {
  switch (id) {
    case ChainId.mainnet:
      return Network.mainnet;
    case ChainId.ropsten:
      return Network.ropsten;
    case ChainId.kovan:
      return Network.kovan;
    case ChainId.polygon:
      return Network.polygon;
    case ChainId.mumbai:
      return Network.mumbai;
    case ChainId.fuji:
      return Network.fuji;
    case ChainId.arbitrum_rinkeby:
      return Network.arbitrum_rinkeby;
    case ChainId.arbitrum_one:
      return Network.arbitrum_one;
    case ChainId.avalanche:
      return Network.avalanche;
    case FORK_NETWORK_ID:
      return Network.fork;
    case POLYGON_FORK_NETWORK_ID:
      return Network.polygon_fork;
    default:
      return 'unsupported';
  }
}

export function mapNameToChainID(chain?: ExtendedSupportedNetworks): number {
  switch (chain) {
    case Network.mainnet:
      return ChainId.mainnet;
    case Network.kovan:
      return ChainId.kovan;
    case Network.ropsten:
      return ChainId.ropsten;
    case Network.fork:
      return FORK_NETWORK_ID;
    case Network.polygon_fork:
      return POLYGON_FORK_NETWORK_ID;
    case Network.polygon:
      return ChainId.polygon;
    case Network.mumbai:
      return ChainId.mumbai;
    case Network.fuji:
      return ChainId.fuji;
    case Network.arbitrum_rinkeby:
      return ChainId.arbitrum_rinkeby;
    case Network.arbitrum_one:
      return ChainId.arbitrum_one;
    case Network.avalanche:
      return ChainId.avalanche;
    default:
      return 0;
  }
}
