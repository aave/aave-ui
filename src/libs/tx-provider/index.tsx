import React, { PropsWithChildren, useContext } from 'react';
import {
  TxBuilderV2,
  TxBuilderConfig,
  FaucetInterface,
  LendingPoolConfig,
  Network,
} from '@aave/protocol-js';

import { useProtocolDataContext } from '../protocol-data-provider';
import { marketsData, getProvider } from '../../helpers/config/markets-and-network-config';
import { ChainIdToNetwork, LendingPool } from '@aave/contract-helpers';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool;
  faucetService: FaucetInterface;
}

const TxBuilderContext = React.createContext({} as TxBuilderContextInterface);

const marketConfig = Object.entries(marketsData).reduce<
  TxBuilderConfig & { lendingPool: LendingPoolConfig }
>(
  (acc, [key, value]) => {
    if (!acc.lendingPool?.[value.chainId]) {
      acc.lendingPool[ChainIdToNetwork[value.chainId]] = {};
    }
    acc.lendingPool[ChainIdToNetwork[value.chainId]][key] = {
      LENDING_POOL: value.addresses.LENDING_POOL,
      WETH_GATEWAY: value.addresses.WETH_GATEWAY,
      REPAY_WITH_COLLATERAL_ADAPTER: value.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: value.addresses.SWAP_COLLATERAL_ADAPTER,
      FAUCET: value.addresses.FAUCET,
    };

    return acc;
  },
  { lendingPool: {} }
);

export function TxBuilderProvider({ children }: PropsWithChildren<{}>) {
  const { currentMarket, chainId: currentChainId, currentMarketData } = useProtocolDataContext();
  const currentNetwork = ChainIdToNetwork[currentChainId] as Network;

  // txBuilder used for lending pool
  const txBuilder = new TxBuilderV2(
    currentNetwork,
    getProvider(currentChainId),
    undefined,
    marketConfig
  );

  const lendingPool = new LendingPool(getProvider(currentChainId), {
    LENDING_POOL: currentMarketData.addresses.LENDING_POOL,
    REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
    SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
    FAUCET: currentMarketData.addresses.FAUCET,
    WETH_GATEWAY: currentMarketData.addresses.WETH_GATEWAY,
  });

  return (
    <TxBuilderContext.Provider
      value={{ lendingPool, faucetService: txBuilder.getFaucet(currentMarket) }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
}

export const useTxBuilderContext = () => useContext(TxBuilderContext);
