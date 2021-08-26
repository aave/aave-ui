import React, { FormEvent, ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import { valueToBigNumber } from '@aave/protocol-js';
import classNames from 'classnames';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import Caption from '../../basic/Caption';
import BasicField from '../../fields/BasicField';
import HealthFactor from '../../HealthFactor';
import DefaultButton from '../../basic/DefaultButton';
import InfoWrapper from '../../wrappers/InfoWrapper';
import InfoPanel from '../../InfoPanel';
import ValuePercent from '../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

import rightArrows from '../../../images/rightArrows.svg';
import rightArrowsWhite from '../../../images/rightArrowsWhite.svg';
import swapIcon from './images/swapIcon.svg';
import gearIcon from './images/gear.svg';

export const DEFAULT_MAX_SLIPPAGE = '2';
const PREDEFINED_SLIPPAGE_CHOICES = ['0.1', '0.5', '1'];

interface SwapFormProps {
  onSubmit: () => void;
  isSubmitButtonDisabled: boolean;
  maxSlippage: string;
  setMaxSlippage: (value: string) => void;
  caption: string;
  description: string | ReactNode;
  leftField: ReactNode;
  rightField: ReactNode;
  error?: string;
  healthFactor: string;
  hfAfterSwap: string;
  buttonTitle: string;
  withoutSwapIcon?: boolean;
  helpText?: string | ReactNode;
  withAPY?: boolean;
  fromAPY?: string | number;
  toAPY?: string | number;
  withFees?: boolean;
  flashloanFees?: string | number;
}

export default function SwapForm({
  onSubmit,
  isSubmitButtonDisabled,
  maxSlippage,
  setMaxSlippage,
  caption,
  description,
  leftField,
  rightField,
  error,
  healthFactor,
  hfAfterSwap,
  buttonTitle,
  withoutSwapIcon,
  helpText,
  withAPY,
  fromAPY,
  toAPY,
  withFees,
  flashloanFees,
}: SwapFormProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [isSlippageVisible, setSlippageVisible] = useState(false);
  const [isSlippageFieldChange, setIsSlippageFieldChange] = useState(false);

  const totalFees = valueToBigNumber(flashloanFees || '0')
    .multipliedBy(100)
    .toString();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

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

  const hoverBackground = rgba(`${currentTheme.textDarkBlue.rgb}, 0.1`);
  const itemBackground = rgba(`${currentTheme.textDarkBlue.rgb}, 0.05`);

  return (
    <form onSubmit={handleSubmit} className="SwapForm">
      <Caption className="SwapForm__caption" title={caption} description={description} />

      <div className="SwapForm__inputs-wrapper">
        {leftField}

        {!withoutSwapIcon && <img className="SwapForm__swap-icon" src={swapIcon} alt="" />}

        {rightField}
      </div>

      <div className="SwapForm__error-inner">{!!error && <p>{error}</p>}</div>

      <div className="SwapForm__bottom-info">
        {withAPY && (
          <div className="SwapForm__bottom-item">
            <div className="SwapForm__bottom-itemContent">
              <p className="SwapForm__bottom-title">{intl.formatMessage(messages.APYChange)}</p>
              <div className="SwapForm__bottom-values">
                <ValuePercent value={fromAPY ? fromAPY : 0} color="dark" />
                <img src={isCurrentThemeDark ? rightArrowsWhite : rightArrows} alt="" />
                <ValuePercent value={toAPY ? toAPY : 0} color="dark" />
              </div>
            </div>
          </div>
        )}

        {+healthFactor > 0 && (
          <div className="SwapForm__bottom-item">
            <div className="SwapForm__bottom-itemContent">
              <p className="SwapForm__bottom-title">
                {intl.formatMessage(messages.newHealthFactor)}
              </p>
              <div className="SwapForm__bottom-values">
                <HealthFactor value={healthFactor} withoutTitle={true} />
                <img src={isCurrentThemeDark ? rightArrowsWhite : rightArrows} alt="" />
                <HealthFactor value={hfAfterSwap.toString()} withoutTitle={true} />
              </div>
            </div>
          </div>
        )}

        <div className="SwapForm__bottom-item SwapForm__bottom-itemWithClickSlippage">
          <button
            className="SwapForm__bottom-itemContent SwapForm__bottomItemWithClick"
            onClick={() => setSlippageVisible(!isSlippageVisible)}
            type="button"
          >
            <p className="SwapForm__bottom-title">
              {intl.formatMessage(messages.maxSlippage)} <img src={gearIcon} alt="" />
            </p>
            <div className="SwapForm__bottom-values">
              <ValuePercent value={+maxSlippage / 100} color="secondary" />
            </div>
          </button>

          <div
            className={classNames('SwapForm__slippage-percentages', {
              SwapForm__slippageVisible: isSlippageVisible,
            })}
          >
            <div className="SwapForm__slippage-percentagesInner">
              {PREDEFINED_SLIPPAGE_CHOICES.map((percent, index) => (
                <button
                  className="SwapForm__slippage-percent"
                  onClick={() => setMaxSlippage(percent)}
                  disabled={+maxSlippage === +percent}
                  type="button"
                  key={index}
                >
                  {intl.formatNumber(+percent)}%
                </button>
              ))}
              <div className="SwapForm__slippage-fieldInner">
                <BasicField
                  className="SwapForm__slippage-field"
                  value={isSlippageFieldChange ? maxSlippage : ''}
                  onChange={handleMaxSlippageChange}
                  placeholder={intl.formatMessage(messages.custom)}
                  type="number"
                  step="any"
                />
              </div>
            </div>
          </div>
        </div>

        {withFees && (
          <div className="SwapForm__bottom-item">
            <div className="SwapForm__bottom-itemContent">
              <p className="SwapForm__bottom-title">{intl.formatMessage(messages.flashFees)}</p>
              <div className="SwapForm__bottom-values">
                <ValuePercent value={+totalFees / 100} color="secondary" maximumDecimals={3} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="SwapForm__button-inner">
        <DefaultButton
          title={buttonTitle}
          type="submit"
          disabled={isSubmitButtonDisabled}
          mobileBig={true}
        />
      </div>

      {!!helpText && (
        <InfoWrapper>
          <InfoPanel>{helpText}</InfoPanel>
        </InfoWrapper>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SwapForm {
          &__slippage-inner {
            color: ${currentTheme.darkBlue.hex};
            strong {
              color: ${currentTheme.secondary.hex};
            }
          }

          &__slippage-percentages {
            background: ${currentTheme.whiteItem.hex};
          }
          &__slippage-percentagesInner {
            background: ${itemBackground};
          }

          &__slippage-percent {
            color: ${currentTheme.textDarkBlue.hex};
            border: 1px solid ${currentTheme.textDarkBlue.hex};
            &:hover {
              background: ${hoverBackground};
            }
            &:disabled {
              color: ${currentTheme.white.hex};
              border: 1px solid ${currentTheme.secondary.hex};
              background: ${currentTheme.secondary.hex};
            }
          }

          &__slippage-fieldInner {
            color: ${currentTheme.textDarkBlue.hex};
          }
          .SwapForm__slippage-field {
            border: 1px solid ${currentTheme.textDarkBlue.hex};
          }

          &__error-inner {
            color: ${currentTheme.red.hex};
          }

          &__bottom-item {
            background: ${itemBackground};
            color: ${currentTheme.darkBlue.hex};
          }
          &__bottom-itemContent {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__bottom-values {
            .ValuePercent {
              .ValuePercent__value {
                span {
                  color: ${currentTheme.secondary.hex} !important;
                }
              }
            }
            .ValuePercent__dark {
              .ValuePercent__value {
                span {
                  color: ${currentTheme.textDarkBlue.hex} !important;
                }
              }
            }
          }
          &__fees {
            background: ${itemBackground};
          }
        }
      `}</style>
    </form>
  );
}
