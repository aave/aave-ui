import { useState, useEffect } from 'react';
import { Network } from '@aave/protocol-js';
import { getProvider } from '../../helpers/markets/markets-data';

const mainnetProvider = getProvider(Network.mainnet);

const useGetEnsName = (address: string) => {
  const [ensName, setEnsName] = useState<string | undefined>(undefined);

  const getRecord = async (address: string) => {
    try {
      const name = await mainnetProvider.lookupAddress(address);
      setEnsName(name);
    } catch (error) {
      console.error('ENS lookup error', error);
    }
  };

  useEffect(() => {
    if (address) {
      getRecord(address);
    } else {
      setEnsName(undefined);
    }
  }, [address]);

  return { ensName };
};

export default useGetEnsName;
