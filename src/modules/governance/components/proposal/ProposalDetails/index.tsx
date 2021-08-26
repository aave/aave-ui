import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { ProposalState } from '@aave/protocol-js';
import { useThemeContext } from '@aave/aave-ui-kit';

import useGetTopVoters from '../../../../../libs/governance-provider/hooks/use-get-top-voters';
import { IpfsMeta, ProposalItem } from '../../../../../libs/governance-provider/types';
import ContentWrapperWithTopLine from '../../../../../components/wrappers/ContentWrapperWithTopLine';
import Row from '../../../../../components/basic/Row';
import Link from '../../../../../components/basic/Link';
import Value from '../../../../../components/basic/Value';
import ValuePercent from '../../../../../components/basic/ValuePercent';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import ProposalStateBadge from '../../ProposalStateBadge';
import QuorumLine from '../../QuorumLine';
import PayloadModal from '../PayloadModal';
import VoteInfoModal from '../../VoteInfoModal';

import messages from './messages';
import staticStyles from './style';

const formatAuthorText = (text?: string) => {
  if (!text) {
    return false;
  }
  const matches = text.match(/\((.*?)\)/) || '';
  const githubUser = '';

  return (
    <Link
      to={`https://github.com/${githubUser}`}
      color="primary"
      title={text.replace(matches[0], '')}
      absolute={true}
      inNewWindow={true}
    />
  );
};

interface ProposalDetailsProps {
  proposal: ProposalItem;
  attributes?: IpfsMeta;
}

