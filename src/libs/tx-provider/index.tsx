import React, { PropsWithChildren, useContext } from 'react';
import {
  LendingPoolInterfaceV2,
  TxBuilderV2,
  TxBuilderConfig,
  FaucetInterface,
  IncentivesControllerInterface,
  LendingPoolConfig,
} from '@aave/protocol-js';

import { useProtocolDataContext } from '../protocol-data-provider';
import { getProvider } from '../../helpers/markets/markets-data';
import { networkConfigs, marketsData } from '../../ui-config';

export interface TxBuilderContextInterface {
  lendingPool: LendingPoolInterfaceV2;
  faucetService: FaucetInterface;
  incentiveService: IncentivesControllerInterface;
}

const TxBuilderContext = React.createContext({} as TxBuilderContextInterface);

const marketConfig = Object.entries(marketsData).reduce<
  TxBuilderConfig & { lendingPool: LendingPoolConfig }
>(
  (acc, [key, value]) => {
    if (!acc.lendingPool?.[value.network]) {
      acc.lendingPool[value.network] = {};
    }
    acc.lendingPool[value.network][key] = {
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
  const { currentMarket, network: currentNetwork } = useProtocolDataContext();

  // txBuilder used for lending pool
  const txBuilder = new TxBuilderV2(
    currentNetwork,
    getProvider(currentNetwork),
    undefined,
    Object.assign(marketConfig, networkConfig)
  );
  const lendingPool = txBuilder.getLendingPool(currentMarket);

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
