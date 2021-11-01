import { useEffect, useState } from 'react';
import { normalize } from '@aave/protocol-js';

import { WalletBalanceProviderFactory } from '../contracts/WalletBalanceProviderContract';
import { useProtocolDataContext } from '../../protocol-data-provider';
import { getNetworkConfig, getProvider } from '../../../helpers/config/markets-and-network-config';
import { ChainId } from '@aave/contract-helpers';

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
  addresses: string[],
  reserveAssets: string[],
  assetDecimals: number = 18
): Promise<WalletBalance[]> => {
  if (!addresses.length || !reserveAssets.length) {
    throw new Error('[retrieveBalance] Missing params');
  }
  const networkConfig = getNetworkConfig(chainId);
  const provider = getProvider(chainId);
  const walletBalanceContract = WalletBalanceProviderFactory.connect(
    networkConfig.addresses.walletBalanceProvider,
    provider
  );
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
  const { chainId } = useProtocolDataContext();

  const getBalances = async (
    addresses: string[],
    reserveAssets: string[],
    assetDecimals: number
  ) => {
    setLoading(true);
    try {
      const balances = await retrieveBalances(chainId, addresses, reserveAssets, assetDecimals);
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
