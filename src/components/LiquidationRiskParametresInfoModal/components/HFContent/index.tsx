import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface HFContentProps {
  healthFactor: string;
}

export default function HFContent({ healthFactor }: HFContentProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  let dotPosition = 0;
  if (+healthFactor > 10) {
    dotPosition = 1;
  } else if (+healthFactor < 10 && +healthFactor > 5) {
    dotPosition = 15;
  } else if (+healthFactor < 5 && +healthFactor > 3) {
    dotPosition = 25;
  } else if (+healthFactor < 3 && +healthFactor > 2) {
    dotPosition = 35;
  } else if (+healthFactor < 2 && +healthFactor > 1.5) {
    dotPosition = 55;
  } else if (+healthFactor < 1.5 && +healthFactor > 1.3) {
    dotPosition = 65;
  } else if (+healthFactor < 1.3 && +healthFactor > 1.2) {
    dotPosition = 75;
  } else if (+healthFactor < 1.2 && +healthFactor > 1.15) {
    dotPosition = 85;
  } else if (+healthFactor < 1.15 && +healthFactor > 1.1) {
    dotPosition = 90;
  } else if (+healthFactor < 1.1 && +healthFactor > 1) {
    dotPosition = 95;
  } else if (+healthFactor === 1) {
    dotPosition = 100;
  }

  return (
    <div className="HFContent">
      <p className="HFContent__text HFContent__left">{intl.formatMessage(messages.safer)}</p>
      <p className="HFContent__text HFContent__right">{intl.formatMessage(messages.riskier)}</p>

      <div className="HFContent__line">
        <div className="HFContent__point" style={{ left: `${dotPosition}%` }} />
      </div>

      <div className="HFContent__liquidationValue">
        <div className="HFContent__percentInner">
          <div className="HFContent__percent">
            <span className="HFContent__title">
              {intl.formatMessage(messages.liquidationValue)}
            </span>

            <div className="HFContent__value">
              <ValuePercent value={0.01} onWhiteBackground={true} />
              <span className="HFContent__title">*</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .HFContent {
          color: ${currentTheme.darkBlue.hex};
          &__left {
            color: ${currentTheme.green.hex};
          }
          &__right {
            color: ${currentTheme.red.hex};
          }

          &__percentInner {
            &:after {
              border-bottom: 8px solid ${currentTheme.red.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
