import React, { FormEvent } from 'react';
import { useIntl } from 'react-intl';

import { TxStatusType } from '../../../helpers/send-ethereum-tx';
import TxTopInfo from '../TxTopInfo';

import messages from '../messages';

export interface ActionExecutionBoxProps {
  onSubmitTransaction: () => Promise<void>;
  txStatus?: TxStatusType;
  title: string;
  description?: string;
  buttonTitle?: string;
  goToAfterSuccess?: string;
  successButtonTitle?: string;
  loading?: boolean;
  failed?: string;
  error?: boolean;
  numberOfSteps?: number;
}

export default function ActionExecutionBox({
  onSubmitTransaction,
  txStatus,
  title,
  description,
  buttonTitle,
  goToAfterSuccess,
  successButtonTitle,
  loading,
  failed,
  error,
  numberOfSteps,
}: ActionExecutionBoxProps) {
  const intl = useIntl();

  const handleSubmitTransaction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    return onSubmitTransaction();
  };

  return (
    <form onSubmit={handleSubmitTransaction} className="ActionExecutionBox">
      <TxTopInfo
        txStatus={txStatus}
        title={title}
        description={
          !!failed ? intl.formatMessage(messages.txFailReason, { reason: failed }) : description
        }
        buttonTitle={buttonTitle}
        goToAfterSuccess={goToAfterSuccess}
        successButtonTitle={successButtonTitle}
        loading={loading}
        error={error}
        failed={failed}
        numberOfSteps={numberOfSteps}
      />
    </form>
  );
}