export default function ProposalDetails({ proposal, attributes }: ProposalDetailsProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const [showModalAddresses, setShowModalAddresses] = useState(false);

  const [showPayload, setShowModalPayload] = useState(false);

  const {
    loading: loadingTopVoters,
    forTopVotes,
    againstTopVotes,
    error: errorTopVotes,
  } = useGetTopVoters({
    proposalId: proposal?.id.toString() || '',
    skip: false,
  });

  const showTopVoters =
    !errorTopVotes && !loadingTopVoters && (forTopVotes.length > 0 || againstTopVotes.length > 0);

  const ProposalExecutionState = () => {
    if (proposal.state === ProposalState.Executed) {
      return (
        <Row
          className="ProposalDetails__row"
          title={intl.formatMessage(messages.executed)}
          subTitle={intl.formatMessage(messages.block)}
        >
          <div className="ProposalDetails__row-inner">
            {/** TODO: Must be changed to the real execution time, not max execution time*/}
            <p>{dayjs.unix(Number(proposal.executionTime)).format('DD MMM YYYY, hh:mm a')}</p>
            {/**<i>{proposal.executeBlock} </i>*/}
          </div>
        </Row>
      );
    } else {
      if (proposal.state === ProposalState.Failed) {
        return (
          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.failed)}
            subTitle={intl.formatMessage(messages.block)}
          >
            <div className="ProposalDetails__row-inner">
              <p>
                {dayjs.unix(proposal.proposalExpirationTimestamp).format('DD MMM YYYY, hh:mm a')}
              </p>
              <i>{proposal.endBlock}</i>
            </div>
          </Row>
        );
      } else {
        return (
          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.execution)}
            subTitle={intl.formatMessage(messages.block)}
          >
            <div className="ProposalDetails__row-inner">
              <p>
                ~ {dayjs.unix(proposal.proposalExpirationTimestamp).format('DD MMM YYYY, hh:mm a')}
              </p>
              <i>{proposal.endBlock} </i>
            </div>
          </Row>
        );
      }
    }
  };

  return (
    <div className="ProposalDetails">
      <ContentWrapperWithTopLine
        title={intl.formatMessage(messages.proposalDetails)}
        className="ProposalDetails__content"
      >
        <div className="ProposalDetails__top-inner">
          <Row className="ProposalDetails__row" title={intl.formatMessage(messages.state)}>
            <ProposalStateBadge state={proposal.state} size="big" />
          </Row>

          {attributes && (
            <>
              {attributes.aip && (
                <>
                  <Row className="ProposalDetails__row" title={intl.formatMessage(messages.aip)}>
                    <Link
                      to={`https://aave.github.io/aip/AIP-${attributes.aip}`}
                      title={`#${attributes.aip < 10 ? `0${attributes.aip}` : attributes.aip}`}
                      color="primary"
                      absolute={true}
                      inNewWindow={true}
                    />
                  </Row>

                  {attributes.requires && (
                    <Row
                      className="ProposalDetails__row"
                      title={intl.formatMessage(messages.requires)}
                    >
                      <p>{attributes.requires}</p>
                    </Row>
                  )}
                </>
              )}
            </>
          )}

          <Row
            className="ProposalDetails__row ProposalDetails__row-quorum"
            title={intl.formatMessage(messages.quorum)}
          >
            <QuorumLine
              minimalDiff={Number(proposal.minimumDiff)}
              totalPower={Number(proposal.totalVotingSupply)}
              minimumQuorum={proposal.formattedMinQuorum}
              againstVotes={proposal.formattedAgainstVotes}
              forVotes={proposal.formattedForVotes}
              state={proposal.state}
              withoutTitle={true}
            />
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.participatingAdresses)}
          >
            <p>{(proposal.totalCurrentVoters || 0).toString()}</p>
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.totalPossibleVotes)}
          >
            <Value value={proposal.totalVotingSupply} maximumValueDecimals={2} />
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.voteDifferential)}
          >
            <ValuePercent value={proposal.formattedMinDiff} />
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.currentVoteDifferential)}
          >
            <ValuePercent
              value={
                (Number(proposal.forVotes) - Number(proposal.againstVotes)) /
                10 ** 18 /
                Number(proposal.totalVotingSupply)
              }
            />
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.created)}
            subTitle={intl.formatMessage(messages.block)}
          >
            <div className="ProposalDetails__row-inner">
              <p className="ProposalDetails__started">
                <span>
                  ~ {dayjs.unix(proposal.proposalCreatedTimestamp).format('DD MMM YYYY, hh:mm a')}
                </span>{' '}
              </p>
              <i>{proposal.proposalCreated}</i>
            </div>
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.starting)}
            subTitle={intl.formatMessage(messages.block)}
          >
            <div className="ProposalDetails__row-inner">
              <p className="ProposalDetails__started">
                <span>
                  ~ {dayjs.unix(proposal.proposalActiveTimestamp).format('DD MMM YYYY, hh:mm a')}
                </span>{' '}
              </p>
              <i>{proposal.startBlock}</i>
            </div>
          </Row>

          <ProposalExecutionState />

          {attributes && (
            <>
              {attributes.author && (
                <Row className="ProposalDetails__row" title={intl.formatMessage(messages.author)}>
                  <p>{formatAuthorText(attributes.author)}</p>
                </Row>
              )}

              {attributes.discussions && (
                <Row
                  className="ProposalDetails__row"
                  title={intl.formatMessage(messages.discussions)}
                >
                  <Link
                    to={`${attributes.discussions}`}
                    title={`${attributes.discussions.substring(
                      8,
                      27
                    )}...${attributes.discussions.slice(-3)}`}
                    color="primary"
                    absolute={true}
                    inNewWindow={true}
                  />
                </Row>
              )}
            </>
          )}
        </div>

        <div className="ProposalDetails__bottom-inner">
          <Row className="ProposalDetails__row" title={intl.formatMessage(messages.showPayload)}>
            <DefaultButton
              className="ProposalDetails__button"
              title={intl.formatMessage(messages.view)}
              onClick={() => setShowModalPayload(true)}
              transparent={true}
              disabled={true}
              color="dark"
            />
          </Row>

          <Row
            className="ProposalDetails__row"
            title={intl.formatMessage(messages.showTopAddresses)}
          >
            <DefaultButton
              className="ProposalDetails__button"
              title={intl.formatMessage(messages.view)}
              onClick={() => setShowModalAddresses(true)}
              transparent={true}
              disabled={!showTopVoters}
              color="dark"
            />
          </Row>
        </div>
      </ContentWrapperWithTopLine>

      {!errorTopVotes && !loadingTopVoters && (
        <VoteInfoModal
          isVisible={showModalAddresses}
          onBackdropPress={() => setShowModalAddresses(false)}
          proposal={proposal}
          yesVotes={forTopVotes}
          noVotes={againstTopVotes}
        />
      )}

      <PayloadModal isVisible={showPayload} setVisible={setShowModalPayload}>
        <h1>TODO: need payload info</h1>
      </PayloadModal>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ProposalDetails {
          &__top-inner {
            &:after {
              background: ${currentTheme.textDarkBlue.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
