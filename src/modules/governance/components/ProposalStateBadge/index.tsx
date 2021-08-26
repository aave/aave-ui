import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ProposalState } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

interface ProposalStateProps {
  state: string;
  size?: 'normal' | 'big';
}

export default function ProposalStateBadge({ state, size }: ProposalStateProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  let currentState = messages.voting;
  if (state === ProposalState.Active) {
    currentState = messages.voting;
  } else if (state === ProposalState.Queued) {
    currentState = messages.queued;
  } else if (state === ProposalState.Executed) {
    currentState = messages.executed;
  } else if (state === ProposalState.Failed) {
    currentState = messages.failed;
  } else if (state === ProposalState.Canceled) {
    currentState = messages.canceled;
  } else if (state === ProposalState.Expired) {
    currentState = messages.expired;
  } else if (state === ProposalState.Pending) {
    currentState = messages.pending;
  } else if (state === ProposalState.Succeeded) {
    currentState = messages.passed;
  }

  return (
    <p
      className={classNames('ProposalState', `ProposalState__${size}`, {
        ProposalState__voting: state === ProposalState.Active,
        ProposalState__validating:
          state === ProposalState.Queued || state === ProposalState.Pending,
        ProposalState__executed:
          state === ProposalState.Executed || state === ProposalState.Succeeded,
        ProposalState__failed:
          state === ProposalState.Failed ||
          state === ProposalState.Expired ||
          state === ProposalState.Canceled,
      })}
    >
      <i className="ProposalState__circle" />
      <span>{intl.formatMessage(currentState)}</span>

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .ProposalState {
          color: ${currentTheme.primary.hex};
        }
        .ProposalState__voting {
          .ProposalState__circle {
            background: ${currentTheme.primary.hex};
            animation: pulse 2s infinite;
          }
        }
        .ProposalState__validating {
          color: ${currentTheme.orange.hex};
          .ProposalState__circle {
            background: ${currentTheme.orange.hex};
          }
        }
        .ProposalState__executed {
          color: ${currentTheme.green.hex};
          .ProposalState__circle {
            background: ${currentTheme.green.hex};
          }
        }
        .ProposalState__failed {
          color: ${currentTheme.red.hex};
          .ProposalState__circle {
            background: ${currentTheme.red.hex};
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            box-shadow: 0 0 0 0 ${currentTheme.primary.hex};
          }

          70% {
            transform: scale(1);
            box-shadow: 0 0 1px 6px transparent;
          }

          100% {
            transform: scale(0.8);
            box-shadow: 0 0 0 0 transparent;
          }
        }
      `}</style>
    </p>
  );
}
