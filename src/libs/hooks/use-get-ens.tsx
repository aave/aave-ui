import { useState, useEffect } from 'react';
import { ChainId } from '@aave/contract-helpers';
import { getProvider } from '../../helpers/config/markets-and-network-config';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';

const mainnetProvider = getProvider(ChainId.mainnet);

interface EnsResponse {
  name?: string;
  avatar?: string;
}

const useGetEns = (address: string): EnsResponse => {
  const [ensName, setEnsName] = useState<string | undefined>(undefined);
  const [ensAvatar, setEnsAvatar] = useState<string | undefined>(undefined);
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const getName = async (address: string) => {
    try {
      const name = await mainnetProvider.lookupAddress(address);
      setEnsName(name ? name : undefined);
    } catch (error) {
      console.error('ENS name lookup error', error);
    }
  };

  const getAvatar = async (name: string) => {
    try {
      const resolver = await provider?.getResolver(name);
      const avatar = await resolver?.getAvatar();
      setEnsAvatar(avatar && avatar.url ? avatar.url : undefined);
    } catch (error) {
      console.error('ENS avatar lookup error', error);
    }
  };

  useEffect(() => {
    if (address) {
      getName(address);
    } else {
      setEnsName(undefined);
    }
  }, [address]);

  useEffect(() => {
    if (ensName) {
      getAvatar(ensName);
    } else {
      setEnsAvatar(undefined);
    }
  }, [ensName]);

  return { name: ensName, avatar: ensAvatar };
};

export default useGetEns;
