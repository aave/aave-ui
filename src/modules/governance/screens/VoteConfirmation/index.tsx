import React from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import { useVotingPowerLoader } from '../../../../libs/governance-provider/hooks/use-voting-power-rpc';
import Row from '../../../../components/basic/Row';
import VoteConfirmationWrapper from '../../components/proposal/VoteConfirmationWrapper';
import { useProposalDataContext } from '../Proposal';

import messages from './messages';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';

export interface ProposalParams {
  proposalId: string;
  proposalHash: string;
  vote: string;
}

export default function VoteConfirmation() {
  const intl = useIntl();
  const { userId } = useStaticPoolDataContext();
  const { currentTheme } = useThemeContext();
  const { vote } = useParams<ProposalParams>();
  const { proposal, proposalId } = useProposalDataContext();
  const { governanceService } = useGovernanceDataContext();
  const { loading, power } = useVotingPowerLoader(
    proposal?.startBlock,
    proposal?.strategy,
    governanceService,
    userId
  );

  const processedVote = vote.toLowerCase() === 'yes';

  const caption = intl.formatMessage(messages.caption, {
    processedVote: processedVote
      ? intl.formatMessage(messages.rowYes)
      : intl.formatMessage(messages.rowNo),
    balance: intl.formatNumber(+power, { maximumFractionDigits: 2 }),
    proposalId,
  });

  const notEnoughBalance = !loading && power === '0';

  return (
    <VoteConfirmationWrapper
      caption={caption}
      blockingError={notEnoughBalance ? intl.formatMessage(messages.errorVoteBalance) : undefined}
      boxTitle={intl.formatMessage(messages.boxTitle)}
      boxDescription={intl.formatMessage(messages.boxDescription)}
      mainTxName={intl.formatMessage(messages.boxTitle)}
    >
      <Row title={intl.formatMessage(messages.rowTitle)}>
        <p
          style={{
            color: `${processedVote ? currentTheme.green.hex : currentTheme.red.hex}`,
          }}
        >
          {intl.formatMessage(processedVote ? messages.rowYes : messages.rowNo)}
        </p>
      </Row>
    </VoteConfirmationWrapper>
  );
}
