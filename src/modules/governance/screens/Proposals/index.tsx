import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { ProposalState } from '@aave/protocol-js';
import { useWeb3React } from '@web3-react/core';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import NoDataPanel from '../../../../components/NoDataPanel';
import ContentWrapperWithTopLine from '../../../../components/wrappers/ContentWrapperWithTopLine';
import Link from '../../../../components/basic/Link';

import GovernanceWrapper from '../../components/GovernanceWrapper';
import ProposalsYourInformation from '../../components/proposals/ProposalsYourInformation';
import ProposalsItem from '../../components/proposals/ProposalsItem';
import ProposalsFilter from '../../components/proposals/ProposalsFilter';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/linkIcon.svg';

export default function Proposals() {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { chainId } = useWeb3React();

  const [status, setStatus] = useState<ProposalState | undefined>();
  const { proposals, governanceConfig } = useGovernanceDataContext();

  let shownProposals = status
    ? proposals.filter((proposal) => proposal.state === status)
    : proposals;

  shownProposals.sort((a, b) => b.id - a.id);

  const linkWithIcon = (link: string, color: 'dark' | 'white', title: string) => (
    <Link to={link} color={color} inNewWindow={true} absolute={true} onWhiteBackground={sm}>
      <span>{title}</span>
      <img src={linkIcon} alt="" />
    </Link>
  );

  const isDifferentNetwork = chainId === 1 || chainId === undefined;

  return (
    <GovernanceWrapper className="Proposals">
      <div
        className={classNames('Proposals__mobileLinks-inner', {
          Proposals__mobileLinksWithWarning: !isDifferentNetwork,
        })}
      >
        {linkWithIcon(
          governanceConfig.governanceSnapshotLink,
          'dark',
          intl.formatMessage(messages.visitSnapshots)
        )}
        {linkWithIcon(
          governanceConfig.governanceForumLink,
          'dark',
          intl.formatMessage(messages.visitForum)
        )}
        {linkWithIcon(
          governanceConfig.governanceFAQLink,
          'dark',
          intl.formatMessage(messages.governanceFAQ)
        )}
      </div>

      <div className="Proposals__content">
        <div className="Proposals__content-left-inner">
          <ProposalsYourInformation />
        </div>

        <div
          className={classNames('Proposals__content-right-inner', {
            Proposals__contentNoData: !shownProposals.length,
          })}
        >
          <ContentWrapperWithTopLine
            title={intl.formatMessage(messages.proposals)}
            topRightInfo={
              <div className="Proposals__content-links">
                {linkWithIcon(
                  governanceConfig.governanceSnapshotLink,
                  'white',
                  intl.formatMessage(messages.visitSnapshots)
                )}
                {linkWithIcon(
                  governanceConfig.governanceForumLink,
                  'white',
                  intl.formatMessage(messages.visitForum)
                )}
                {linkWithIcon(
                  governanceConfig.governanceFAQLink,
                  'white',
                  intl.formatMessage(messages.governanceFAQ)
                )}
              </div>
            }
            className="Proposals__inner"
          >
            <ProposalsFilter proposals={proposals} status={status} setStatus={setStatus} />

            {!!shownProposals.length ? (
              shownProposals.map((proposal) => (
                <ProposalsItem proposal={proposal} key={proposal.id} />
              ))
            ) : (
              <NoDataPanel
                title={intl.formatMessage(!status ? messages.noProposals : messages.noDataCaption)}
              />
            )}
          </ContentWrapperWithTopLine>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .Proposals {
          &__mobileLinks-inner {
            background: ${currentTheme.white.hex};
          }
        }
      `}</style>
    </GovernanceWrapper>
  );
}
