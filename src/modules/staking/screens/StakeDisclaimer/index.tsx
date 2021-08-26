import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import queryString from 'query-string';
import BigNumber from 'bignumber.js';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStakeDataContext } from '../../../../libs/pool-data-provider/hooks/use-stake-data-context';
import Link from '../../../../components/basic/Link';
import CheckBoxField from '../../../../components/fields/CheckBoxField';
import DefaultButton from '../../../../components/basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/linkIcon.svg';
import aaveIcon from '../../../../images/aave.svg';
import bptIcon from '../../../../images/bpt.svg';

import { faqLink } from '../../index';
import { Stake } from '@aave/protocol-js';

export default function StakeDisclaimer() {
  const intl = useIntl();
  const location = useLocation();
  const { currentTheme } = useThemeContext();
  const { selectedStake } = useStakeDataContext();

  const query = queryString.parse(location.search);
  let amount = new BigNumber(typeof query.amount === 'string' ? query.amount : 0);
  const localStorageKey = `showStake${selectedStake}Disclaimer`;

  const [checkboxValue, setCheckboxValue] = useState(
    localStorage.getItem(localStorageKey) !== 'false'
  );

  const stakeDisclaimerCheckboxClick = () => {
    setCheckboxValue((currentValue) => !currentValue);
    localStorage.setItem(localStorageKey, (!checkboxValue).toString());
  };

  return (
    <div className="StakeDisclaimer">
      <div className="StakeDisclaimer__caption-inner">
        <img src={selectedStake === Stake.aave ? aaveIcon : bptIcon} alt={selectedStake} />
        <h2>{intl.formatMessage(messages.caption, { asset: selectedStake.toUpperCase() })}</h2>

        <div className="StakeDisclaimer__description">
          <p>
            {intl.formatMessage(messages.firstDescription, {
              asset: selectedStake.toUpperCase(),
              upTo: (
                <strong>
                  {intl.formatMessage(messages.upTo, {
                    percent: 30,
                  })}
                </strong>
              ),
            })}
          </p>
          <p>
            {intl.formatMessage(messages.secondDescription, {
              cooldownPeriod: (
                <b>{intl.formatMessage(messages.cooldownPeriod, { duration: 10 })}</b>
              ),
            })}
          </p>
        </div>
      </div>

      <div className="StakeDisclaimer__link-inner">
        <Link
          to={faqLink}
          absolute={true}
          inNewWindow={true}
          color="secondary"
          className="StakeDisclaimer__link"
        >
          <span>{intl.formatMessage(messages.moreInformation)}</span>
          <img src={linkIcon} alt="" />
        </Link>
      </div>

      <div className="StakeDisclaimer__checkbox-inner">
        <CheckBoxField
          value={!checkboxValue}
          name="StakeDisclaimer"
          onChange={stakeDisclaimerCheckboxClick}
          title={intl.formatMessage(messages.rememberMyChoice)}
          className="StakeDisclaimer__checkbox"
        />
      </div>

      <div className="StakeDisclaimer__bottom-inner">
        <Link
          to={`/staking/${selectedStake}/confirmation/?amount=${amount}`}
          className="ButtonLink"
        >
          <DefaultButton title={intl.formatMessage(messages.iUnderstand)} mobileBig={true} />
        </Link>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .StakeDisclaimer {
          &__caption-inner {
            h2 {
              color: ${currentTheme.primary.hex};
            }

            div {
              color: ${currentTheme.textDarkBlue.hex};
              strong {
                color: ${currentTheme.red.hex};
              }
            }
          }

          &__checkbox-inner {
            .StakeDisclaimer__checkbox {
              .CheckBoxField__label {
                p {
                  color: ${currentTheme.textDarkBlue.hex};
                }
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
