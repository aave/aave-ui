import React from 'react';
import { useIntl } from 'react-intl';
import { PERMISSION } from '../../../libs/use-permissions/usePermissions';
import ScreenWrapper from '../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../components/wrappers/ContentWrapper';
import Caption from '../../../components/basic/Caption';

import messages from './messages';
import staticStyles from './style';
import DefaultButton from '../../../components/basic/DefaultButton';

interface PermissionWarningProps {
  requiredPermission: PERMISSION;
}

const ONBOARDING_URL = process.env.REACT_APP_CENTRIFUGE_ONBOARDING_URL;

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
        {requiredPermission === PERMISSION.DEPOSITOR ? (
          <Caption
            title="Onboarding required"
            description={
              <>
                To participate in the Aave Centrifuge market, you will need to complete KYC and sign
                a Subscription Agreement with the issuer, END_Bridge LLC. <br />
                <div style={{ display: 'inline-block', marginTop: '30px' }}>
                  <DefaultButton
                    onClick={() => window.open(ONBOARDING_URL, '_blank')}
                    title="Start onboarding"
                    size="big"
                  />
                </div>
              </>
            }
          />
        ) : requiredPermission === PERMISSION.LIQUIDATOR ? (
          <Caption
            title={intl.formatMessage(messages.caption)}
            description={
              <>
                To liquidate assets in the Aave Centrifuge market, you need to complete KYC and sign
                a Subscription Agreement with the issuer of the DROP token that you wish to
                liquidate. This process can be completed on{' '}
                <a href="https://tinlake.centrifuge.io/" target="_blank" rel="noreferrer">
                  https://tinlake.centrifuge.io/
                </a>
              </>
            }
          />
        ) : (
          <Caption
            title={intl.formatMessage(messages.caption)}
            description={intl.formatMessage(messages.description)}
          />
        )}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </ScreenWrapper>
  );
}
