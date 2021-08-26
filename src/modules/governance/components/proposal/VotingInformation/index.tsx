import React from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { ProposalItem, Vote } from '../../../../../libs/governance-provider/types';
import ContentWrapperWithTopLine from '../../../../../components/wrappers/ContentWrapperWithTopLine';
import ConnectButton from '../../../../../components/ConnectButton';
import Preloader from '../../../../../components/basic/Preloader';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import Row from '../../../../../components/basic/Row';
import VoteBalance from '../../VoteBalance';
import Link from '../../../../../components/basic/Link';
import VotingPowerCalculatedHelpModal from '../../../../../components/HelpModal/VotingPowerCalculatedHelpModal';

import messages from './messages';
import staticStyles from './style';

enum VoteTypes {
  YES = 'yes',
  NO = 'no',
}

interface VotingInformationProps {
  userId?: string;
  proposal: ProposalItem;
  voteData?: Vote;
  loading: boolean;
  votingPower: string;
}

export default function VotingInformation({
  userId,
  proposal,
  voteData,
  loading,
  votingPower,
}: VotingInformationProps) {
  const intl = useIntl();
  const location = useLocation();
  const { currentTheme } = useThemeContext();

  const timeNowInSeconds = Math.floor(Date.now() / 1000);
  const assetSymbol = 'AAVE + stkAAVE';

  const disabledButton = (path: string) => location.pathname === path;

  const voteButtons = () => {
    if (votingPower === '0' || votingPower === '0.0') {
      return (
        <div className="VotingInformation__noInner">
          <p className="VotingInformation__orange">
            {intl.formatMessage(messages.invalidVoteBalance, {
              symbol: <strong>AAVE or StkAAVE</strong>,
            })}
          </p>
        </div>
      );
    } else {
      return (
        <div className="VotingInformation__buttons-inner">
          <Row
            title={
              <VotingPowerCalculatedHelpModal
                text={intl.formatMessage(messages.availableVotingPower)}
              />
            }
            subTitle={`(${assetSymbol})`}
            className="VoteButtons__row"
            withMargin={true}
          >
            <VoteBalance value={+votingPower} />
          </Row>

          <div className="VotingInformation__buttons">
            <Link
              to={`/governance/${proposal.id}-${proposal.ipfsHash}/yes`}
              className="ButtonLink"
              disabled={disabledButton(`/governance/${proposal.id}-${proposal.ipfsHash}/yes`)}
            >
              <DefaultButton
                title={intl.formatMessage(messages.yes)}
                color="green"
                disabled={disabledButton(`/governance/${proposal.id}-${proposal.ipfsHash}/yes`)}
              />
            </Link>

            <Link
              to={`/governance/${proposal.id}-${proposal.ipfsHash}/no`}
              className="ButtonLink"
              disabled={disabledButton(`/governance/${proposal.id}-${proposal.ipfsHash}/no`)}
            >
              <DefaultButton
                title={intl.formatMessage(messages.no)}
                color="red"
                disabled={disabledButton(`/governance/${proposal.id}-${proposal.ipfsHash}/no`)}
              />
            </Link>
          </div>
        </div>
      );
    }
  };

  const votedButtons = (type: VoteTypes) => {
    return (
      <div className="VotingInformation__voted">
        <div className="VotingInformation__voted-top">
          <p
            className={classNames(
              type === VoteTypes.YES ? 'VoteButtons__voted-yes' : 'VoteButtons__voted-no'
            )}
          >
            {intl.formatMessage(messages.youVoted)}
            <span>{intl.formatMessage(type === VoteTypes.YES ? messages.yes : messages.no)}</span>
          </p>
        </div>

        {votingPower && (
          <Row title={intl.formatMessage(messages.amount)} subTitle={`(${assetSymbol})`}>
            <div className="VotingInformation__vote-amount">
              {intl.formatNumber(+votingPower, { maximumFractionDigits: 3 })}
            </div>
          </Row>
        )}
      </div>
    );
  };

  const voteButtonsWrapper = () => {
    if (userId) {
      if (!loading) {
        if (voteData && voteData.id !== '') {
          // the users votes yes / no
          return votedButtons(voteData?.support ? VoteTypes.YES : VoteTypes.NO);
        } else {
          if (proposal.proposalExpirationTimestamp < timeNowInSeconds) {
            return (
              <div className="VotingInformation__noInner">
                <p>{intl.formatMessage(messages.notParticipate)}</p>
              </div>
            );
          } else {
            // vote abstain or no vote yet
            return voteButtons();
          }
        }
      } else {
        return <Preloader smallSize={true} />;
      }
    } else {
      return (
        <div className="VotingInformation__noWallet">
          <p className="VotingInformation__noWallet-title">
            {intl.formatMessage(messages.noWalletTitle)}
          </p>
          <ConnectButton size="medium" />
        </div>
      );
    }
  };

  return (
    <ContentWrapperWithTopLine
      title={intl.formatMessage(messages.title)}
      className="VotingInformation"
    >
      {voteButtonsWrapper()}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .VotingInformation {
          color: ${currentTheme.textDarkBlue.hex};

          &__orange {
            color: ${currentTheme.orange.hex};
          }

          &__voted-top {
            p {
              span {
                color: ${currentTheme.white.hex};
              }
            }
            .VoteButtons__voted-yes {
              span {
                background: ${currentTheme.green.hex};
              }
            }
            .VoteButtons__voted-no {
              span {
                background: ${currentTheme.red.hex};
              }
            }
          }
        }
      `}</style>
    </ContentWrapperWithTopLine>
  );
}
