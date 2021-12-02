import { useIntl } from 'react-intl';
import { useLocation } from 'react-router';
import { Pool } from '@aave/contract-helpers';
import { formatUserSummary } from '@aave/math-utils';

import {
  useDynamicPoolDataContext,
  useStaticPoolDataContext,
} from '../../../../libs/pool-data-provider';
import { useTxBuilderContext } from '../../../../libs/tx-provider';
import { getEmodeMessage } from '../../../../ui-config/branding/DashboardLeftTopLine';
import { useCurrentTimestamp } from '../../../../libs/pool-data-provider/hooks/use-current-timestamp';
import Row from '../../../../components/basic/Row';
import PoolTxConfirmationView from '../../../../components/PoolTxConfirmationView';
import HealthFactor from '../../../../components/HealthFactor';
import ScreenWrapper from '../../../../components/wrappers/ScreenWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';

import messages from './messages';

export function EModeConfirm() {
  const intl = useIntl();
  const { marketRefPriceInUsd, marketRefCurrencyDecimals, rawUserReserves, userEmodeCategoryId } =
    useStaticPoolDataContext();
  const { user } = useDynamicPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const location = useLocation();

  const newEMode = Number(location.pathname.split('/')[3]);

  const newSummary = formatUserSummary({
    currentTimestamp,
    marketRefPriceInUsd,
    marketRefCurrencyDecimals,
    rawUserReserves: rawUserReserves ? rawUserReserves : [],
    userEmodeCategoryId: newEMode,
  });
  const oldHealthFactor = user ? user.healthFactor : '0';
  const newHealthFactor = newSummary.healthFactor;

  const handleGetTransactions = async () => {
    const newPool: Pool = lendingPool as Pool;
    if (eModeEnabled) {
      return await newPool.setUserEMode({
        user: user ? user.id : '',
        categoryId: 0,
      });
    } else {
      return await newPool.setUserEMode({
        user: user ? user.id : '',
        categoryId: newEMode,
      });
    }
  };

  const eModeEnabled = userEmodeCategoryId !== 0;
  const mainText = eModeEnabled
    ? intl.formatMessage(messages.disableEmode)
    : intl.formatMessage(messages.enableEmode);

  return (
    <ScreenWrapper pageTitle={mainText} isTitleOnDesktop={true} withMobileGrayBg={true}>
      <ContentWrapper withBackButton={true} withFullHeight={true}>
        <PoolTxConfirmationView
          caption={mainText}
          mainTxName={mainText}
          description={intl.formatMessage(messages.description)}
          boxTitle={mainText}
          boxDescription={
            eModeEnabled
              ? intl.formatMessage(messages.pleaseSubmitDisable)
              : intl.formatMessage(messages.pleaseSubmitEnable)
          }
          goToAfterSuccess="/dashboard"
          getTransactionsData={handleGetTransactions}
        >
          <Row title={intl.formatMessage(messages.category)} withMargin={true}>
            {getEmodeMessage(newEMode, intl)}
          </Row>

          <HealthFactor
            title={intl.formatMessage(messages.currentHealthFactor)}
            value={oldHealthFactor}
            titleColor="dark"
          />

          <HealthFactor
            title={intl.formatMessage(messages.nextHealthFactor)}
            withoutModal={true}
            value={newHealthFactor}
            titleColor="dark"
          />
        </PoolTxConfirmationView>
      </ContentWrapper>
    </ScreenWrapper>
  );
}
