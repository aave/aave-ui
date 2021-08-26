import React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ethers } from 'ethers';
import { canBeEnsAddress } from '@aave/aave-ui-kit';

import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import GovernanceWrapper from '../../components/GovernanceWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Row from '../../../../components/basic/Row';
import Value from '../../../../components/basic/Value';

import messages from './messages';
import GovernanceTxConfirmationView from '../../components/GovernanceTxConfirmationView';

interface QueryParams {
  asset?: string;
  assetAddress?: string;
  assetValue?: string;
  delegationType?: string;
  toAddress?: string;
}

export default function DelegationConfirmation() {
  const intl = useIntl();
  const location = useLocation();

  const { userId } = useStaticPoolDataContext();
  const { powerDelegation } = useGovernanceDataContext();

  const query = queryString.parse(location.search) as QueryParams;

  const asset = query.asset || null;
  const assetAddress = query.assetAddress || null;
  const assetValue = query.assetValue || null;
  const delegationType = query.delegationType || null;
  const toAddress = query.toAddress || null;

  // TODO: need error handler (text for error)
  if (
    !userId ||
    !toAddress ||
    !delegationType ||
    !asset ||
    !assetAddress ||
    !ethers.utils.isAddress(assetAddress) ||
    (!ethers.utils.isAddress(toAddress) && !canBeEnsAddress(toAddress))
  ) {
    return null;
  }

  const handleGetTransactions = async () => {
    return await powerDelegation.delegateByType({
      user: userId,
      delegatee: toAddress,
      delegationType,
      governanceToken: assetAddress,
    });
  };

  return (
    <GovernanceWrapper className="DelegationConfirmation">
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        <GovernanceTxConfirmationView
          caption={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
          mainTxName={intl.formatMessage(messages.delegate)}
          mainTxType={'GOV_DELEGATION_ACTION'}
          boxTitle={intl.formatMessage(messages.delegate)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          approveDescription={intl.formatMessage(messages.approveDescription)}
          goToAfterSuccess="/governance"
          successButtonTitle={intl.formatMessage(messages.successButtonTitle)}
          getTransactionsData={handleGetTransactions}
        >
          <Row title={intl.formatMessage(messages.delegate)} withMargin={true}>
            <Value value={assetValue || '0'} symbol={asset} tokenIcon={true} />
          </Row>

          <Row title={intl.formatMessage(messages.type)} withMargin={true}>
            <p>
              {delegationType === '0'
                ? intl.formatMessage(messages.delegationVotes)
                : intl.formatMessage(messages.delegationProposalPower)}
            </p>
          </Row>

          <Row title={intl.formatMessage(messages.toAddress)}>
            <p style={{ textAlign: 'right', wordBreak: 'break-word' }}>{toAddress}</p>
          </Row>
        </GovernanceTxConfirmationView>
      </ContentWrapper>
    </GovernanceWrapper>
  );
}
