import { useEffect, useState } from 'react';
import { normalize } from '@aave/protocol-js';

import { useProtocolDataContext } from '../../protocol-data-provider';
import { getProvider } from '../../../helpers/config/markets-and-network-config';
import { ChainId, WalletBalanceProvider } from '@aave/contract-helpers';
import { MarketDataType } from '../../../helpers/config/types';

interface AddressBalance {
  [key: string]: string;
}
interface WalletBalance {
  address: string;
  balances: AddressBalance;
}

const reduceDefaultBalance = (assets: string[]) =>
  assets.reduce<AddressBalance>((acc, assetAddress) => {
    acc[assetAddress] = '0';
    return acc;
  }, {});

const retrieveBalances = async (
  chainId: ChainId,
  marketData: MarketDataType,
  addresses: string[],
  reserveAssets: string[],
  assetDecimals: number = 18
): Promise<WalletBalance[]> => {
  if (!addresses.length || !reserveAssets.length) {
    throw new Error('[retrieveBalance] Missing params');
  }
  const provider = getProvider(chainId);
  const walletBalanceContract = new WalletBalanceProvider({
    walletBalanceProviderAddress: marketData.addresses.WALLET_BALANCE_PROVIDER,
    provider,
  });
  try {
    const balances = await walletBalanceContract.batchBalanceOf(addresses, reserveAssets);
    return addresses.map<WalletBalance>((address, addressIndex) => {
      return {
        address: address.toLowerCase(),
        balances: reserveAssets.reduce<AddressBalance>((acc, asset, assetIndex) => {
          acc[asset] = normalize(balances[addressIndex + assetIndex].toString(), assetDecimals);
          return acc;
        }, {}),
      };
    });
  } catch (e) {
    throw e;
  }
};

export function useGetWalletsBalance(
  walletAddresses: string[],
  assetAddresses: string[],
  decimals: number,
  pollingInterval: number = 0,
  skip = false
) {
  const [loading, setLoading] = useState(true);
  const [walletsData, setWalletsData] = useState<WalletBalance[]>(
    walletAddresses.map((address) => ({ address, balances: reduceDefaultBalance(assetAddresses) }))
  );
  const { chainId, currentMarketData } = useProtocolDataContext();

  const getBalances = async (
    addresses: string[],
    reserveAssets: string[],
    assetDecimals: number
  ) => {
    setLoading(true);
    try {
      const balances = await retrieveBalances(
        chainId,
        currentMarketData,
        addresses,
        reserveAssets,
        assetDecimals
      );
      setWalletsData(balances);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // initial fetch
  useEffect(() => {
    if (!skip && walletAddresses.length && assetAddresses.length) {
      getBalances(walletAddresses, assetAddresses, decimals);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddresses.toString(), assetAddresses.toString(), decimals, skip]);

  // interval based update
  useEffect(() => {
    if (!pollingInterval) return;
    const interval = setInterval(() => {
      if (!skip && walletAddresses.length && assetAddresses.length) {
        getBalances(walletAddresses, assetAddresses, decimals);
      }
    }, pollingInterval * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddresses.toString(), assetAddresses.toString(), decimals, pollingInterval, skip]);

  return { loading, walletsData };
}
