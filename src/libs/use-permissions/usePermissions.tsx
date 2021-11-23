import React, { useContext, useEffect, useState } from 'react';
import { PermissionManager, PERMISSION } from '@aave/contract-helpers';

import { useProtocolDataContext } from '../protocol-data-provider';
import { useUserWalletDataContext } from '../web3-data-provider';
import Preloader from '../../components/basic/Preloader';
import { getProvider, isFeatureEnabled } from '../../helpers/config/markets-and-network-config';

type PermissionsContext = {
  permissions: PERMISSION[];
};

const Context = React.createContext<PermissionsContext>({
  permissions: [],
});

export const PermissionProvider: React.FC = ({ children }) => {
  const { chainId, currentMarketData } = useProtocolDataContext();
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const [isPermissionsLoading, setIsPermissionsLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<PERMISSION[]>([]);

  async function getPermissionData(permissionManagerAddress: string) {
    try {
      const instance = new PermissionManager({
        provider: getProvider(chainId),
        permissionManagerAddress: permissionManagerAddress,
      });
      const permissions = await instance.getHumanizedUserPermissions(walletAddress);
      setIsPermissionsLoading(true);
      setPermissions(permissions);
    } catch (e) {
      throw new Error('there was an error fetching your permissions');
    }
    setIsPermissionsLoading(false);
  }

  useEffect(() => {
    if (
      isFeatureEnabled.permissions(currentMarketData) &&
      walletAddress &&
      currentMarketData.addresses.PERMISSION_MANAGER
    ) {
      getPermissionData(currentMarketData.addresses.PERMISSION_MANAGER);
    } else {
      setIsPermissionsLoading(false);
    }
  }, [walletAddress, currentMarketData.addresses.PERMISSION_MANAGER]);

  if (isPermissionsLoading) {
    return <Preloader />;
  }

  return (
    <Context.Provider
      value={{
        permissions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const usePermissions = () => useContext(Context);
