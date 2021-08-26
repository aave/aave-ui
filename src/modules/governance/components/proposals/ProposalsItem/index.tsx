import React from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { ProposalState } from '@aave/protocol-js';
import { useThemeContext, Timer } from '@aave/aave-ui-kit';

import { ProposalItem } from '../../../../../libs/governance-provider/types';
import Link from '../../../../../components/basic/Link';

import ProposalsItemBar from '../ProposalsItemBar';
import ProposalStateBadge from '../../ProposalStateBadge';
import QuorumLine from '../../QuorumLine';

import messages from './messages';
import staticStyles from './style';

interface ProposalsItemProps {
  proposal: ProposalItem;
}

export default function ProposalsItem({ proposal }: ProposalsItemProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  const TimeRemaining = () => {
    if (
      [ProposalState.Active, ProposalState.Queued, ProposalState.Pending].includes(proposal.state)
    ) {
      return (
        <p className="ProposalsItem__timeLeft">
          <span>
            {intl.formatMessage(messages.timeLeft)} <strong>~</strong>
          </span>
          <Timer dateInFuture={proposal.proposalExpirationTimestamp} />
        </p>
      );
    }

    let message = '';
    let timestamp = '';

    if (proposal.state === ProposalState.Succeeded) message = intl.formatMessage(messages.passedOn);
    if (proposal.state === ProposalState.Failed) message = intl.formatMessage(messages.failedOn);
    if (proposal.state === ProposalState.Expired) message = intl.formatMessage(messages.expiredOn);
    if (proposal.state === ProposalState.Canceled)
      message = intl.formatMessage(messages.cancelledOn);

    if (proposal.state === ProposalState.Executed) {
      message = intl.formatMessage(messages.executedOn);
      timestamp = dayjs.unix(Number(proposal.executionTime)).format('DD MMM YYYY');
    } else {
      timestamp = dayjs.unix(proposal?.proposalExpirationTimestamp).format('DD MMM YYYY');
    }

    return (
      <p className="ProposalsItem__timeLeft">
        {message} <b>{timestamp}</b>
      </p>
    );
  };

  return (
    <Link
      className="ProposalsItem ButtonLink"
      to={`/governance/${proposal.id}-${proposal.ipfsHash}`}
      color="dark"
    >
      <div className="ProposalsItem__left-inner">
        <h3 className={classNames({ ProposalsItem__invalid: proposal.title === 'Na' })}>
          {proposal.title === 'Na'
            ? intl.formatMessage(messages.invalidFormat)
            : (proposal.aip.toString() === '0' ? '' : `AIP ${proposal.aip}: `) + proposal.title}
        </h3>
        <div className="ProposalsItem__info">
          <ProposalStateBadge state={proposal.state} />
          <TimeRemaining />

          <QuorumLine
            minimalDiff={Number(proposal.minimumDiff)}
            totalPower={Number(proposal.totalVotingSupply)}
            minimumQuorum={proposal.formattedMinQuorum}
            againstVotes={proposal.formattedAgainstVotes}
            forVotes={proposal.formattedForVotes}
            state={proposal.state}
          />
        </div>
      </div>

      <div className="ProposalsItem__right-inner">
        <ProposalsItemBar
          currentYesVote={Number(proposal.formattedForVotes)}
          currentNoVote={Number(proposal.formattedAgainstVotes)}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ProposalsItem {
          background: ${isCurrentThemeDark
            ? sm
              ? currentTheme.darkBlue.hex
              : currentTheme.whiteItem.hex
            : currentTheme.whiteItem.hex};
          &:hover {
            box-shadow: 0 0 9px 0 ${currentTheme.primary.hex};
          }

          &__left-inner {
            h3 {
              color: ${currentTheme.textDarkBlue.hex};
              &.ProposalsItem__invalid {
                color: ${currentTheme.orange.hex};
              }
            }
          }

          &__id {
            color: ${currentTheme.textDarkBlue.hex};
          }

          &__timeLeft {
            color: ${currentTheme.textDarkBlue.hex};
            span {
              color: ${currentTheme.textDarkBlue.hex} !important;
            }
          }
        }
      `}</style>
    </Link>
  );
}
