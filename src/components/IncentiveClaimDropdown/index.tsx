import { TokenIcon, useThemeContext } from '@aave/aave-ui-kit';
import { useIntl } from 'react-intl';
import Link from '../basic/Link';
import DefaultButton from '../basic/DefaultButton';
import staticStyles from './style';
import tribeIcon from '../../images/tirbe.svg';
import defaultMessages from '../../defaultMessages';

interface IncentiveClaimDropdownProps {
  symbol: string;
  claimableRewards: string;
  incentiveControllerAddress: string;
}

export default function IncentiveClaimDropdown({
  symbol,
  claimableRewards,
  incentiveControllerAddress,
}: IncentiveClaimDropdownProps) {
  const { currentTheme, xl, sm } = useThemeContext();
  const intl = useIntl();
  const iconSize = xl && !sm ? 14 : 18;
  const rewardClaimLink = `/rewards/confirm/${incentiveControllerAddress}`;

  // TO-DO: Add links here
  let description = '';
  if (symbol.toLowerCase() === 'stkaave') {
    description =
      'People who deposit/borrow/stake eligible tokens on AAVE V2 market receives stkAAVE APR as incentives. stkAAVE token holders can help shape the future of the Aave Protocol by voting on governance proposals, and also participate in safety module staking.';
  } else if (symbol.toLowerCase() === 'tribe') {
    description =
      'The Fei Protocol governance has decided to give TRIBE rewards to variable borrowing of FEI on Aave. For more information about the rewards and how to claim them, visit the Fei Protocol App. This is offered strictly by the Fei Protocol and the Aave Protocol does not have any involvement in the TRIBE rewards. The Fei Protocol App is a third party application affiliated with Fei and not with Aave in any way.';
  }
  return (
    <div className="IncentiveClaimDropdown">
      <div className="IncentiveClaimDropdown__content-inner">
        {symbol === 'TRIBE' ? (
          <img src={tribeIcon} alt="TRIBE icon" />
        ) : (
          <TokenIcon tokenSymbol={symbol} height={iconSize} width={iconSize} />
        )}
        <div className="IncentiveClaimDropdown__content">{symbol}</div>
        <div className="IncentiveClaimDropdown__content">{claimableRewards}</div>
        <Link to={rewardClaimLink} className="ButtonLink" disabled={Number(claimableRewards) === 0}>
          <DefaultButton
            title={intl.formatMessage(defaultMessages.claim) + ' ' + symbol}
            disabled={Number(claimableRewards) === 0}
            color="gradient"
          />
        </Link>
        <div className="IncentiveClaimDropdown__content">{description}</div>
      </div>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .IncentiveClaimDropdown {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.secondary.hex};
        }
      `}</style>
    </div>
  );
}
