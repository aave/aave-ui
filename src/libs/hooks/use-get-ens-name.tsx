import { useState, useEffect } from 'react';
import { Network } from '@aave/protocol-js';
import { getProvider } from '../../helpers/markets/markets-data';

const mainnetProvider = getProvider(Network.mainnet);

const useGetEnsName = (address: string) => {
  const [loading, setLoading] = useState(false);
  const [ensName, setEnsName] = useState<string | undefined>(undefined);

  const getRecord = async (address: string) => {
    if (address !== '') {
      setLoading(true);
      try {
        const name = await mainnetProvider.lookupAddress(address);
        setEnsName(name);
      } catch (error) {
        console.error('ENS lookup error', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecord(address);
  }, [address]);

  return { ensName, loading };
};

export default useGetEnsName;
