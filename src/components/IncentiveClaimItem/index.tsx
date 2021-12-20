import React from 'react';
import { useIntl } from 'react-intl';
import { CustomTooltip, useThemeContext } from '@aave/aave-ui-kit';

import Value from '../basic/Value';
import Link from '../basic/Link';
import { TokenIcon } from '../../helpers/config/assets-config';

import defaultMessages from '../../defaultMessages';
import staticStyles from './style';

import tribeIcon from '../../images/tirbe.svg';

interface IncentiveClaimItemProps {
  symbol: string;
  claimableRewards: string;
  incentiveControllerAddress: string;
}

export default function IncentiveClaimItem({
  symbol,
  claimableRewards,
  incentiveControllerAddress,
}: IncentiveClaimItemProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm, isCurrentThemeDark } = useThemeContext();

  const iconSize = xl && !sm ? 16 : 20;

  const rewardClaimLink = `/rewards/confirm/${incentiveControllerAddress}`;
  const tooltipId = `incentiveClaimItem--${symbol}`;

  return (
    <div className="IncentiveClaimItem" data-tip={true} data-for={tooltipId}>
      <div className="IncentiveClaimItem__valueInner">
        {symbol === 'TRIBE' ? (
          <img
            className="IncentiveClaimItem__icon"
            src={tribeIcon}
            style={{ width: iconSize, height: iconSize }}
            alt=""
          />
        ) : (
          <TokenIcon tokenSymbol={symbol} height={iconSize} width={iconSize} />
        )}
        <Value value={claimableRewards} compact={true} color={sm ? 'dark' : 'white'} />
      </div>

      <Link
        to={rewardClaimLink}
        className="ButtonLink"
        disabled={claimableRewards === '0'}
        title={intl.formatMessage(defaultMessages.claim)}
      />

      {!sm && (
        <CustomTooltip
          tooltipId={tooltipId}
          text={`${Number(claimableRewards).toFixed(10)} ${symbol}`}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .IncentiveClaimItem {
          border: 1px solid ${currentTheme.lightBlue.hex};
          &:hover {
            border: 1px solid
              ${sm && !isCurrentThemeDark ? currentTheme.lightBlue.hex : currentTheme.white.hex};
          }

          .Link {
            color: ${sm && !isCurrentThemeDark
              ? currentTheme.secondary.hex
              : currentTheme.lightBlue.hex};
            &:hover {
              color: ${currentTheme.secondary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
