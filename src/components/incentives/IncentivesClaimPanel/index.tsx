import React from 'react';
import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useDynamicPoolDataContext } from '../../../libs/pool-data-provider';
import { useIncentivesDataContext } from '../../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { TokenIcon } from '../../../helpers/config/assets-config';
import Value from '../../basic/Value';
import DefaultButton from '../../basic/DefaultButton';
import Link from '../../basic/Link';

import defaultMessages from '../../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

export default function IncentivesClaimPanel() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  const { user } = useDynamicPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();

  // Only display assets for which user has claimable rewards
  const userIncentivesFiltered = Object.fromEntries(
    Object.entries(userIncentives).filter((entry) => Number(entry[1].claimableRewards) > 0)
  );

  if (!user || Object.keys(userIncentivesFiltered).length === 0) return null;

  const linkTo =
    Object.keys(userIncentivesFiltered).length === 1
      ? `/rewards/confirm/${Object.keys(userIncentivesFiltered)[0]}`
      : '/rewards';

  return (
    <div className="IncentivesClaimPanel">
      <p className="IncentivesClaimPanel__title">{intl.formatMessage(messages.availableRewards)}</p>

      <div className="IncentivesClaimPanel__items">
        {Object.entries(userIncentivesFiltered).map((incentive) => {
          const rewardTokenSymbol = incentive[1].rewardTokenSymbol;
          const claimableRewards = normalize(
            incentive[1].claimableRewards,
            incentive[1].rewardTokenDecimals
          );

          return (
            <div className="IncentivesClaimPanel__item" key={incentive[0]}>
              <TokenIcon tokenSymbol={rewardTokenSymbol} height={16} width={16} />
              <Value
                value={claimableRewards}
                compact={true}
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                color={sm ? 'dark' : 'white'}
                tooltipId={incentive[0]}
              />
            </div>
          );
        })}
      </div>

      <Link to={linkTo} className="ButtonLink">
        <DefaultButton
          title={intl.formatMessage(defaultMessages.claim)}
          color="gradient"
          type="button"
          size="small"
        />
      </Link>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .IncentivesClaimPanel {
          color: ${sm ? currentTheme.textDarkBlue.hex : currentTheme.white.hex};
          border: 1px solid ${currentTheme.lightBlue.hex};

          &__items {
            @include respond-to(sm) {
              border: 1px solid ${currentTheme.lightBlue.hex};
            }
          }

          &__item {
            border-right: 1px solid ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
