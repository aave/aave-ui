import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { useAppDataContext } from '../../../libs/pool-data-provider';
import { getEmodeMessage } from '../../../helpers/e-mode/getEmodeMessage';
import EModeModal from '../EModeModal';
import EModeHelpModal from '../EModeHelpModal';

import messages from './messages';
import staticStyles from './style';

import eModeIcon from '../../../images/eModeIcon.svg';
import eModeDisabledIcon from '../../../images/eModeDisabledIcon.svg';
import gearIcon from '../../../images/gear.svg';

interface EModeButtonProps {
  size: 'small' | 'normal';
}

export default function EModeButton({ size }: EModeButtonProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { userEmodeCategoryId } = useAppDataContext();

  const [visible, setVisible] = useState(false);

  const eModeEnabled = userEmodeCategoryId !== 0;

  return (
    <>
      {size === 'normal' && <EModeHelpModal className="EModeButton__helpModal" />}

      <div
        className={classNames('EModeButton', `EModeButton__${size}`, {
          EModeButton__enabled: eModeEnabled,
        })}
        onClick={() => setVisible(true)}
      >
        <div className="EModeButton__content">
          <div className="EModeButton__content--wrapper">
            <img
              className="EModeButton__content--image"
              src={eModeEnabled ? eModeIcon : eModeDisabledIcon}
              alt=""
            />

            {eModeEnabled ? (
              <p>{getEmodeMessage(userEmodeCategoryId, intl)}</p>
            ) : (
              <p>{intl.formatMessage(messages.disabled)}</p>
            )}
          </div>
        </div>

        <img className="EModeButton__gearIcon" src={gearIcon} alt="" />
      </div>

      <EModeModal visible={visible} setVisible={setVisible} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .EModeButton {
          &__content {
            &:after {
              background: ${currentTheme.lightBlue.hex};
            }
          }
          &__enabled {
            .EModeButton__content {
              &:after {
                background: ${gradient(
                  248.86,
                  `${currentTheme.primary.rgb}, 1`,
                  10.51,
                  `${currentTheme.secondary.rgb}, 1`,
                  93.41
                )};
              }
            }
          }

          &__small {
            color: ${currentTheme.white.hex};

            .EModeButton__content {
              &--wrapper {
                background: ${currentTheme.darkBlue.hex};
              }
            }
          }
          &__normal {
            color: ${currentTheme.textDarkBlue.hex};

            .EModeButton__content {
              &--wrapper {
                background: ${sm ? currentTheme.mainBg.hex : currentTheme.whiteElement.hex};
              }
            }
          }
        }
      `}</style>
    </>
  );
}
