import React from 'react';
import { useIntl } from 'react-intl';
import { PERMISSION } from '@aave/contract-helpers';

import { usePermissions } from '../../../libs/use-permissions/usePermissions';
import ScreenWrapper from '../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../components/wrappers/ContentWrapper';
import Caption from '../../../components/basic/Caption';

import messages from './messages';
import staticStyles from './style';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
import { isFeatureEnabled } from '../../../helpers/config/markets-and-network-config';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
  children: React.ReactElement;
}

/**
 * Is rendered when you're trying to perform an action you are not allowed to
 * @param requiredPermission holds the permission currently needed
 * @returns
 */
const PermissionWarning: React.FC<
  RouteComponentProps<{ id?: string; underlyingAsset?: string }> & PermissionWarningProps
> = ({ children, requiredPermission, match }) => {
  const intl = useIntl();
  const { currentMarketData } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const { permissions } = usePermissions();

  if (
    !isFeatureEnabled.permissions(currentMarketData) ||
    !userId ||
    permissions.includes(requiredPermission)
  ) {
    return children;
  }

  return (
    <ScreenWrapper isTopLineSmall={true} className="PermissionWarning">
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
        />
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
};

export default withRouter(PermissionWarning);
