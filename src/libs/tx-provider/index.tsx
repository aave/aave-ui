import React, { PropsWithChildren, useContext } from 'react';
import {
  TxBuilderV2,
  TxBuilderConfig,
  FaucetInterface,
  IncentivesControllerInterface,
  LendingPoolConfig,
  Network,
} from '@aave/protocol-js';

import { useProtocolDataContext } from '../protocol-data-provider';
import { networkConfigs } from '../../helpers/config/markets-and-network-config';
import { marketsData, getProvider } from '../../helpers/config/markets-and-network-config';
import { ChainIdToNetwork, LendingPool } from '@aave/contract-helpers';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool;
  faucetService: FaucetInterface;
  incentiveService: IncentivesControllerInterface;
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

const networkConfig = Object.entries(networkConfigs).reduce<TxBuilderConfig>(
  (acc, [key, value]) => {
    if (value.addresses) {
      if (!acc.incentives) {
        acc.incentives = {};
      }
      acc.incentives[key] = {
        INCENTIVES_CONTROLLER: value.addresses?.INCENTIVES_CONTROLLER,
        INCENTIVES_CONTROLLER_REWARD_TOKEN: value.addresses?.INCENTIVES_CONTROLLER_REWARD_TOKEN,
      };
    }
    return acc;
  },
  { incentives: {} }
);

export function TxBuilderProvider({ children }: PropsWithChildren<{}>) {
  const { currentMarket, chainId: currentChainId, currentMarketData } = useProtocolDataContext();
  const currentNetwork = ChainIdToNetwork[currentChainId] as Network;

  // txBuilder used for lending pool
  const txBuilder = new TxBuilderV2(
    currentNetwork,
    getProvider(currentChainId),
    undefined,
    Object.assign(marketConfig, networkConfig)
  );

  const lendingPool = new LendingPool(getProvider(currentChainId), {
    LENDING_POOL: currentMarketData.addresses.LENDING_POOL,
    REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
    SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
    FAUCET: currentMarketData.addresses.FAUCET,
    WETH_GATEWAY: currentMarketData.addresses.WETH_GATEWAY,
  });

  const { incentiveService } = txBuilder;

  return (
    <TxBuilderContext.Provider
      value={{ lendingPool, faucetService: txBuilder.getFaucet(currentMarket), incentiveService }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
}

export const useTxBuilderContext = () => useContext(TxBuilderContext);
