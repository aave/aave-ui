import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Row from '../../../../components/basic/Row';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Value from '../../../../components/basic/Value';
import HealthFactor from '../../../../components/HealthFactor';
import MaxLTVHelpModal from '../../../../components/HelpModal/MaxLTVHelpModal';
import ValuePercent from '../../../../components/basic/ValuePercent';
import RepayWithdrawWrapper from '../../../../components/wrappers/RepayWithdrawWrapper';
import CollateralCompositionBar from '../../../../components/compositionBars/CollateralCompositionBar';
import { isAssetStable } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

interface WithdrawScreenWrapperProps {
  title: string;
  currencySymbol: string;
  balanceInProtocol: string;
  balanceInProtocolInUSD: string;
  healthFactor: string;
  loanToValue: string;
  children: ReactNode;
}

export default function WithdrawScreenWrapper({
  title,
  currencySymbol,
  balanceInProtocol,
  balanceInProtocolInUSD,
  healthFactor,
  loanToValue,
  children,
}: WithdrawScreenWrapperProps) {
  const intl = useIntl();
  const { lg, md, sm } = useThemeContext();

  return (
    <>
      <RepayWithdrawWrapper className="WithdrawScreenWrapper" title={title}>
        <Row title={intl.formatMessage(messages.balanceInAave)} color="white" weight="light">
          <Value
            value={Number(balanceInProtocol)}
            subValue={Number(balanceInProtocolInUSD)}
            color="white"
            symbol={currencySymbol}
            subSymbol="USD"
            maximumValueDecimals={isAssetStable(currencySymbol) ? 4 : 18}
            minimumValueDecimals={isAssetStable(currencySymbol) ? 4 : 17}
            maximumSubValueDecimals={2}
            minimumSubValueDecimals={2}
          />
        </Row>
        <HealthFactor
          className={classNames({ WithdrawScreenWrapper__healthFactor: !sm })}
          value={healthFactor}
          titleColor="white"
          titleLightWeight={true}
          isColumn={!sm}
        />
        <Row
          title={
            <MaxLTVHelpModal
              text={intl.formatMessage(messages.loanToValue)}
              color="white"
              lightWeight={true}
            />
          }
          color="white"
          weight="light"
          isColumn={!sm}
        >
          <ValuePercent value={loanToValue} color="white" />
        </Row>

        <CollateralCompositionBar isColumn={(lg && !md) || sm} />
      </RepayWithdrawWrapper>

      <ContentWrapper withFullHeight={true} withBackButton={true}>
        {children}
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
