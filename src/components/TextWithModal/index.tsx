import React, { ReactNode, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, BasicModal } from '@aave/aave-ui-kit';

import DefaultButton from '../basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

import info from './images/info.svg';
import infoGray from './images/infoGray.svg';
import infoGrayDark from './images/infoGrayDark.svg';

export type TextWithModalProps = {
  text: string;
  children: ReactNode;
  iconSize?: number;
  className?: string;
  lightWeight?: boolean;
  color?: 'dark' | 'white' | 'primary';
  withCloseButton?: boolean;
  withoutContentButton?: boolean;
  modalClassName?: string;
  onWhiteBackground?: boolean;
  clickOnText?: boolean;
  withGrayIcon?: boolean;
};

export default function TextWithModal({
  text,
  children,
  iconSize,
  className,
  lightWeight,
  color = 'dark',
  withoutContentButton,
  withCloseButton,
  modalClassName,
  onWhiteBackground,
  clickOnText,
  withGrayIcon,
}: TextWithModalProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md, isCurrentThemeDark } = useThemeContext();

  const [visible, setVisible] = useState(false);

  const baseIconSize = !xl ? 14 : lg && !md ? 10 : md ? 12 : 12;

  return (
    <div
      className={classNames('TextWithModal', className, `TextWithModal__${color}`, {
        TextWithModal__lightWeight: lightWeight,
      })}
    >
      <div
        className={classNames('TextWithModal__text', { TextWithModal__textClickable: clickOnText })}
        onClick={(e: React.MouseEvent) => {
          if (clickOnText) {
            e.stopPropagation();
            setVisible(true);
          }
        }}
      >
        {text}
      </div>
      <button
        className="TextWithModal__button"
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setVisible(true);
        }}
        style={{
          height: iconSize || baseIconSize,
          width: iconSize || baseIconSize,
          right: -((iconSize || baseIconSize) + 4),
        }}
      >
        <img
          src={withGrayIcon ? (isCurrentThemeDark ? infoGrayDark : infoGray) : info}
          alt={text}
          height={iconSize || baseIconSize}
          width={iconSize || baseIconSize}
        />
      </button>

      <BasicModal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        withCloseButton={withCloseButton}
        className={classNames('TextWithModal__modal', modalClassName)}
      >
        <div className="TextWithModal__modal-inner">
          {children}

          {!withoutContentButton && (
            <DefaultButton
              title={intl.formatMessage(messages.buttonTitle)}
              size="medium"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                setVisible(false);
              }}
            />
          )}
        </div>
      </BasicModal>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TextWithModal {
          &__dark {
            .TextWithModal__text {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }
          &__white {
            .TextWithModal__text {
              color: ${currentTheme.white.hex};
            }
          }
          &__primary {
            .TextWithModal__text {
              color: ${currentTheme.primary.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
