import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext, BasicModal, SpinLoader } from '@aave/aave-ui-kit';

import { TxStatusType } from '../../../helpers/send-ethereum-tx';
import DefaultButton from '../../basic/DefaultButton';
import Caption from '../../basic/Caption';
import TextStatus from '../TextStatus';
import DotStatus from '../DotStatus';

import { FormattedTxErrorText } from '../../../ui-config';

import messages from './messages';
import staticStyles from './style';

import copyIcon from '../../../images/copyIcon.svg';

interface TxTopInfoProps {
  txStatus?: TxStatusType;
  title: string;
  description?: string;
  buttonTitle?: string;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  error?: boolean;
  loading?: boolean;
  failed?: string;
  numberOfSteps?: number;
}

export default function TxTopInfo({
  txStatus,
  title,
  description,
  buttonTitle,
  goToAfterSuccess,
  successButtonTitle,
  loading,
  error,
  failed,
  numberOfSteps,
}: TxTopInfoProps) {
  const intl = useIntl();
  const history = useHistory();
  const { currentTheme } = useThemeContext();

  const isErrorNeedToFormat = failed ? failed.search('{"') !== -1 : false;

  const [isCopied, setIsCopied] = useState(false);
  const [isErrorReportVisible, setErrorReportVisible] = useState(false);

  const handleCopied = () => {
    navigator.clipboard.writeText(failed || '').then(() => setIsCopied(true));
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="TxTopInfo">
      {!txStatus ? (
        <div
          className={classNames('TxTopInfo__inner', { TxTopInfo__errorInner: isErrorNeedToFormat })}
        >
          <div className="TxTopInfo__left-inner">
            <div className="TxTopInfo__title">
              {title} {isErrorNeedToFormat && `- ${intl.formatMessage(messages.error)}`}{' '}
              {error && <DotStatus error={error} />}
            </div>

            {description && !isErrorNeedToFormat && <span>{description}</span>}

            {isErrorNeedToFormat && <FormattedTxErrorText />}
          </div>

          {!isErrorNeedToFormat && (
            <div className="TxTopInfo__right-inner">
              {!error ? (
                <div className="TxTopInfo__button-inner">
                  {loading && (
                    <SpinLoader color={currentTheme.lightBlue.hex} className="TxTopInfo__spinner" />
                  )}
                  <DefaultButton
                    className="TxTopInfo__button"
                    title={buttonTitle || intl.formatMessage(messages.submit)}
                    disabled={loading}
                    onDarkBackground={true}
                    type="submit"
                  />
                </div>
              ) : (
                <DefaultButton
                  className="TxTopInfo__button"
                  title={intl.formatMessage(messages.goBack)}
                  onClick={history.goBack}
                />
              )}
            </div>
          )}

          {isErrorNeedToFormat && (
            <div className="TxTopInfo__error-buttons">
              <DefaultButton
                title={intl.formatMessage(isCopied ? messages.copied : messages.copyError)}
                iconComponent={<img src={copyIcon} alt="" />}
                onClick={() => handleCopied()}
                className="TxTopInfo__error-button"
              />

              <button
                className="TxTopInfo__showError-button"
                type="button"
                onClick={() => setErrorReportVisible(true)}
              >
                {intl.formatMessage(messages.showError)}
              </button>
            </div>
          )}
        </div>
      ) : (
        <TextStatus
          txStatus={txStatus}
          submitted={txStatus === TxStatusType.submitted}
          successButtonTitle={successButtonTitle}
          goToAfterSuccess={goToAfterSuccess}
          numberOfSteps={numberOfSteps}
        />
      )}

      {isErrorNeedToFormat && failed && (
        <BasicModal
          isVisible={isErrorReportVisible}
          onBackdropPress={() => setErrorReportVisible(false)}
          withCloseButton={true}
          className="TxTopInfo__modal"
        >
          <div className="TxTopInfo__modal-content">
            <Caption title={intl.formatMessage(messages.errorReport)} />
            <div className="TxTopInfo__errorReport-text">{failed}</div>
            <div className="TxTopInfo__modal-button-inner">
              <DefaultButton
                title={intl.formatMessage(messages.copyErrorAndClose)}
                iconComponent={<img src={copyIcon} alt="" />}
                onClick={() => {
                  setErrorReportVisible(false);
                  navigator.clipboard.writeText(failed || '');
                }}
              />
            </div>
          </div>
        </BasicModal>
      )}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .TxTopInfo {
          color: ${currentTheme.textDarkBlue.hex};
          &__left-inner {
            .TxTopInfo__title {
              color: ${currentTheme.primary.hex};
            }
          }

          &__errorInner {
            .TxTopInfo__left-inner {
              .TxTopInfo__title {
                color: ${currentTheme.red.hex};
              }
            }
          }

          &__showError-button {
            color: ${currentTheme.primary.hex};
          }

          &__errorReport-text {
            background: ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
