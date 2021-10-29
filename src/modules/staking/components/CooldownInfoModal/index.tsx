import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Stake, valueToBigNumber } from '@aave/protocol-js';
import { BasicModal, rgba, useThemeContext } from '@aave/aave-ui-kit';

import { StakeData } from '../../../../libs/pool-data-provider/types/stake';
import { formattedTime, timeText } from '../../../../helpers/timeHelper';
import Caption from '../../../../components/basic/Caption';
import CheckBoxField from '../../../../components/fields/CheckBoxField';
import Link from '../../../../components/basic/Link';
import DefaultButton from '../../../../components/basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

import closeIcon from '../../../../images/closeIcon.svg';
import whiteCloseIcon from '../../../../images/whiteCloseIcon.svg';
import warningIcon from '../../../../images/warningTransparentOrange.svg';

interface CooldownInfoModalProps {
  stake: Stake;
  stakeData: StakeData;
  isVisible: boolean;
  onBackdropPress: () => void;
}

export default function CooldownInfoModal({
  stake,
  stakeData,
  isVisible,
  onBackdropPress,
}: CooldownInfoModalProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const [isCheckboxActive, setIsCheckboxActive] = useState(false);

  useEffect(() => {
    setIsCheckboxActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const cooldownTime = stakeData.stakeCooldownSeconds;
  const unstakeWindowTime = stakeData.stakeUnstakeWindow;
  const totalTime = cooldownTime + unstakeWindowTime;
  const cooldownPercent = valueToBigNumber(cooldownTime)
    .dividedBy(totalTime)
    .multipliedBy(100)
    .toNumber();
  const unstakeWindowPercent = valueToBigNumber(unstakeWindowTime)
    .dividedBy(totalTime)
    .multipliedBy(100)
    .toNumber();

  const isPercentSame = cooldownPercent === unstakeWindowPercent;

  const timeMessage = (time: number) => {
    return `${intl.formatNumber(formattedTime(time))} ${intl.formatMessage(timeText(time))}`;
  };

  const infoBackground = rgba(
    `${currentTheme.orange.rgb}, ${isCurrentThemeDark ? '0.15' : '0.08'}`
  );

  return (
    <BasicModal
      className="CooldownInfoModal"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      withCloseButton={true}
      closeIcon={isCurrentThemeDark ? whiteCloseIcon : closeIcon}
    >
      <div className="CooldownInfoModal__content">
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description, {
            cooldownPeriod: <strong>{timeMessage(cooldownTime)}</strong>,
            unstakeWindowPeriod: <strong>{timeMessage(unstakeWindowTime)}</strong>,
          })}
        />

        <div className="CooldownInfoModal__infoText">
          <p>{intl.formatMessage(messages.continueReceiving)}</p>
        </div>

        <div className="CooldownInfoModal__infoPanel">
          <img src={warningIcon} alt="" />
          <p>{intl.formatMessage(messages.infoDescription)}</p>
        </div>

        <div className="CooldownInfoModal__graphs">
          <div className="CooldownInfoModal__graphsText">
            <div
              className="CooldownInfoModal__graphTopText"
              style={{ width: `${cooldownPercent - (isPercentSame ? 0 : 10)}%` }}
            >
              <p>{intl.formatMessage(messages.cooldownTitle)}</p>
            </div>
            <div
              className="CooldownInfoModal__graphTopText"
              style={{ width: `${unstakeWindowPercent + (isPercentSame ? 0 : 10)}%` }}
            >
              <span>{intl.formatMessage(messages.unstakeHere)}</span>
              <p>{intl.formatMessage(messages.unstakeWindowTitle)}</p>
            </div>
          </div>

          <div className="CooldownInfoModal__graphInner">
            <div
              className="CooldownInfoModal__graph"
              style={{ width: `${cooldownPercent - (isPercentSame ? 0 : 10)}%` }}
            >
              <div className="CooldownInfoModal__graphLine" />
              <strong>{timeMessage(cooldownTime)}</strong>
            </div>

            <div
              className="CooldownInfoModal__graph"
              style={{ width: `${unstakeWindowPercent + (isPercentSame ? 0 : 10)}%` }}
            >
              <div className="CooldownInfoModal__graphLine" />
              <strong>{timeMessage(unstakeWindowTime)}</strong>
            </div>
          </div>
        </div>

        <div className="CooldownInfoModal__checkboxInner">
          <CheckBoxField
            value={isCheckboxActive}
            name="CooldownInfoModal__checkbox"
            onChange={() => setIsCheckboxActive(!isCheckboxActive)}
            title={intl.formatMessage(messages.checkboxText, {
              cooldownPeriod: <strong>{timeMessage(cooldownTime)}</strong>,
              unstakingWindowPeriod: <strong>{timeMessage(unstakeWindowTime)}</strong>,
            })}
          />
        </div>

        <div className="CooldownInfoModal__buttonInner">
          <Link
            to={`/staking/${stake}/activate-cooldown/confirmation`}
            className="ButtonLink"
            disabled={!isCheckboxActive}
            onClick={onBackdropPress}
          >
            <DefaultButton
              title={intl.formatMessage(messages.activateCooldown)}
              disabled={!isCheckboxActive}
            />
          </Link>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CooldownInfoModal {
          color: ${currentTheme.textDarkBlue.hex};
          background: ${currentTheme.whiteElement.hex} !important;

          &__infoPanel {
            background: ${infoBackground};
          }

          &__graphTopText {
            span {
              color: ${currentTheme.lightBlue.hex};
            }
          }
          &__graph {
            &:last-of-type {
              .CooldownInfoModal__graphLine {
                background: ${currentTheme.green.hex};
                &:after,
                &:before {
                  background: ${currentTheme.green.hex};
                }
              }
            }
          }
          &__graphLine {
            background: ${currentTheme.red.hex};
            &:after {
              background: ${currentTheme.red.hex};
            }
          }

          .CheckBoxField {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
