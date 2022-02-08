import React from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import { InterestRate } from '@aave/protocol-js';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../../libs/protocol-data-provider';
import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';

import defaultMessages from '../../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';
import { isFeatureEnabled } from '../../../../helpers/config/markets-and-network-config';
import PermissionWarning from '../../../../ui-config/branding/PermissionWarning';
import { PERMISSION } from '@aave/contract-helpers';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';

function RepayMain({ poolReserve }: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { currentMarketData } = useProtocolDataContext();

  const query = queryString.parse(location.search);
  const debtType = query.debtType || InterestRate.Variable;
  const linkQuery = queryString.stringify({ debtType });

  if (!isFeatureEnabled.collateralRepay(currentMarketData)) {
    return <Redirect to={`${history.location.pathname}/balance/?${linkQuery}`} />;
  }

  const buttons = [
    ...(!['XSUSHI', 'GUSD', 'BUSD', 'SUSD', 'BAL', 'KNC', 'ZRX'].includes(
      poolReserve.symbol.toUpperCase()
    )
      ? [
          {
            title: messages.withYourCurrentCollateral,
            link: `${history.location.pathname}/collateral/?${linkQuery}`,
          },
        ]
      : []),
    {
      title: messages.fromYourWalletBalance,
      link: `${history.location.pathname}/balance/?${linkQuery}`,
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
    </PermissionWarning>
  );
}

export default routeParamValidationHOC({})(RepayMain);
