import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, BasicModal } from '@aave/aave-ui-kit';

import LabeledSwitcher from '../../../../components/basic/LabeledSwitcher';
import VoteInfoTableItem from './VoteInfoTableItem';
import VoteInfoBar from './VoteInfoBar';

import messages from './messages';
import staticStyles from './style';

import { ProposalItem } from '../../../../libs/governance-provider/types';
import { Vote } from '../../../../libs/governance-provider/types';
import { valueToBigNumber } from '@aave/protocol-js';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';

interface VoteInfoModalProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  proposal: ProposalItem;
  yesVotes: Vote[];
  noVotes: Vote[];
}

const formatVotingPower = (votingPower: number) => {
  return votingPower / 10 ** 18;
};

export default function VoteInfoModal({
  isVisible,
  onBackdropPress,
  proposal,
  yesVotes,
  noVotes,
}: VoteInfoModalProps) {
  const intl = useIntl();
  const { governanceNetworkConfig } = useGovernanceDataContext();
  const { currentTheme, sm } = useThemeContext();
  const [noVotesVisible, setNoVotesVisible] = useState(false);

  const yesVotesBackground = rgba(`${currentTheme.green.rgb}, 0.1`);
  const noVotesBackground = rgba(`${currentTheme.red.rgb}, 0.1`);

  const currentYesVoteFormatted = Number(proposal.formattedForVotes) || 0;
  const currentNoVoteFormatted = Number(proposal.formattedAgainstVotes) || 0;
  const totalVoteValue = valueToBigNumber(currentYesVoteFormatted)
    .plus(currentNoVoteFormatted)
    .toNumber();

  return (
    <BasicModal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      className="VoteInfoModal"
      withCloseButton={sm}
    >
      <div className="VoteInfoModal__content">
        <div className="VoteInfoModal__switch-inner">
          <LabeledSwitcher
            className="VoteInfoModal__switcher"
            value={noVotesVisible}
            leftOption={intl.formatMessage(messages.yes)}
            rightOption={intl.formatMessage(messages.no)}
            onToggle={() => setNoVotesVisible(!noVotesVisible)}
          />
        </div>

        <div
          className={classNames('VoteInfoModal__content-left-inner', {
            VoteInfoModal__activeInner: sm && !noVotesVisible,
          })}
        >
          {yesVotes.length > 0 && (
            <VoteInfoBar
              type="yes"
              totalValue={totalVoteValue}
              currentValue={currentYesVoteFormatted}
            />
          )}

          {yesVotes.length > 0 ? (
            <div className="VoteInfoModal__table">
              <div className="VoteInfoModal__table-header">
                <p>{intl.formatMessage(messages.address)}</p>
                <p>{intl.formatMessage(messages.votes)}</p>
              </div>

              <div className="VoteInfoModal__table-content">
                {yesVotes.slice(0, 10).map((vote: Vote, index) => (
                  <VoteInfoTableItem
                    explorerLinkBuilder={governanceNetworkConfig.explorerLinkBuilder}
                    address={vote.voter}
                    votingPower={formatVotingPower(vote.votingPower)}
                    key={index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="VoteInfoModal__noData">
              <p>{intl.formatMessage(messages.noDataYes)}</p>
            </div>
          )}
        </div>

        <div
          className={classNames('VoteInfoModal__content-right-inner', {
            VoteInfoModal__activeInner: sm && noVotesVisible,
          })}
        >
          {noVotes.length > 0 && (
            <VoteInfoBar
              type="no"
              totalValue={totalVoteValue}
              currentValue={currentNoVoteFormatted}
            />
          )}

          {noVotes.length > 0 ? (
            <div className="VoteInfoModal__table">
              <div className="VoteInfoModal__table-header">
                <p>{intl.formatMessage(messages.address)}</p>
                <p>{intl.formatMessage(messages.votes)}</p>
              </div>

              <div className="VoteInfoModal__table-content">
                {noVotes.slice(0, 10).map((vote: Vote, index) => (
                  <VoteInfoTableItem
                    explorerLinkBuilder={governanceNetworkConfig.explorerLinkBuilder}
                    address={vote.voter}
                    votingPower={formatVotingPower(vote.votingPower)}
                    key={index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="VoteInfoModal__noData">
              <p>{intl.formatMessage(messages.noDataNo)}</p>
            </div>
          )}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .VoteInfoModal {
          &__content-left-inner {
            background: ${yesVotesBackground};
          }
          &__content-right-inner {
            background: ${noVotesBackground};
          }

          &__table-header {
            p {
              color: ${currentTheme.darkBlue.hex};
            }
          }

          &__noData {
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
