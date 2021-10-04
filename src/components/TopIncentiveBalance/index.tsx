import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import Value from '../basic/Value';
import Link from '../basic/Link';
import DefaultButton from '../basic/DefaultButton';
import { TokenIcon } from '../../helpers/markets/assets';

import defaultMessages from '../../defaultMessages';
import messages from './messages';
import staticStyles from './style';
import { useIncentivesDataContext } from '../../libs/pool-data-provider/hooks/use-incentives-data-context';
import { normalize } from '@aave/math-utils';

export default function TopIncentiveBalance() {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();

  const { user, reserves } = useDynamicPoolDataContext();
  const { userUnclaimedRewards } = useStaticPoolDataContext();
  const { userIncentives } = useIncentivesDataContext();

  const hasEmission = reserves.find(
    (r) =>
      r.aEmissionPerSecond !== '0' || r.vEmissionPerSecond !== '0' || r.sEmissionPerSecond !== '0'
  );

  if (!user || !hasEmission) return null;

  const totalRewards = Number(user.totalRewards) + Number(userUnclaimedRewards);

  for (var key in userIncentives) {
    console.log('NEW');
    console.log(key);
    console.log(normalize(userIncentives[key].claimableRewards, 18));
  }

  console.log('OLD');
  console.log(totalRewards.toString());
  const iconSize = xl && !sm ? 14 : 18;
  return (
    <div className="TopIncentiveBalance">
      <p className="TopIncentiveBalance__title">{intl.formatMessage(messages.availableReward)}</p>

      <div className="TopIncentiveBalance__right--inner">
        {Object.entries(userIncentives).map((incentive) => {
          let rewardTokenSymbol = ''; // TO-DO: Create helper function or seperate way to fetch reward token symbol from address
          if (incentive[1].rewardTokenAddress === '0xd784927Ff2f95ba542BfC824c8a8a98F3495f6b5') {
            rewardTokenSymbol = 'stkAAVE';
          } else if (
            incentive[1].rewardTokenAddress === '0x0000000000000000000000000000000000000000'
          ) {
            rewardTokenSymbol = 'DAI'; // this is just to test
          }
          return (
            <div className="TopIncentiveBalance__value--inner">
              <Value
                value={normalize(incentive[1].claimableRewards, 18)}
                maximumValueDecimals={2}
                minimumValueDecimals={2}
                color={!sm ? 'white' : 'dark'}
              />
              <TokenIcon tokenSymbol={rewardTokenSymbol} height={iconSize} width={iconSize} />
            </div>
          );
        })}
        {
          // TO-DO: Instead of linking to claim page, call function on dashboard to display Your Rewards pop-up
        }
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
