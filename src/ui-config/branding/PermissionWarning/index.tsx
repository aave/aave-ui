import React from 'react';
import { useIntl } from 'react-intl';

import { PERMISSION } from '../../../libs/use-permissions/usePermissions';
import ScreenWrapper from '../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../components/wrappers/ContentWrapper';
import Caption from '../../../components/basic/Caption';

import messages from './messages';
import staticStyles from './style';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
}

/**
 * Is rendered when you're trying to perform an action you are not allowed to
 * @param requiredPermission holds the permission currently needed
 * @returns
 */
export default function PermissionWarning({ requiredPermission }: PermissionWarningProps) {
  const intl = useIntl();

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
}
