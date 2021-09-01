import React, { useContext, useEffect, useState } from 'react';

import { PERMISSIONS_API } from '../../config';
import { useProtocolDataContext } from '../protocol-data-provider';
import { useUserWalletDataContext } from '../web3-data-provider';
import Preloader from '../../components/basic/Preloader';
import { useStaticPoolDataContext } from '../pool-data-provider';
import PermissionWarning from '../../ui-config/branding/PermissionWarning';
import { isFeatureEnabled } from '../../helpers/markets/markets-data';

export enum PERMISSION {
  DEPOSITOR = 'DEPOSITOR',
  BORROWER = 'BORROWER',
  LIQUIDATOR = 'LIQUIDATOR',
  STABLE_RATE_MANAGER = 'STABLE_RATE_MANAGER',
}

const PERMISSION_MAP = {
  0: PERMISSION.DEPOSITOR,
  1: PERMISSION.BORROWER,
  2: PERMISSION.LIQUIDATOR,
  3: PERMISSION.STABLE_RATE_MANAGER,
};

type PermissionsContext = {
  permissions: PERMISSION[];
};

const Context = React.createContext<PermissionsContext>({
  permissions: [],
});

export const PermissionProvider: React.FC = ({ children }) => {
  const { currentAccount: walletAddress } = useUserWalletDataContext();
  const [isPermissionsLoading, setIsPermissionsLoading] = useState<boolean>(true);
  const [permissions, setPermissions] = useState<PERMISSION[]>([]);

  async function getPermissionData() {
    try {
      setIsPermissionsLoading(true);
      const data: { permissions: (0 | 1 | 2 | 3)[] } = await (
        await fetch(`${PERMISSIONS_API}/${walletAddress}`).then((resp) => {
          if (resp.status !== 200) throw resp;
          return resp;
        })
      ).json();
      setPermissions(data.permissions.map((key) => PERMISSION_MAP[key]));
    } catch (e) {
      if (e.status === 400) throw new Error('there was an error fetching your permissions');
      console.log(`data fetching error: ${e.message}`);
    }
    setIsPermissionsLoading(false);
  }

  useEffect(() => {
    if (walletAddress && PERMISSIONS_API) {
      getPermissionData();
    } else {
      setIsPermissionsLoading(false);
    }
  }, [walletAddress]);

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

export const RequiredPermissionsWrapper: React.FC<{ requiredPermission: PERMISSION }> = ({
  children,
  requiredPermission,
}) => {
  const { currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const { permissions } = usePermissions();

  if (
    userId &&
    isFeatureEnabled.permissions(currentMarketData) &&
    !permissions.includes(requiredPermission)
  ) {
    return <PermissionWarning requiredPermission={requiredPermission} />;
  }

  return <>{children}</>;
};
