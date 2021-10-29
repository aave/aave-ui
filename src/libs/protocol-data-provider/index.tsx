import { providers } from 'ethers';
import React, { PropsWithChildren, useContext, useState } from 'react';
import { Network } from '@aave/protocol-js';
import { CustomMarket, marketsData } from '../../ui-config';
import {
  getNetworkConfig,
  getProvider,
  MarketDataType,
  NetworkConfig,
} from '../../helpers/markets/markets-data';
import { mapNameToChainID } from '../web3-data-provider';
import { availableMarkets } from '../../config';

const LS_KEY = 'selectedMarket';

export interface ProtocolContextData {
  currentMarket: CustomMarket;
  setCurrentMarket: (market: CustomMarket) => void;
  currentMarketData: MarketDataType;
  // currently selected one
  chainId: number;
  network: Network;
  networkConfig: NetworkConfig;
  jsonRpcProvider: providers.Provider;
}

const PoolDataContext = React.createContext({} as ProtocolContextData);

/**
 * @returns the last accessed market if it's still available, the first market if not.
 */
const getInitialMarket = () => {
  const cachedMarket = localStorage.getItem(LS_KEY) as CustomMarket | undefined;
  if (cachedMarket && availableMarkets.includes(cachedMarket)) return cachedMarket;
  return availableMarkets[0];
};

export function ProtocolDataProvider({ children }: PropsWithChildren<{}>) {
  const [currentMarket, setCurrentMarket] = useState<CustomMarket>(getInitialMarket());

  const currentMarketData = marketsData[currentMarket];
  const network = currentMarketData.network;

  const handleSetMarket = (market: CustomMarket) => {
    localStorage.setItem(LS_KEY, market);
    setCurrentMarket(market);
  };

  return (
    <PoolDataContext.Provider
      value={{
        network,
        currentMarket,
        chainId: mapNameToChainID(marketsData[currentMarket].network),
        setCurrentMarket: handleSetMarket,
        currentMarketData: currentMarketData,
        networkConfig: getNetworkConfig(network),
        jsonRpcProvider: getProvider(network),
      }}
    >
      {children}
    </PoolDataContext.Provider>
  );
}

export const useProtocolDataContext = () => useContext(PoolDataContext);
