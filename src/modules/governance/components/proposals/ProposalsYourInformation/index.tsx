import React from 'react';
import { useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import { useThemeContext, textCenterEllipsis } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../../libs/pool-data-provider';
import { useProtocolDataContext } from '../../../../../libs/protocol-data-provider';
import { useCurrentVotingPowerRPC } from '../../../../../libs/governance-provider/hooks/use-current-voting-power-rpc';
import ContentWrapperWithTopLine from '../../../../../components/wrappers/ContentWrapperWithTopLine';
import Row from '../../../../../components/basic/Row';
import Preloader from '../../../../../components/basic/Preloader';
import ConnectButton from '../../../../../components/ConnectButton';
import DelegationHelpModal from '../../../../../components/HelpModal/DelegationHelpModal';
import Link from '../../../../../components/basic/Link';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import VoteBalance from '../../VoteBalance';
import { useGovernanceDataContext } from '../../../../../libs/governance-provider';
import { TokenIcon } from '../../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../../images/blueLinkIcon.svg';

export default function ProposalsYourInformation() {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { networkConfig } = useProtocolDataContext();
  const { userId } = useStaticPoolDataContext();
  const { library: provider } = useWeb3React();
  const { governanceService, governanceConfig } = useGovernanceDataContext();

  const {
    loading,
    votingPower,
    propositionPower,
    aaveVotingDelegatee,
    aavePropositionDelegatee,
    stkAaveVotingDelegatee,
    stkAavePropositionDelegatee,
  } = useCurrentVotingPowerRPC(userId || '', governanceService, governanceConfig);

  return (
    <ContentWrapperWithTopLine
      title={intl.formatMessage(messages.yourInformation)}
      className="ProposalsYourInformation"
    >
      {provider ? (
        <div className="ProposalsYourInformation__top-wrapper">
          <Row
            title={intl.formatMessage(messages.yourVotingPower)}
            subTitle={`(${governanceConfig.votingAssetName})`}
          >
            {loading ? <Preloader smallSize={true} /> : <VoteBalance value={+votingPower} />}
          </Row>

          <Row
            title={intl.formatMessage(messages.yourPropositionPower)}
            subTitle={`(${governanceConfig.votingAssetName})`}
          >
            {loading ? <Preloader smallSize={true} /> : <VoteBalance value={+propositionPower} />}
          </Row>

          <Row
            title={<DelegationHelpModal text={intl.formatMessage(messages.delegateYourPower)} />}
          >
            <Link to="/governance/delegation" className="ButtonLink">
              <DefaultButton title={intl.formatMessage(messages.delegate)} color="dark" />
            </Link>
          </Row>
        </div>
      ) : (
        <div className="ProposalsYourInformation__noWallet">
          <p>{intl.formatMessage(messages.noWalletTitle)}</p>
          <ConnectButton size="medium" />
        </div>
      )}

      {provider &&
        (loading ? (
          <div className="ProposalsYourInformation__delegated-items">
            <Preloader smallSize={true} />
          </div>
        ) : (
          <>
            {(!!aavePropositionDelegatee ||
              !!aaveVotingDelegatee ||
              !!stkAavePropositionDelegatee ||
              !!stkAaveVotingDelegatee) && (
              <div className="ProposalsYourInformation__delegated-items">
                <div className="ProposalsYourInformation__delegated-items__title">
                  <p>{intl.formatMessage(messages.yourDelegations)}</p>
                </div>

                <div className="ProposalsYourInformation__delegated-addresses">
                  {!!aavePropositionDelegatee && (
                    <Link
                      to={networkConfig.explorerLinkBuilder({ address: aavePropositionDelegatee })}
                      className="ProposalsYourInformation__delegated-address ButtonLink"
                      color="dark"
                      absolute={true}
                      inNewWindow={true}
                    >
                      <TokenIcon tokenSymbol="AAVE" height={18} width={18} tokenFullName="AAVE" />
                      <p>{intl.formatMessage(messages.propositionPower)}</p>
                      <strong>
                        {textCenterEllipsis(aavePropositionDelegatee.toString(), 5, 5)}
                      </strong>
                      <img src={linkIcon} alt="" className="ProposalsYourInformation__linkIcon" />
                    </Link>
                  )}
                  {!!aaveVotingDelegatee && (
                    <Link
                      to={networkConfig.explorerLinkBuilder({ address: aaveVotingDelegatee })}
                      className="ProposalsYourInformation__delegated-address ButtonLink"
                      color="dark"
                      absolute={true}
                      inNewWindow={true}
                    >
                      <TokenIcon tokenSymbol="AAVE" height={18} width={18} tokenFullName="AAVE" />
                      <p>{intl.formatMessage(messages.votingPower)}</p>
                      <strong>{textCenterEllipsis(aaveVotingDelegatee.toString(), 5, 5)}</strong>
                      <img src={linkIcon} alt="" className="ProposalsYourInformation__linkIcon" />
                    </Link>
                  )}
                </div>

                <div className="ProposalsYourInformation__delegated-addresses">
                  {!!stkAavePropositionDelegatee && (
                    <Link
                      to={networkConfig.explorerLinkBuilder({
                        address: stkAavePropositionDelegatee,
                      })}
                      className="ProposalsYourInformation__delegated-address ButtonLink"
                      color="dark"
                      absolute={true}
                      inNewWindow={true}
                    >
                      <TokenIcon
                        tokenSymbol="stkAAVE"
                        height={18}
                        width={18}
                        tokenFullName="StkAAVE"
                      />
                      <p>{intl.formatMessage(messages.propositionPower)}</p>
                      <strong>
                        {textCenterEllipsis(stkAavePropositionDelegatee.toString(), 5, 5)}
                      </strong>
                      <img src={linkIcon} alt="" className="ProposalsYourInformation__linkIcon" />
                    </Link>
                  )}
                  {!!stkAaveVotingDelegatee && (
                    <Link
                      to={networkConfig.explorerLinkBuilder({
                        address: stkAaveVotingDelegatee,
                      })}
                      className="ProposalsYourInformation__delegated-address ButtonLink"
                      color="dark"
                      absolute={true}
                      inNewWindow={true}
                    >
                      <TokenIcon
                        tokenSymbol="stkAAVE"
                        height={18}
                        width={18}
                        tokenFullName="StkAAVE"
                      />
                      <p>{intl.formatMessage(messages.votingPower)}</p>
                      <strong>{textCenterEllipsis(stkAaveVotingDelegatee.toString(), 5, 5)}</strong>
                      <img src={linkIcon} alt="" className="ProposalsYourInformation__linkIcon" />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        ))}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .ProposalsYourInformation {
          color: ${currentTheme.textDarkBlue.hex};

          &__top-wrapper {
            .Row {
              &:nth-of-type(2) {
                border-bottom: 1px solid ${currentTheme.lightBlue.hex};
              }
            }
          }

          &__delegated-items {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__delegated-address {
            background: ${currentTheme.whiteItem.hex};
            color: ${currentTheme.textDarkBlue.hex} !important;
            &:hover {
              strong {
                color: ${currentTheme.primary.hex};
              }
            }
          }
        }
      `}</style>
    </ContentWrapperWithTopLine>
  );
}
