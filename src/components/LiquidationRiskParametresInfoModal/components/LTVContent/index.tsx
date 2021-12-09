import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { BigNumber, valueToBigNumber } from '@aave/protocol-js';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface LTVContentProps {
  loanToValue: string;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
}

export default function LTVContent({
  loanToValue,
  currentLoanToValue,
  currentLiquidationThreshold,
}: LTVContentProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const LTVLineWidth = valueToBigNumber(loanToValue)
    .div(currentLiquidationThreshold)
    .multipliedBy(100)
    .precision(20, BigNumber.ROUND_UP)
    .toNumber();

  const MaxLTVLineLeftPosition = valueToBigNumber(currentLoanToValue)
    .div(currentLiquidationThreshold)
    .multipliedBy(100)
    .precision(20, BigNumber.ROUND_UP)
    .toNumber();

  let LTVLineColor = currentTheme.primary.hex;
  if (loanToValue >= currentLoanToValue) {
    LTVLineColor = currentTheme.orange.hex;
  } else if ((+currentLiquidationThreshold - +loanToValue) * 100 <= 3) {
    LTVLineColor = currentTheme.red.hex;
  }

  return (
    <div className="LTVContent">
      <div
        className={classNames('LTVContent__maxLTV', {
          LTVContent__maxLTVColumn: +currentLoanToValue * 100 > 75,
        })}
        style={{ left: `${MaxLTVLineLeftPosition}%` }}
      >
        <div className="LTVContent__percentInner">
          <div className="LTVContent__percent">
            <span className="LTVContent__title">{intl.formatMessage(messages.maxLTV)}</span>
            <ValuePercent value={currentLoanToValue} onWhiteBackground={true} />
          </div>
        </div>
      </div>
      <div className="LTVContent__liquidationThreshold">
        <div className="LTVContent__percentInner">
          <div className="LTVContent__percent">
            <span className="LTVContent__title">
              {intl.formatMessage(messages.liquidationThreshold)}
            </span>

            <div className="LTVContent__value">
              <ValuePercent value={currentLiquidationThreshold} onWhiteBackground={true} />
              <span className="LTVContent__title">**</span>
            </div>
          </div>
        </div>
      </div>

      <div className="LTVContent__line">
        <div className="LTVContent__valueLine" style={{ width: `${LTVLineWidth}%` }} />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .LTVContent {
          color: ${currentTheme.darkBlue.hex};

          &__line {
            background: ${isCurrentThemeDark
              ? rgba(`${currentTheme.lightBlue.rgb}, 0.2`)
              : currentTheme.mainBg.hex};
          }

          &__valueLine {
            background: ${LTVLineColor};
          }

          &__maxLTV {
            .LTVContent__percentInner {
              &:after {
                border-top: 8px solid ${currentTheme.lightBlue.hex};
              }
            }
          }
          &__liquidationThreshold {
            .LTVContent__percentInner {
              &:after {
                border-bottom: 8px solid ${currentTheme.red.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
