import React, { PropsWithChildren, useContext } from 'react';
import {
  LendingPoolInterfaceV2,
  TxBuilderV2,
  TxBuilderConfig,
  FaucetInterface,
  LendingPoolConfig,
} from '@aave/protocol-js';

import { useProtocolDataContext } from '../protocol-data-provider';
import { getProvider } from '../../helpers/markets/markets-data';
import { marketsData } from '../../ui-config';

export interface TxBuilderContextInterface {
  lendingPool: LendingPoolInterfaceV2;
  faucetService: FaucetInterface;
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
      FLASH_LIQUIDATION_ADAPTER: value.addresses.FLASH_LIQUIDATION_ADAPTER,
      REPAY_WITH_COLLATERAL_ADAPTER: value.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: value.addresses.SWAP_COLLATERAL_ADAPTER,
      FAUCET: value.addresses.FAUCET,
    };

    return acc;
  },
  { lendingPool: {} }
);

export function TxBuilderProvider({ children }: PropsWithChildren<{}>) {
  const { currentMarket, network: currentNetwork } = useProtocolDataContext();

  // txBuilder used for lending pool
  const txBuilder = new TxBuilderV2(
    currentNetwork,
    getProvider(currentNetwork),
    undefined,
    marketConfig
  );
  const lendingPool = txBuilder.getLendingPool(currentMarket);

  return (
    <TxBuilderContext.Provider
      value={{ lendingPool, faucetService: txBuilder.getFaucet(currentMarket) }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
}

export const useTxBuilderContext = () => useContext(TxBuilderContext);
