import React from 'react';
import { useIntl } from 'react-intl';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import TextWithModal from '../../../../components/TextWithModal';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

import aaveIcon from '../../../../images/aave.svg';
import bptIcon from '../../../../images/bpt.svg';
import tickIcon from './images/tick.svg';

export default function AboutStakingModal() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const gradientLine = gradient(
    217,
    `${currentTheme.primary.rgb}, 1`,
    25,
    `${currentTheme.secondary.rgb}, 1`,
    100
  );

  return (
    <div className="AboutStakingModal">
      <TextWithModal
        text={intl.formatMessage(messages.caption)}
        color="primary"
        className="AboutStakingModal__title"
        withCloseButton={true}
        withoutContentButton={true}
        modalClassName="AboutStakingModal__modal"
      >
        <div className="AboutStakingModal__modal-content">
          <div className="AboutStakingModal__modal-left">
            <div className="AboutStakingModal__modal-captionInner">
              <img src={aaveIcon} alt="AAVE" />
              <h3>{intl.formatMessage(messages.infoCaption, { asset: 'AAVE' })}</h3>
              <p>
                {intl.formatMessage(messages.aaveDescription, {
                  upTo: <strong>{intl.formatMessage(messages.upTo)}</strong>,
                })}
              </p>
            </div>
            <ul>
              <li>
                <img src={tickIcon} alt="" />
                {intl.formatMessage(messages.aaveStakingRewards)}
              </li>
            </ul>
          </div>

          <div className="AboutStakingModal__modal-right">
            <div className="AboutStakingModal__modal-captionInner">
              <img src={bptIcon} alt="BPT" />
              <h3>{intl.formatMessage(messages.infoCaption, { asset: 'BPT' })}</h3>
              <p>
                {intl.formatMessage(messages.bptDescription, {
                  upTo: <strong>{intl.formatMessage(messages.upTo)}</strong>,
                  balancerLiquidityPool: (
                    <Link
                      to="https://pools.balancer.exchange/#/pool/0xc697051d1c6296c24ae3bcef39aca743861d9a81/about"
                      title={intl.formatMessage(messages.balancerLiquidityPool)}
                      color="dark"
                      absolute={true}
                      inNewWindow={true}
                      disabled={true}
                    />
                  ),
                })}
              </p>
            </div>
            <ul>
              <li>
                <img src={tickIcon} alt="" />
                {intl.formatMessage(messages.aaveStakingRewards)}
              </li>
              <li>
                <img src={tickIcon} alt="" />
                {intl.formatMessage(messages.tradingFees)}
              </li>
              <li>
                <img src={tickIcon} alt="" />
                {intl.formatMessage(messages.token, { asset: 'BAL' })}
              </li>
            </ul>
          </div>
        </div>
      </TextWithModal>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AboutStakingModal {
          &__modal-left,
          &__modal-right {
            &:first-of-type {
              &:after {
                background: ${gradientLine};
              }
            }
          }

          &__modal-content {
            color: ${currentTheme.darkBlue.hex};
          }
          &__modal-captionInner {
            h3 {
              color: ${currentTheme.primary.hex};
            }
            p {
              strong {
                color: ${currentTheme.red.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
