import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { TwitterShareButton } from 'react-share';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useVotingPowerLoader } from '../../../../../libs/governance-provider/hooks/use-voting-power-rpc';
import { useStaticPoolDataContext } from '../../../../../libs/pool-data-provider';
import { getLink } from '../../../../../libs/governance-provider/helper';
import ScreenWrapper from '../../../../../components/wrappers/ScreenWrapper';
import Link from '../../../../../components/basic/Link';
import Preloader from '../../../../../components/basic/Preloader';
import CircleBackButton from '../../../../../components/CircleBackButton';
import LabeledSwitcher from '../../../../../components/basic/LabeledSwitcher';

import { useProposalDataContext } from '../../../screens/Proposal';
import ProposalVoteBar from '../ProposalVoteBar';
import VotingInformation from '../VotingInformation';
import ProposalDetails from '../ProposalDetails';

import messages from './messages';
import staticStyles from './style';

import downloadIcon from './images/download.svg';
import mobileDownloadIcon from './images/mobileDownloadIcon.svg';
import twitterIcon from './images/twitter.svg';
import arrowIconWhite from '../../../../../images/arrowIconWhite.svg';
import { useGovernanceDataContext } from '../../../../../libs/governance-provider';

interface ProposalWrapperProps {
  children: ReactNode;
  isSidePanelVisibleOnMobile: boolean;
}

export default function ProposalWrapper({
  children,
  isSidePanelVisibleOnMobile,
}: ProposalWrapperProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();
  const { userId } = useStaticPoolDataContext();
  const { governanceService } = useGovernanceDataContext();
  const location = useLocation();

  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const { proposal, parsedBody, proposalHash, loading, voteData, voteDataLoading } =
    useProposalDataContext();

  const { loading: loadingPower, power } = useVotingPowerLoader(
    proposal?.startBlock,
    proposal?.strategy,
    governanceService,
    userId
  );

  useEffect(() => {
    setIsDetailsVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sm]);

  const isLeaderboard = location.pathname.split('/').some((item) => item === 'board');
  const aipNumber = parsedBody?.attributes?.aip || 0;

  return (
    <ScreenWrapper
      className={classNames('ProposalWrapper', { ProposalWrapper__leaderboard: isLeaderboard })}
      pageTitle={intl.formatMessage(messages.pageTitle)}
      withMobileGrayBg={isLeaderboard || location.pathname.split('/').length <= 3}
      titleComponent={
        <div className="ProposalWrapper__caption">
          <CircleBackButton className="ProposalWrapper__back-button" icon={arrowIconWhite} />

          <p className="ProposalWrapper__title">
            {isLeaderboard
              ? intl.formatMessage(messages.leaderboard, {
                  details: `AIP ${aipNumber < 10 ? `0${aipNumber}` : aipNumber}: ${
                    proposal?.title
                  }`,
                })
              : intl.formatMessage(messages.title)}
          </p>

          {!loading && !isLeaderboard && (
            <>
              <Link
                className="ProposalWrapper__download"
                to={`${getLink(proposalHash)}`}
                absolute={true}
                inNewWindow={true}
                color="white"
              >
                <p>
                  <img src={downloadIcon} alt="" />
                  <span>{intl.formatMessage(messages.download)}</span>
                </p>
              </Link>

              <TwitterShareButton
                url={window.location.href}
                title={`${proposal?.title}:`}
                className="ProposalWrapper__shared-button"
              >
                <p>
                  {intl.formatMessage(messages.shareOnTwitter)} <img src={twitterIcon} alt="" />
                </p>
              </TwitterShareButton>
            </>
          )}
        </div>
      }
      isTitleOnDesktop={true}
    >
      {!!proposal ? (
        <div
          className={classNames('ProposalWrapper__wrapper', {
            ProposalWrapper__wrapperLeaderboard: isLeaderboard,
          })}
        >
          {isSidePanelVisibleOnMobile && (
            <div className="ProposalWrapper__switcher">
              <LabeledSwitcher
                value={isDetailsVisible}
                leftOption={intl.formatMessage(messages.proposal)}
                rightOption={intl.formatMessage(messages.details)}
                onToggle={setIsDetailsVisible}
              />
            </div>
          )}

          {isSidePanelVisibleOnMobile && sm && !isDetailsVisible && (
            <VotingInformation
              userId={userId}
              proposal={proposal}
              votingPower={power}
              voteData={voteData}
              loading={voteDataLoading || loadingPower}
            />
          )}

          {(isSidePanelVisibleOnMobile || !sm) && (
            <div
              className={classNames('ProposalWrapper__inner', {
                ProposalWrapper__innerHidden: isSidePanelVisibleOnMobile && isDetailsVisible,
              })}
            >
              <div className="ProposalWrapper__inner-right ProposalWrapper__voteBars">
                <ProposalVoteBar
                  currentYesVote={Number(proposal.formattedForVotes)}
                  currentNoVote={Number(proposal.formattedAgainstVotes)}
                  isLeaderboard={isLeaderboard}
                />
              </div>

              {!isLeaderboard && <div className="ProposalWrapper__inner-left" />}
            </div>
          )}

          {!isLeaderboard ? (
            <div className="ProposalWrapper__inner">
              <div
                className={classNames('ProposalWrapper__inner-right', {
                  ProposalWrapper__innerHidden: isSidePanelVisibleOnMobile && isDetailsVisible,
                  ProposalWrapper__block: location.pathname.split('/').length <= 3,
                })}
              >
                {!loading && isSidePanelVisibleOnMobile && (
                  <div className="ProposalWrapper__mobileInfo">
                    <Link
                      className="ProposalWrapper__download"
                      to={`${getLink(proposalHash)}`}
                      absolute={true}
                      inNewWindow={true}
                      color="dark"
                    >
                      <p>
                        <img src={isCurrentThemeDark ? downloadIcon : mobileDownloadIcon} alt="" />
                        <span>{intl.formatMessage(messages.download)}</span>
                      </p>
                    </Link>

                    <TwitterShareButton
                      url={window.location.href}
                      title={`${proposal.title}:`}
                      className="ProposalWrapper__shared-button"
                    >
                      <p>
                        {intl.formatMessage(messages.shareOnTwitter)}{' '}
                        <img src={twitterIcon} alt="" />
                      </p>
                    </TwitterShareButton>
                  </div>
                )}

                <div className="ProposalWrapper__content">{children}</div>
              </div>

              {(isSidePanelVisibleOnMobile || !sm) && (
                <div
                  className={classNames('ProposalWrapper__inner-left ProposalWrapper__sidePanel', {
                    ProposalWrapper__sidePanelVisible: isDetailsVisible,
                  })}
                >
                  {!sm && (
                    <VotingInformation
                      userId={userId}
                      proposal={proposal}
                      votingPower={power}
                      voteData={voteData}
                      loading={voteDataLoading || loadingPower}
                    />
                  )}

                  <ProposalDetails proposal={proposal} attributes={parsedBody?.attributes} />
                </div>
              )}
            </div>
          ) : (
            children
          )}
        </div>
      ) : (
        <Preloader withText={true} />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        @import 'src/_mixins/screen-size';

        .ProposalWrapper {
          &__content {
            background: ${currentTheme.whiteElement.hex};
          }

          .ProposalWrapper__shared-button {
            @include respond-to(sm) {
              p {
                color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }
        }
      `}</style>
    </ScreenWrapper>
  );
}
