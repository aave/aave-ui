import React from 'react';
import { useIntl } from 'react-intl';

import { useTxBuilderContext } from '../../../../libs/tx-provider';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import routeParamValidationHOC, {
  ValidationWrapperComponentProps,
} from '../../../../components/RouteParamsValidationWrapper';
import Row from '../../../../components/basic/Row';
import NoDataPanel from '../../../../components/NoDataPanel';
import { getAssetInfo } from '../../../../helpers/config/assets-config';

import messages from './messages';

function FaucetConfirmation({
  currencySymbol,
  poolReserve,
  user,
}: ValidationWrapperComponentProps) {
  const intl = useIntl();
  const { faucetService } = useTxBuilderContext();

  const asset = getAssetInfo(currencySymbol);

  if (!user) {
    return (
      <NoDataPanel
        title={intl.formatMessage(messages.connectWallet)}
        description={intl.formatMessage(messages.connectWalletDescription)}
        withConnectButton={true}
      />
    );
  }

  const handleGetTransactions = async () =>
    await faucetService.mint({
      userAddress: user.id,
      tokenSymbol: poolReserve.symbol,
      reserve: poolReserve.underlyingAsset,
    });

  return (
    <ScreenWrapper
      pageTitle={intl.formatMessage(messages.pageTitle, {
        currencySymbol: asset.formattedName,
      })}
      isTitleOnDesktop={true}
    >
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        <PoolTxConfirmationView
          mainTxName={intl.formatMessage(messages.txName)}
          caption={intl.formatMessage(messages.caption, {
            currencySymbol: asset.formattedName,
          })}
          boxTitle={intl.formatMessage(messages.boxTitle)}
          boxDescription={intl.formatMessage(messages.boxDescription)}
          getTransactionsData={handleGetTransactions}
          mainTxType="FAUCET_MINT"
          goToAfterSuccess="/deposit"
          successButtonTitle={intl.formatMessage(messages.successButtonTitle)}
        >
          <Row title={intl.formatMessage(messages.rowTitle)}>
            <strong style={{ color: `${asset.color}` }}>{asset.formattedName}</strong>
          </Row>
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}

export default routeParamValidationHOC({})(FaucetConfirmation);
