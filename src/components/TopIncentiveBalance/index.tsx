import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../libs/protocol-data-provider';
import Value from '../basic/Value';
import Link from '../basic/Link';
import DefaultButton from '../basic/DefaultButton';
import { TokenIcon } from '../../helpers/markets/assets';

import defaultMessages from '../../defaultMessages';
import messages from './messages';
import staticStyles from './style';

export default function TopIncentiveBalance() {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userUnclaimedRewards } = useStaticPoolDataContext();
  const { networkConfig } = useProtocolDataContext();

  const hasEmission = reserves.find(
    (r) =>
      r.aEmissionPerSecond !== '0' || r.vEmissionPerSecond !== '0' || r.sEmissionPerSecond !== '0'
  );

  if (!user || !hasEmission) return null;

  const totalRewards = Number(user.totalRewards) + Number(userUnclaimedRewards);
  const iconSize = xl && !sm ? 14 : 18;

  return (
    <div className="TopIncentiveBalance">
      <p className="TopIncentiveBalance__title">{intl.formatMessage(messages.availableReward)}</p>

      <div className="TopIncentiveBalance__right--inner">
        <div className="TopIncentiveBalance__value--inner">
          <Value
            value={totalRewards}
            maximumValueDecimals={2}
            minimumValueDecimals={2}
            color={!sm ? 'white' : 'dark'}
          />
          <TokenIcon
            tokenSymbol={networkConfig.rewardTokenSymbol}
            height={iconSize}
            width={iconSize}
          />
        </div>

        <Link to="/rewards/confirm" className="ButtonLink" disabled={totalRewards === 0}>
          <DefaultButton
            title={intl.formatMessage(defaultMessages.claim)}
            disabled={totalRewards === 0}
            color="gradient"
          />
        </Link>
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
