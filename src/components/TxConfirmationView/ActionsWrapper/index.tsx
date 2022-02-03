import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { EthTransactionData, TxStatusType } from '../../../helpers/send-ethereum-tx';
import TxBottomStatusLine from '../TxBottomStatusLine';

import messages from './messages';
import staticStyles from './style';
import styled from 'styled-components';

interface ActionsWrapperProps {
  approveTxData?: EthTransactionData;
  actionTxData?: EthTransactionData;
  selectedStep: number;
  setSelectedStep: (value: number) => void;
  numberOfSteps: number;
  unlockedSteps: number;
  error?: boolean;
  children: ReactNode;
}

const HeaderButtonText = styled.span<{a?: boolean}>`
  font-family: Montserrat;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${props => props.a ? 'white' : 'black'};
`

export default function ActionsWrapper({
  approveTxData,
  actionTxData,
  selectedStep,
  setSelectedStep,
  numberOfSteps,
  unlockedSteps,
  error,
  children,
}: ActionsWrapperProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const activeGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 1`,
    0,
    `${currentTheme.primary.rgb}, 1`,
    100
  );
  const allowedGradient = gradient(
    90,
    `${currentTheme.secondary.rgb}, 0.5`,
    0,
    `${currentTheme.primary.rgb}, 0.5`,
    100
  );

  const approveSubmitted = approveTxData?.txStatus === TxStatusType.submitted;
  const approveConfirmed = approveTxData?.txStatus === TxStatusType.confirmed;
  const approveError = approveTxData?.error && approveTxData.txStatus === TxStatusType.error;
  const actionSubmitted = actionTxData?.txStatus === TxStatusType.submitted;
  const actionConfirmed = actionTxData?.txStatus === TxStatusType.confirmed;
  const actionError = actionTxData?.error && actionTxData.txStatus === TxStatusType.error;

  return (
    <div
      className={classNames('ActionsWrapper', {
        ActionsWrapper__submitted: actionSubmitted,
        ActionsWrapper__confirmed: actionConfirmed,
        ActionsWrapper__error: (!actionConfirmed && actionError) || (error && !actionConfirmed),
      })}
    >
      <div className="ActionsWrapper__buttons">
        {approveTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === 1,
              ActionsWrapper__buttonSubmitted: approveSubmitted,
              ActionsWrapper__buttonConfirmed: approveConfirmed,
              ActionsWrapper__buttonError:
                (!approveConfirmed && approveError) || (error && !approveConfirmed),
            })}
            onClick={() => setSelectedStep(1)}
            disabled={approveConfirmed || !!approveError || selectedStep === 1}
          >
            <span>1</span>
            <p>{approveTxData.name}</p>
          </button>
        )}

        {actionTxData && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonActive: selectedStep === numberOfSteps,
              ActionsWrapper__buttonSubmitted: actionSubmitted,
              ActionsWrapper__buttonConfirmed: actionConfirmed,
              ActionsWrapper__buttonError:
                (!actionConfirmed && actionError) || (error && !actionConfirmed),
            })}
            onClick={() => unlockedSteps >= numberOfSteps && setSelectedStep(numberOfSteps)}
            disabled={actionConfirmed || !!actionError || selectedStep === numberOfSteps}
          >
            <HeaderButtonText a>{numberOfSteps}</HeaderButtonText>
            <HeaderButtonText a>{actionTxData.name}</HeaderButtonText>
          </button>
        )}

        {!!numberOfSteps && (
          <button
            className={classNames('ActionsWrapper__button', {
              ActionsWrapper__buttonSubmitted: actionSubmitted,
              ActionsWrapper__buttonConfirmed: actionConfirmed,
              ActionsWrapper__buttonError:
                (!actionConfirmed && actionError) || (error && !actionConfirmed),
            })}
            onClick={() => unlockedSteps > numberOfSteps && setSelectedStep(numberOfSteps + 1)}
            disabled={true}
          >
            <HeaderButtonText a={actionConfirmed}>{numberOfSteps + 1}</HeaderButtonText>
            <HeaderButtonText a={actionConfirmed}>
              {!actionError
                ? intl.formatMessage(actionSubmitted ? messages.pending : messages.finished)
                : intl.formatMessage(messages.failed)
              }
            </HeaderButtonText>
          </button>
        )}
      </div>

      {children}

      {approveTxData && (approveConfirmed || approveSubmitted || !!approveError) && (
        <TxBottomStatusLine
          title={approveTxData.name}
          confirmed={approveConfirmed}
          submitted={approveSubmitted}
          failed={!!approveError}
          error={error && !approveConfirmed}
          txHash={approveTxData.txHash}
        />
      )}

      {actionTxData && (actionConfirmed || actionSubmitted || !!actionError) && (
        <TxBottomStatusLine
          title={actionTxData.name}
          confirmed={actionConfirmed}
          submitted={actionSubmitted}
          failed={!!actionError}
          error={error && !actionConfirmed}
          txHash={actionTxData.txHash}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ActionsWrapper {
          background: ${currentTheme.whiteItem.hex};
          border-radius: 5px;
          border: solid 1px #e2e2e2;

          &__submitted {
            border: 1px solid #e2e2e2;
          }
          &__confirmed {
            border: 1px solid #e2e2e2;
          }
          &__error {
            border: 1px solid #e2e2e2;
          }

          &__button {
            padding-top: 6px;
            padding-bottom: 6px;
            border-right: 1px solid
              ${isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.white.hex};
            background: ${isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.mainBg.hex};
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__buttonAllowed {
            background: '${allowedGradient}';
            color: ${currentTheme.white.hex};
            &:hover {
              background: ${activeGradient};
            }
          }
          &__buttonActive {
            background: #7159ff;
            border-top-left-radius: 5px;
            color: ${currentTheme.white.hex};
          }
          &__buttonSubmitted {
            background: #7159ff;
            color: ${currentTheme.white.hex};
          }
          &__buttonConfirmed {
            background: #008c79;
            color: ${currentTheme.white.hex};
          }
          &__buttonError {
            background: #7159ff;
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
