import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import CooldownUnstakeHelpModal from '../../../../components/HelpModal/CooldownUnstakeHelpModal';
import Value from '../../../../components/basic/Value';
import GradientText from '../../../../components/basic/GradientText';

import staticStyles from './style';

interface SidePanelCardProps {
  title: string | ReactNode;
  value: string | number;
  valueInUsd?: string | number;
  withHelpModal?: boolean;
  withGradientBorder?: boolean;
  children: ReactNode;
}

export default function SidePanelCard({
  title,
  value,
  valueInUsd,
  withHelpModal,
  withGradientBorder,
  children,
}: SidePanelCardProps) {
  const intl = useIntl();
  const { currentTheme, xl, isCurrentThemeDark } = useThemeContext();

  const iconSize = xl ? 14 : 18;

  return (
    <div
      className={classNames('SidePanelCard', {
        SidePanelCard__withGradientBorder: withGradientBorder,
      })}
    >
      {withHelpModal && !withGradientBorder && (
        <CooldownUnstakeHelpModal
          className="SidePanelCard__help-icon"
          text=""
          iconSize={iconSize}
        />
      )}

      <div className="SidePanelCard__inner">
        <div className="SidePanelCard__value-wrapper">
          <p className="SidePanelCard__title">{title}</p>
          <div className="SidePanelCard__value-inner">
            {withHelpModal || withGradientBorder ? (
              <Value value={value} />
            ) : (
              <GradientText
                colorStart={currentTheme.secondary.rgb}
                colorEnd={currentTheme.primary.rgb}
                title={value.toString()}
              />
            )}
            {valueInUsd && !withGradientBorder && (
              <span className="SidePanelCard__value-usd">
                ${intl.formatNumber(+valueInUsd, { maximumFractionDigits: 2 })} USD
              </span>
            )}
          </div>
        </div>

        <div className="SidePanelCard__content">{children}</div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .SidePanelCard {
          color: ${currentTheme.textDarkBlue.hex};
          &:after {
            background: ${currentTheme.textDarkBlue.hex};
          }

          &__withGradientBorder {
            &:after,
            &:before {
              background: linear-gradient(
                to right,
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex},
                ${currentTheme.secondary.hex},
                ${currentTheme.primary.hex}
              );
            }
          }

          &__inner {
            background: ${isCurrentThemeDark ? '#42475a' : currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
