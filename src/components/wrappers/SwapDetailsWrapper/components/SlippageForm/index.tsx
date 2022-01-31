import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';
import { valueToBigNumber } from '@aave/math-utils';

import ValuePercent from '../../../../basic/ValuePercent';
import BasicField from '../../../../fields/BasicField';
import Row from '../../../../basic/Row';

import messages from './messages';
import staticStyles from './style';

import gearIcon from './images/gear.svg';

const PREDEFINED_SLIPPAGE_CHOICES = ['0.1', '0.5', '1'];

interface SlippageFormProps {
  maxSlippage: string;
  setMaxSlippage: (value: string) => void;
}

export default function SlippageForm({ maxSlippage, setMaxSlippage }: SlippageFormProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const [isSlippageVisible, setSlippageVisible] = useState(false);
  const [isSlippageFieldChange, setIsSlippageFieldChange] = useState(false);

  const handleMaxSlippageChange = (amount: string) => {
    const newAmountValue = valueToBigNumber(amount);
    const maxAmount = '30';

    if (!isSlippageFieldChange) {
      setIsSlippageFieldChange(true);
    }

    if (newAmountValue.gt(maxAmount)) {
      setMaxSlippage(maxAmount);
    } else if (newAmountValue.isNegative()) {
      setMaxSlippage('0');
    } else {
      setMaxSlippage(amount);
    }
  };

  const rowBorderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.1`);

  return (
    <div className="SlippageForm">
      <button
        className="SlippageForm__button"
        onClick={() => setSlippageVisible(!isSlippageVisible)}
        type="button"
      >
        <Row
          title={
            <p className="SlippageForm__buttonTitle">
              {intl.formatMessage(messages.maxSlippage)} <img src={gearIcon} alt="" />
            </p>
          }
        >
          <ValuePercent value={+maxSlippage / 100} color="secondary" />
        </Row>
      </button>

      <div
        className={classNames('SlippageForm__dropdown', {
          SlippageForm__dropdownVisible: isSlippageVisible,
        })}
      >
        <div className="SlippageForm__percentages">
          {PREDEFINED_SLIPPAGE_CHOICES.map((percent, index) => (
            <button
              className="SlippageForm__percent"
              onClick={() => setMaxSlippage(percent)}
              disabled={+maxSlippage === +percent}
              type="button"
              key={index}
            >
              {intl.formatNumber(+percent)}%
            </button>
          ))}
          <div className="SlippageForm__fieldInner">
            <BasicField
              className="SlippageForm__field"
              value={isSlippageFieldChange ? maxSlippage : ''}
              onChange={handleMaxSlippageChange}
              placeholder={intl.formatMessage(messages.custom)}
              type="number"
              step="any"
            />
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SlippageForm {
          border-bottom: 1px solid ${rowBorderColor};
          &__percent {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
            &:hover,
            &:disabled {
              color: ${currentTheme.white.hex};
              border: 1px solid ${currentTheme.secondary.hex};
              background: ${currentTheme.secondary.hex};
            }
          }
          .SlippageForm__field {
            &:after {
              color: ${currentTheme.textDarkBlue.hex};
            }
            input {
              border: 1px solid ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
