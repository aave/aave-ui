import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';
import { PERMISSION, InterestRate } from '@aave/contract-helpers';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';
import RepayContentWrapper from '../../components/RepayContentWrapper';
import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

export default function RepayMain() {
  const intl = useIntl();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const query = queryString.parse(location.search);
  const debtType = query.debtType || InterestRate.Variable;
  const linkQuery = queryString.stringify({ debtType });

  if (!isFeatureEnabled.collateralRepay(currentMarketData)) {
    return <Navigate replace to={`${location.pathname}/balance/?${linkQuery}`} />;
  }

  const buttons = [
    ...(!/XSUSHI/.test(location.pathname) &&
    !/GUSD/.test(location.pathname) &&
    !/BUSD/.test(location.pathname) &&
    !/SUSD/.test(location.pathname) &&
    !/BAL/.test(location.pathname) &&
    !/KNC/.test(location.pathname) &&
    !/ZRX/.test(location.pathname)
      ? [
          {
            title: messages.withYourCurrentCollateral,
            link: `${location.pathname}/collateral/?${linkQuery}`,
          },
        ]
      : []),
    {
      title: messages.fromYourWalletBalance,
      link: `${location.pathname}/balance/?${linkQuery}`,
    },
  ];

  const gradientBackground = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );

  return (
    <PermissionWarning requiredPermission={PERMISSION.BORROWER}>
      <RepayContentWrapper>
        <div className="RepayMain">
          <Caption
            title={intl.formatMessage(defaultMessages.repay)}
            description={intl.formatMessage(messages.description)}
          />

          <div className="RepayMain__buttons-inner">
            {buttons.map((button, index) => (
              <Link to={button.link} key={index} className="RepayMain__link ButtonLink">
                <p>{intl.formatMessage(button.title)}</p>
              </Link>
            ))}
          </div>

          <style jsx={true} global={true}>
            {staticStyles}
          </style>
          <style jsx={true} global={true}>{`
            .RepayMain {
              &__buttons-inner {
                .RepayMain__link {
                  color: ${currentTheme.darkBlue.hex};
                  &:after {
                    background: ${gradientBackground};
                  }
                  p {
                    background: ${currentTheme.white.hex};
                  }
                }
              }
            }
          `}</style>
        </div>
      </RepayContentWrapper>
    </PermissionWarning>
  );
}
