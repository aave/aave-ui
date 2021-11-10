import React, { FormEvent, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';
import Caption from '../../../../components/basic/Caption';
import DefaultButton from '../../../../components/basic/DefaultButton';
import InfoWrapper from '../../../../components/wrappers/InfoWrapper';
import InfoPanel from '../../../../components/InfoPanel';
import InterestRateButton from './InterestRateButton';

import messages from './messages';
import staticStyles from './style';

import { BorrowRateMode } from '../../../../libs/pool-data-provider/graphql';
import { ComputedReserveData } from '../../../../libs/pool-data-provider';
import { ComputedUserReserve } from '@aave/math-utils';

interface BorrowInterestRateFormProps {
  amountToBorrow: string;
  poolReserve: ComputedReserveData;
  userReserve?: ComputedUserReserve;
  onSubmit: (rateMode: string) => void;
}

export default function BorrowInterestRateForm({
  amountToBorrow,
  poolReserve,
  userReserve,
  onSubmit,
}: BorrowInterestRateFormProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [rateMode, setRateMode] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (rateMode) {
      onSubmit(rateMode);
    }
  };

  let isStableBorrowRateAllowed = true;
  let stableBorrowRateNotAllowedMessage: string | ReactNode = '';
  if (
    userReserve &&
    userReserve.underlyingBalance !== '0' &&
    poolReserve.usageAsCollateralEnabled &&
    userReserve.usageAsCollateralEnabledOnUser &&
    valueToBigNumber(userReserve.totalBorrows).lt(userReserve.underlyingBalance)
  ) {
    isStableBorrowRateAllowed = false;
    stableBorrowRateNotAllowedMessage = intl.formatMessage(messages.warningYouCanNotChooseStable);
  }
  if (isStableBorrowRateAllowed) {
    const availableLiquidityToBorrowStable = valueToBigNumber(
      poolReserve.availableLiquidity
    ).multipliedBy('0.25');
    if (availableLiquidityToBorrowStable.lt(amountToBorrow)) {
      isStableBorrowRateAllowed = false;
      stableBorrowRateNotAllowedMessage = intl.formatMessage(
        messages.warningYouCanNotBorrowOnStable,
        {
          rate: <span className="Stable">{intl.formatMessage(messages.stable)}</span>,
          availableLiquidityToBorrowStable: availableLiquidityToBorrowStable.toFormat(5),
          poolReserveSymbol: poolReserve.symbol,
        }
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="BorrowInterestRateForm">
      <Caption
        title={intl.formatMessage(messages.title)}
        description={intl.formatMessage(messages.description)}
      />

      <div className="BorrowInterestRateForm__buttons">
        {poolReserve.stableBorrowRateEnabled && (
          <InterestRateButton
            title={intl.formatMessage(messages.stable)}
            type="stable"
            disabled={!isStableBorrowRateAllowed}
            percent={Number(poolReserve.stableBorrowAPY)}
            isActive={rateMode === BorrowRateMode.Stable}
            onClick={() => setRateMode(BorrowRateMode.Stable)}
          />
        )}
        <InterestRateButton
          title={intl.formatMessage(messages.variable)}
          type="variable"
          percent={Number(poolReserve.variableBorrowAPY)}
          isActive={rateMode === BorrowRateMode.Variable}
          onClick={() => setRateMode(BorrowRateMode.Variable)}
        />
      </div>

      <div className="BorrowInterestRateForm__button-inner">
        <DefaultButton
          title={intl.formatMessage(messages.continue)}
          color="primary"
          type="submit"
          disabled={!rateMode}
          mobileBig={true}
        />
      </div>

      <InfoWrapper>
        {(rateMode === BorrowRateMode.Variable || rateMode === BorrowRateMode.Stable) && (
          <InfoPanel>
            {rateMode === BorrowRateMode.Variable &&
              intl.formatMessage(messages.variableInfoText, {
                rate: (
                  <strong className="Variable">{intl.formatMessage(messages.variableRate)}</strong>
                ),
              })}
            {rateMode === BorrowRateMode.Stable &&
              intl.formatMessage(messages.stableInfoText, {
                rate: <strong className="Stable">{intl.formatMessage(messages.stableRate)}</strong>,
              })}
          </InfoPanel>
        )}

        {!!stableBorrowRateNotAllowedMessage && poolReserve.stableBorrowRateEnabled && (
          <InfoPanel>{stableBorrowRateNotAllowedMessage}</InfoPanel>
        )}
      </InfoWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .BorrowInterestRateForm {
          .Stable {
            color: ${currentTheme.primary.hex};
          }
          .Variable {
            color: ${currentTheme.secondary.hex};
          }
        }
      `}</style>
    </form>
  );
}
