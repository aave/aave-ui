import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { ProposalState } from '@aave/protocol-js';
import { rgba, useThemeContext, AnimationArrow, DropdownWrapper } from '@aave/aave-ui-kit';

import { ProposalItem } from '../../../../../libs/governance-provider/types';

import messages from './messages';
import staticStyles from './style';

interface ProposalsFilterProps {
  proposals: ProposalItem[];
  status: ProposalState | undefined;
  setStatus: (value: ProposalState | undefined) => void;
}

export default function ProposalsFilter({ proposals, status, setStatus }: ProposalsFilterProps) {
  const intl = useIntl();
  const { currentTheme, xl, sm } = useThemeContext();

  const [visible, setVisible] = useState(false);

  const changeState = (status: ProposalState | undefined) => {
    setStatus(status);
    setVisible(false);
  };

  let currentState = messages.all;
  if (status === ProposalState.Active) {
    currentState = messages.voting;
  } else if (status === ProposalState.Queued) {
    currentState = messages.queued;
  } else if (status === ProposalState.Executed) {
    currentState = messages.executed;
  } else if (status === ProposalState.Failed) {
    currentState = messages.failed;
  } else if (status === ProposalState.Canceled) {
    currentState = messages.canceled;
  } else if (status === ProposalState.Expired) {
    currentState = messages.expired;
  } else if (status === ProposalState.Pending) {
    currentState = messages.pending;
  } else if (status === ProposalState.Succeeded) {
    currentState = messages.passed;
  } else {
    currentState = messages.all;
  }

  const filters = [
    {
      value: undefined,
      title: messages.all,
      count: proposals.length || 0,
    },
    {
      value: ProposalState.Active,
      title: messages.voting,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Active).length || 0,
    },
    {
      value: ProposalState.Queued,
      title: messages.queued,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Queued).length || 0,
    },
    {
      value: ProposalState.Pending,
      title: messages.pending,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Pending).length || 0,
    },
    {
      value: ProposalState.Executed,
      title: messages.executed,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Executed).length || 0,
    },
    {
      value: ProposalState.Succeeded,
      title: messages.passed,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Succeeded).length || 0,
    },
    {
      value: ProposalState.Canceled,
      title: messages.canceled,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Canceled).length || 0,
    },
    {
      value: ProposalState.Failed,
      title: messages.failed,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Failed).length || 0,
    },
    {
      value: ProposalState.Expired,
      title: messages.expired,
      count: proposals.filter((proposal) => proposal.state === ProposalState.Expired).length || 0,
    },
  ];

  const hoverColor = rgba(`${currentTheme.secondary.rgb}, 0.15`);

  return (
    <DropdownWrapper
      visible={visible}
      setVisible={setVisible}
      className="ProposalsFilter"
      verticalPosition="bottom"
      horizontalPosition="left"
      buttonComponent={
        <button
          type="button"
          className="ProposalsFilter__button"
          onClick={() => setVisible(!visible)}
        >
          <p className={classNames(`ProposalsFilter__button-${status}`)}>
            <span>{intl.formatMessage(messages.filter)}:</span>
            {intl.formatMessage(currentState)}
          </p>

          <AnimationArrow
            active={visible}
            width={xl && !sm ? 10 : 14}
            height={xl && !sm ? 6 : 8}
            arrowTopPosition={xl && !sm ? 2 : 4}
            arrowWidth={xl && !sm ? 6 : 9}
            arrowHeight={2}
            color={currentTheme.textDarkBlue.hex}
          />
        </button>
      }
    >
      <div className="ProposalsFilter__content">
        {filters.map((filter, index) => (
          <button
            onClick={() => changeState(filter.value)}
            type="button"
            key={index}
            disabled={filter.value === status}
            className={`ProposalsFilter__${filter.value}`}
          >
            <p>{intl.formatMessage(filter.title)}</p>
            <span>({filter.count < 10 ? `0${filter.count}` : filter.count})</span>
          </button>
        ))}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ProposalsFilter {
          &__button {
            color: ${currentTheme.primary.hex};
            span {
              color: ${currentTheme.textDarkBlue.hex};
            }
          }

          &__content {
            background: ${currentTheme.white.hex};
            button {
              color: ${currentTheme.darkBlue.hex};
              &:hover,
              &:disabled {
                background: ${hoverColor};
              }

              span {
                color: ${currentTheme.lightBlue.hex};
              }
            }
          }

          &__button-executed,
          &__button-succeeded {
            color: ${currentTheme.green.hex};
          }

          &__button-pending,
          &__button-queued {
            color: ${currentTheme.orange.hex};
          }

          &__button-canceled,
          &__button-failed,
          &__button-expired {
            color: ${currentTheme.red.hex};
          }

          &__active {
            &:after {
              background: ${currentTheme.primary.hex};
            }
          }

          &__executed,
          &__succeeded {
            &:after {
              background: ${currentTheme.green.hex};
            }
          }

          &__pending,
          &__queued {
            &:after {
              background: ${currentTheme.orange.hex};
            }
          }

          &__canceled,
          &__failed,
          &__expired {
            &:after {
              background: ${currentTheme.red.hex};
            }
          }
        }
      `}</style>
    </DropdownWrapper>
  );
}
