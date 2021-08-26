import React from 'react';
import { useIntl } from 'react-intl';

import { PERMISSION } from '../../libs/use-permissions/usePermissions';
import ScreenWrapper from '../wrappers/ScreenWrapper';
import ContentWrapper from '../wrappers/ContentWrapper';
import Caption from '../basic/Caption';

import messages from './messages';
import staticStyles from './style';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
}

// TODO: need add link (like in design)

export default function PermissionWarning({ requiredPermission }: PermissionWarningProps) {
  const intl = useIntl();

  return (
    <ScreenWrapper isTopLineSmall={true} className="PermissionWarning">
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <Caption
          title={intl.formatMessage(messages.caption)}
          // description={intl.formatMessage(messages.description, { action: requiredPermission })} //TODO: add action variable on need
          description={intl.formatMessage(messages.description)}
        />
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
