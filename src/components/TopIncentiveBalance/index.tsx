import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useDynamicPoolDataContext } from '../../libs/pool-data-provider';
import Value from '../basic/Value';
import { TokenIcon } from '../../helpers/markets/assets';
import messages from './messages';
import staticStyles from './style';
import { useIncentivesDataContext } from '../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { normalize } from '@aave/math-utils';
import { ComputedReserveData } from '@aave/protocol-js';

import tribeIcon from '../../images/tirbe.svg';
import { useState } from 'react';
import IncentiveClaimDropdown from '../IncentiveClaimDropdown';

// Fetch reward token symbol from hard coded non-reserve tokens or from reserves array
export function getRewardTokenSymbol(
  reserves: ComputedReserveData[],
  rewardTokenAddress: string
): string {
  if (rewardTokenAddress.toLowerCase() === '0x4da27a545c0c5b758a6ba100e3a049001de870f5') {
    return 'stkAAVE';
  } else if (rewardTokenAddress.toLowerCase() === '0xc7283b66eb1eb5fb86327f08e1b5816b0720212b') {
    return 'TRIBE';
  } else if (rewardTokenAddress.toLowerCase() === '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7') {
    return 'AVAX';
  } else if (rewardTokenAddress.toLowerCase() === '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270') {
    return 'MATIC';
  } else {
    let rewardReserve = reserves.find(
      (reserve) => reserve.underlyingAsset.toLowerCase() === rewardTokenAddress.toLowerCase()
    );
    if (rewardReserve) {
      return rewardReserve.symbol;
    } else {
      return '';
    }
  }
}

export default function TopIncentiveBalance() {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();
  const [activeIncentiveHover, setActiveIncentiveHover] = useState<string>('');

  const hasEmission = reserves.find(
    (r) =>
      r.aEmissionPerSecond !== '0' || r.vEmissionPerSecond !== '0' || r.sEmissionPerSecond !== '0'
  );

  if (!user || !hasEmission) return null;

  const iconSize = xl && !sm ? 14 : 18;
  return (
    <div className="TopIncentiveBalance">
      <p className="TopIncentiveBalance__title">{intl.formatMessage(messages.availableReward)}</p>

      <div className="TopIncentiveBalance__right--inner">
        {Object.entries(userIncentives).map((incentive) => {
          const rewardTokenSymbol = getRewardTokenSymbol(reserves, incentive[1].rewardTokenAddress);
          const claimableRewards = normalize(incentive[1].claimableRewards, 18);
          return (
            <div
              className="TopIncentiveBalance__value--inner"
              onMouseEnter={() => setActiveIncentiveHover(rewardTokenSymbol)}
              onMouseLeave={() => setActiveIncentiveHover('')}
            >
              {rewardTokenSymbol === 'TRIBE' ? (
                <img src={tribeIcon} alt="TRIBE icon" />
              ) : (
                <TokenIcon tokenSymbol={rewardTokenSymbol} height={iconSize} width={iconSize} />
              )}
              <Value
                value={claimableRewards}
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                color={!sm ? 'white' : 'dark'}
              />
              <div
                className="TopIncentiveBalance__hover-modal"
                style={{ display: activeIncentiveHover === rewardTokenSymbol ? 'block' : 'none' }}
              >
                <IncentiveClaimDropdown
                  symbol={rewardTokenSymbol}
                  claimableRewards={claimableRewards}
                  incentiveControllerAddress={incentive[0]}
                />
              </div>
            </div>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .TopIncentiveBalance {
          color: ${currentTheme.white.hex};
          border: 1px solid ${currentTheme.white.hex};
          @include respond-to(sm) {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
