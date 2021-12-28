import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { valueToBigNumber } from '@aave/math-utils';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { ReserveIncentiveResponse } from '../../../libs/pool-data-provider/hooks/use-incentives-data';
import { TokenIcon } from '../../../helpers/config/assets-config';
import { CompactNumber } from '../../basic/CompactNumber';
import TribeRewardHelpModal from '../../HelpModal/TribeRewardHelpModal';
import IncentivesInfoModal from '../IncentivesInfoModal';

import staticStyles from './style';

interface IncentivesButtonProps {
  symbol: string;
  incentives?: ReserveIncentiveResponse[];
}

export default function IncentivesButton({ incentives, symbol }: IncentivesButtonProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark, lg, md } = useThemeContext();

  const [isModalVisible, setIsModalVisible] = useState(false);

  if (!(incentives && incentives.length > 0)) return null;

  const isIncentivesInfinity = incentives.some(
    (incentive) => incentive.incentiveAPR === 'Infinity'
  );
  const incentivesAPRSum = isIncentivesInfinity
    ? 'Infinity'
    : incentives.reduce((aIncentive, bIncentive) => aIncentive + +bIncentive.incentiveAPR, 0);

  const incentivesNetAPR = isIncentivesInfinity
    ? 'Infinity'
    : incentivesAPRSum !== 'Infinity'
    ? valueToBigNumber(incentivesAPRSum).multipliedBy(100).toNumber()
    : 'Infinity';

  const incentivesButtonValue = () => {
    if (incentivesNetAPR !== 'Infinity' && incentivesNetAPR < 10000) {
      return intl.formatNumber(incentivesNetAPR, { maximumFractionDigits: 2 });
    } else if (incentivesNetAPR !== 'Infinity' && incentivesNetAPR > 9999) {
      return <CompactNumber value={incentivesNetAPR} maximumFractionDigits={2} />;
    } else if (incentivesNetAPR === 'Infinity') {
      return <span className="IncentivesButton__infinity">∞</span>;
    }
  };

  const isFeiReward = symbol === 'FEI';

  const iconSize = lg && !md ? 10 : 12;

  return (
    <>
      <div
        className={classNames('IncentivesButton', { IncentivesButton__clickable: !isFeiReward })}
        onClick={(e) => {
          e.stopPropagation();
          !isFeiReward && setIsModalVisible(true);
        }}
      >
        <div className="IncentivesButton__content">
          {isFeiReward ? (
            <TokenIcon
              className="IncentivesButton__tribe"
              tokenSymbol="TRIBE"
              height={iconSize}
              width={iconSize}
              withTokenSymbol={true}
              tokenFullName="TRIBE"
            />
          ) : (
            <p className="IncentivesButton__valueInner">
              <strong>{incentivesButtonValue()}</strong> %
            </p>
          )}

          {isFeiReward ? (
            <TribeRewardHelpModal text="" iconSize={iconSize} />
          ) : (
            <div className="IncentivesButton__icons">
              <>
                {incentives.length < 5 ? (
                  <>
                    {incentives.map((incentive) => (
                      <TokenIcon
                        tokenSymbol={incentive.rewardTokenSymbol}
                        height={iconSize}
                        width={iconSize}
                        key={incentive.rewardTokenAddress}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    {incentives.slice(0, 3).map((incentive) => (
                      <TokenIcon
                        tokenSymbol={incentive.rewardTokenSymbol}
                        height={iconSize}
                        width={iconSize}
                        key={incentive.rewardTokenAddress}
                      />
                    ))}
                    <p className="IncentivesButton__rest">...</p>
                  </>
                )}
              </>
            </div>
          )}
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

      {isModalVisible && !isFeiReward && (
        <div onClick={(e) => e.stopPropagation()}>
          <IncentivesInfoModal
            isVisible={isModalVisible}
            setVisible={setIsModalVisible}
            incentives={incentives}
            incentivesNetAPR={incentivesNetAPR}
            symbol={symbol}
          />
        </div>
      )}
    </>
  );
}
