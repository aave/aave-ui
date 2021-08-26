import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useIntl } from 'react-intl';
import { gradient, useThemeContext } from '@aave/aave-ui-kit';

import { EthTransactionData, TxStatusType } from '../../../helpers/send-ethereum-tx';
import TxBottomStatusLine from '../TxBottomStatusLine';

import messages from './messages';
import staticStyles from './style';

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
            <span>{numberOfSteps}</span>
            <p>{actionTxData.name}</p>
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
            <span>{numberOfSteps + 1}</span>
            <p>
              {!actionError
                ? intl.formatMessage(actionSubmitted ? messages.pending : messages.finished)
                : intl.formatMessage(messages.failed)}
            </p>
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
          border: 1px solid ${currentTheme.darkBlue.hex};

          &__submitted {
            border: 1px solid ${currentTheme.orange.hex};
          }
          &__confirmed {
            border: 1px solid ${currentTheme.green.hex};
          }
          &__error {
            border: 1px solid ${currentTheme.red.hex};
          }

          &__button {
            border-right: 1px solid
              ${isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.white.hex};
            background: ${isCurrentThemeDark ? currentTheme.headerBg.hex : currentTheme.mainBg.hex};
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__buttonAllowed {
            background: ${allowedGradient};
            color: ${currentTheme.white.hex};
            &:hover {
              background: ${activeGradient};
            }
          }
          &__buttonActive {
            background: ${activeGradient};
            color: ${currentTheme.white.hex};
          }
          &__buttonSubmitted {
            background: ${currentTheme.orange.hex};
            color: ${currentTheme.white.hex};
          }
          &__buttonConfirmed {
            background: ${currentTheme.green.hex};
            color: ${currentTheme.white.hex};
          }
          &__buttonError {
            background: ${currentTheme.red.hex};
            color: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </div>
  );
}
