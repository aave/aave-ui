import React from 'react';
import { useIntl } from 'react-intl';
import { CustomTooltip, TokenIcon, useThemeContext } from '@aave/aave-ui-kit';

import Value from '../../basic/Value';
import Link from '../../basic/Link';

import defaultMessages from '../../../defaultMessages';
import staticStyles from './style';

import messages from './messages';

interface IncentiveClaimItemProps {
  symbol: string;
  claimableRewards: string;
  rewardTokenAddress: string;
  claimAll?: boolean;
}

export default function IncentiveClaimItem({
  symbol,
  claimableRewards,
  rewardTokenAddress,
  claimAll,
}: IncentiveClaimItemProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm, isCurrentThemeDark } = useThemeContext();

  const iconSize = xl && !sm ? 16 : 20;

  const rewardClaimLink = claimAll
    ? `rewards/confirm/all`
    : `/rewards/confirm/${rewardTokenAddress}`;
  const tooltipId = `incentiveClaimItem--${symbol}`;

  return (
    <div className="IncentiveClaimItem" data-tip={true} data-for={tooltipId}>
      {!claimAll && (
        <div className="IncentiveClaimItem__valueInner">
          <TokenIcon tokenSymbol={symbol} height={iconSize} width={iconSize} />
          <Value
            value={claimableRewards}
            compact={true}
            color={sm ? 'dark' : 'white'}
            maximumValueDecimals={4}
            minimumValueDecimals={4}
          />
        </div>
      )}

      <Link
        to={rewardClaimLink}
        className="ButtonLink"
        disabled={claimAll ? false : claimableRewards === '0'}
        title={intl.formatMessage(claimAll ? messages.claimAll : defaultMessages.claim)}
      />

      {!sm && !claimAll && (
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
