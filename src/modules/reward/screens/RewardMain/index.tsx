import React from 'react';
import { Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { normalize } from '@aave/math-utils';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useAppDataContext } from '../../../../libs/pool-data-provider';
import Value from '../../../../components/basic/Value';
import Caption from '../../../../components/basic/Caption';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

export default function RewardMain() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { user } = useAppDataContext();

  if (!user) {
    return <Redirect to="/dashboard" />;
  }
  if (Object.keys(user.calculatedUserIncentives).length === 0) {
    return <Redirect to="/dashboard" />;
  }
  if (Object.keys(user.calculatedUserIncentives).length === 1) {
    return <Redirect to={`/rewards/confirm/${Object.keys(user.calculatedUserIncentives)[0]}`} />;
  }

  return (
    <div className="RewardMain">
      <Caption title={intl.formatMessage(messages.caption)} marginBottom={20} />

      <div className="RewardMain__items">
        <Link
          to="/rewards/confirm/all"
          className="ButtonLink RewardMain__item RewardMain__itemClaimAll"
        >
          <strong>{intl.formatMessage(messages.claimAll)}</strong>
          <span />
        </Link>

        {Object.entries(user.calculatedUserIncentives).map((incentive) => {
          const rewardTokenSymbol = incentive[1].rewardTokenSymbol;
          const claimableRewards = normalize(
            incentive[1].claimableRewards,
            incentive[1].rewardTokenDecimals
          );
          const claimableRewardsUSD =
            Number(claimableRewards) * Number(incentive[1].rewardPriceFeed);

          return (
            <Link
              to={`/rewards/confirm/${incentive[0]}`}
              className="ButtonLink RewardMain__item"
              key={incentive[0]}
            >
              <Value
                value={claimableRewards}
                subValue={claimableRewardsUSD}
                subSymbol="USD"
                compact={true}
                symbol={rewardTokenSymbol}
                tokenIcon={true}
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                maximumSubValueDecimals={2}
                minimumSubValueDecimals={2}
                tooltipId={incentive[0]}
              />
              <p className="RewardMain__item--text">
                {intl.formatMessage(messages.claim, { symbol: rewardTokenSymbol })}
              </p>
            </Link>
          );
        })}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .RewardMain {
          &__item {
            background: ${sm ? currentTheme.whiteElement.hex : currentTheme.whiteItem.hex};
            color: ${currentTheme.textDarkBlue.hex};
            &:hover {
              color: ${currentTheme.secondary.hex};
              box-shadow: 0 0 9px 0 ${currentTheme.primary.hex};
            }

            &--text {
              color: ${currentTheme.secondary.hex};
            }
          }
          &__itemClaimAll {
            span {
              border: solid ${currentTheme.secondary.hex};
              border-width: 0 2px 2px 0;
            }
          }
        }
      `}</style>
    </div>
  );
}
