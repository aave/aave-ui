import { BigNumber } from 'ethers';
import React, { useContext, useEffect, useMemo } from 'react';
import {
  marketsData,
  getNetworkConfig,
  getProvider,
  CustomMarket,
} from '../../helpers/config/markets-and-network-config';
import { WalletBalanceProviderFactory } from '../pool-data-provider/contracts/WalletBalanceProviderContract';
import { useProtocolDataContext } from '../protocol-data-provider';
import { useUserWalletDataContext } from '../web3-data-provider';

type WalletBalanceContractData = {
  0: string[];
  1: BigNumber[];
};

type WalletBalanceProviderContext = {
  markets: {
    [key in keyof typeof CustomMarket]?: {
      [address: string]: string;
    };
  };
  marketsLoading: boolean;
  subscribeToMarket: (market: CustomMarket) => void;
  unsubscribeFromMarket: (market: CustomMarket) => void;
  refetch: () => void;
};

const Context = React.createContext<WalletBalanceProviderContext>(
  {} as WalletBalanceProviderContext
);

export const WalletBalanceProvider: React.FC = ({ children }) => {
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const [markets, setMarkets] = React.useState<{
    [key in keyof typeof CustomMarket]?: {
      [address: string]: string;
    };
  }>({});
  const [marketsLoading, setMarketsLoading] = React.useState(false);
  const [observedMarkets, setObservedMarkets] = React.useState<CustomMarket[]>([]);

  const uniqueMarkets = observedMarkets.filter((value, ix, self) => self.indexOf(value) === ix);

  const subscribeToMarket = (market: CustomMarket) => {
    setObservedMarkets([...observedMarkets, market]);
  };

  const unsubscribeFromMarket = (market: CustomMarket) => {
    // removes the first matching element from the list as there might be multiple subscribers for the same topic
    const index = observedMarkets.indexOf(market);
    setObservedMarkets([...observedMarkets].splice(index, 1));
  };

  const fetchFunctions = useMemo(() => {
    return uniqueMarkets.map((market) => {
      const marketData = marketsData[market];
      const networkConfig = getNetworkConfig(marketData.chainId);
      const provider = getProvider(marketData.chainId);
      const contract = WalletBalanceProviderFactory.connect(
        networkConfig.addresses.walletBalanceProvider,
        provider
      );

      return async () => {
        const { 0: reserves, 1: balances }: WalletBalanceContractData =
          await contract.getUserWalletBalances(
            marketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
            walletAddress
          );

        const aggregatedBalance = reserves.reduce((acc, reserve, i) => {
          acc[reserve.toLowerCase()] = balances[i].toString();
          return acc;
        }, {} as { [address: string]: string });
        setMarkets((prev) => ({ ...prev, [market]: aggregatedBalance }));
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueMarkets.toString()]);

  const refetch = async () => {
    setMarketsLoading(true);
    try {
      await Promise.all(fetchFunctions.map((fn) => fn()));
    } catch (e) {
      console.log('error fetching balances', e);
    }
    setMarketsLoading(false);
  };

  useEffect(() => {
    if (!walletAddress) return;
    refetch();
    // refresh based on interval
    const interval = setInterval(async () => {
      refetch();
    }, 30000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, JSON.stringify(uniqueMarkets)]);

  // whenever address changes or gets unset, unset balances
  useEffect(() => {
    setMarkets({});
  }, [walletAddress]);

  return (
    <Context.Provider
      value={{
        markets,
        subscribeToMarket,
        unsubscribeFromMarket,
        marketsLoading,
        refetch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type UseWalletBalanceProviderContextProps = {
  market?: CustomMarket;
  skip?: boolean;
};
/**
 * Returns current wallet balance for the provided market.
 * Falls back to current market when no market is provided.
 * @param market
 */
export const useWalletBalanceProviderContext = ({
  market,
  skip,
}: UseWalletBalanceProviderContextProps = {}) => {
  const { currentMarket } = useProtocolDataContext();
  const context = useContext(Context);

  useEffect(() => {
    if (skip) return;
    context.subscribeToMarket(market || currentMarket);
    return () => context.unsubscribeFromMarket(market || currentMarket);
  }, [market, currentMarket]);
  return {
    walletData: context.markets[market || currentMarket] || {},
    loading: context.marketsLoading,
    refetch: context.refetch,
  };
};
