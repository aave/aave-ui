import React from 'react';
import classNames from 'classnames';
import { gradient, rgba, useThemeContext } from '@aave/aave-ui-kit';

import ValuePercent from '../../../../../components/basic/ValuePercent';

import fixedIcon from '../images/fixedIcon.svg';
import variableIcon from '../images/variableIcon.svg';

import staticStyles from './style';

export interface InterestRateButtonProps {
  title: string;
  type: 'stable' | 'variable';
  percent: number;
  disabled?: boolean;
  isActive: boolean;
  onClick: () => void;
}

export default function InterestRateButton({
  title,
  type,
  percent,
  disabled,
  isActive,
  onClick,
}: InterestRateButtonProps) {
  const { currentTheme } = useThemeContext();

  const primaryButtonHoverColor = rgba(`${currentTheme.primary.rgb}, 0.5`);
  const secondaryButtonHoverColor = rgba(`${currentTheme.secondary.rgb}, 0.5`);
  const gradientOnActive = gradient(
    217,
    `${currentTheme.primary.rgb}, 1`,
    25,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <button
      className={classNames('InterestRateButton', {
        InterestRateButtonActive: isActive,
        InterestRateButtonVariable: type === 'variable',
      })}
      disabled={disabled || isActive}
      onClick={onClick}
      type="button"
    >
      <div className="InterestRateButton__inner">
        <div className="InterestRateButton__image-inner">
          {type === 'stable' ? <img src={fixedIcon} alt="" /> : <img src={variableIcon} alt="" />}
        </div>

        <div className="InterestRateButton__description-inner">
          <p className="InterestRateButton__description">{title}</p>
          <ValuePercent
            value={percent}
            color="dark"
            className="InterestRateButton__percent"
            onWhiteBackground={!disabled}
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .InterestRateButton {
          &:hover {
            &:after {
              background: ${primaryButtonHoverColor};
            }
          }
          &:disabled {
            .InterestRateButton__inner {
              background: ${currentTheme.mainBg.hex};
              @include respond-to(sm) {
                background: ${currentTheme.disabledGray.hex} !important;
                border-color: ${currentTheme.disabledGray.hex} !important;
              }
              .InterestRateButton__description {
                color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }
          &__inner {
            background: ${currentTheme.white.hex};
          }
          &__description {
            color: ${currentTheme.darkBlue.hex};
          }
        }

        .InterestRateButtonVariable {
          &:hover {
            &:after {
              background: ${secondaryButtonHoverColor};
            }
          }
        }

        .InterestRateButtonActive {
          &:after {
            background: ${gradientOnActive} !important;
          }
          &:disabled {
            .InterestRateButton__inner {
              background: ${currentTheme.white.hex} !important;
            }
            .InterestRateButton__percent {
              .ValuePercent__value {
                color: ${currentTheme.darkBlue.hex} !important;
              }
            }
            .InterestRateButton__description {
              color: ${currentTheme.darkBlue.hex} !important;
            }
          }
        }
        .InterestRateButtonVariable.InterestRateButtonActive {
          &:disabled {
            .InterestRateButton__percent {
              .ValuePercent__value {
                color: ${currentTheme.darkBlue.hex} !important;
              }
            }
          }
        }
      `}</style>
    </button>
  );
}
