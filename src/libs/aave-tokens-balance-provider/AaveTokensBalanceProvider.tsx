import { normalize } from '@aave/protocol-js';
import React, { useContext, useEffect } from 'react';
import { WalletBalanceProviderFactory } from '../pool-data-provider/contracts/WalletBalanceProviderContract';
import { useUserWalletDataContext } from '../web3-data-provider';
import { useGovernanceDataContext } from '../governance-provider';
import { getProvider } from '../../helpers/markets/markets-data';

type WalletBalanceProviderContext = {
  aaveTokens: { aave: string; aAave: string; stkAave: string };
  loading: boolean;
};

const Context = React.createContext<WalletBalanceProviderContext>(
  {} as WalletBalanceProviderContext
);

export const AaveTokensBalanceProvider: React.FC = ({ children }) => {
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const { governanceConfig, governanceNetworkConfig } = useGovernanceDataContext();
  const [aaveTokens, setAaveTokens] = React.useState({
    aave: '0',
    aAave: '0',
    stkAave: '0',
  });
  const [aaveTokensLoading, setAaveTokensLoading] = React.useState(false);

  useEffect(() => {
    if (!walletAddress) return;
    const contract = WalletBalanceProviderFactory.connect(
      governanceNetworkConfig.walletBalanceProvider,
      getProvider(governanceConfig.network)
    );
    const fetchAaveTokenBalances = async () => {
      setAaveTokensLoading(true);
      try {
        const balances = await contract.batchBalanceOf(
          [walletAddress],
          [
            governanceConfig.aaveTokenAddress,
            governanceConfig.aAaveTokenAddress,
            governanceConfig.stkAaveTokenAddress,
          ]
        );
        setAaveTokens({
          aave: normalize(balances[0].toString(), 18),
          aAave: normalize(balances[1].toString(), 18),
          stkAave: normalize(balances[2].toString(), 18),
        });
      } catch (e) {
        console.log(e);
      }
      setAaveTokensLoading(false);
    };
    fetchAaveTokenBalances();
    const interval = setInterval(fetchAaveTokenBalances, 60000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return (
    <Context.Provider
      value={{
        aaveTokens,
        loading: aaveTokensLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAaveTokensProviderContext = () => useContext(Context);
