import React from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/math-utils';
import { gradient, TokenIcon, useThemeContext } from '@aave/aave-ui-kit';

import { ReserveIncentive } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { CompactNumber } from '../../basic/CompactNumber';

import staticStyles from './style';

interface IncentivesButtonProps {
  incentives?: ReserveIncentive[];
}

export default function IncentivesButton({ incentives }: IncentivesButtonProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  if (!(incentives && incentives.length > 0)) return null;

  const isIncentivesInfinity = incentives.some(
    (incentive) => incentive.incentiveAPR === 'Infinity'
  );
  const incentivesAPRSum = isIncentivesInfinity
    ? 'Infinity'
    : incentives.reduce((aIncentive, bIncentive) => aIncentive + +bIncentive.incentiveAPR, 0);

  const incentivesNetAPY = isIncentivesInfinity
    ? 'Infinity'
    : incentivesAPRSum !== 'Infinity'
    ? valueToBigNumber(incentivesAPRSum).dividedBy(incentives.length).toNumber()
    : 'Infinity';

  const incentivesButtonValue = () => {
    if (incentivesNetAPY !== 'Infinity' && incentivesNetAPY < 10000) {
      return intl.formatNumber(incentivesNetAPY, { maximumFractionDigits: 2 });
    } else if (incentivesNetAPY !== 'Infinity' && incentivesNetAPY > 9999) {
      return <CompactNumber value={incentivesNetAPY} maximumFractionDigits={2} />;
    } else if (incentivesNetAPY === 'Infinity') {
      return <span className="IncentivesButton__infinity">∞</span>;
    }
  };

  return (
    <div className="IncentivesButton" onClick={(e) => e.stopPropagation()}>
      <div className="IncentivesButton__content">
        <p className="IncentivesButton__valueInner">
          + <strong>{incentivesButtonValue()}</strong> %
        </p>
        <div className="IncentivesButton__icons">
          <>
            {incentives.length < 5 ? (
              <>
                {incentives.map((incentive) => (
                  <TokenIcon tokenSymbol={incentive.rewardTokenSymbol} height={12} width={12} />
                ))}
              </>
            ) : (
              <>
                {incentives.slice(0, 3).map((incentive) => (
                  <TokenIcon tokenSymbol={incentive.rewardTokenSymbol} height={12} width={12} />
                ))}
                <p className="IncentivesButton__rest">...</p>
              </>
            )}
          </>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .IncentivesButton {
          color: ${currentTheme.textDarkBlue.hex};
          &:after {
            background: ${isCurrentThemeDark
              ? currentTheme.lightBlue.hex
              : currentTheme.mainBg.hex};
          }
          &:hover,
          &:active {
            &:after {
              background: ${gradient(
                248.86,
                `${currentTheme.primary.rgb}, 1`,
                10.51,
                `${currentTheme.secondary.rgb}, 1`,
                93.41
              )};
            }
          }

          &__content {
            background: ${currentTheme.whiteElement.hex};
          }
        }
      `}</style>
    </div>
  );
}
