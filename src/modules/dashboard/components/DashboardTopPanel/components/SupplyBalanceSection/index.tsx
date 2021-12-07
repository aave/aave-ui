import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import BalanceSectionWrapper from '../BalanceSectionWrapper';
import Row from '../../../../../../components/basic/Row';
import Value from '../../../../../../components/basic/Value';
import IsolatedBadge from '../../../../../../components/isolationMode/IsolatedBadge';

import messages from './messages';
import staticStyles from './style';

interface SupplyBalanceSectionProps {
  isCollapse: boolean;
  balance: number | string;
  collateralUSD: number | string;
  isUserInIsolationMode?: boolean;
}

export default function SupplyBalanceSection({
  isCollapse,
  balance,
  collateralUSD,
  isUserInIsolationMode,
}: SupplyBalanceSectionProps) {
  const intl = useIntl();
  const { md, sm, lg } = useThemeContext();

  return (
    <>
      <BalanceSectionWrapper
        className={isUserInIsolationMode ? 'SupplyBalanceSection__withIsolatedBadge' : undefined}
        isCollapse={isCollapse}
        title={intl.formatMessage(messages.supplyBalance)}
        value={balance}
        children={
          !isCollapse || (md && !sm && !isCollapse) ? (
            <>
              {md ? (
                <Row
                  className="SupplyBalanceSection__row"
                  title={intl.formatMessage(messages.usedAsCollateral)}
                  isColumn={lg && !md}
                  color="white"
                  weight="light"
                >
                  <div className="SupplyBalanceSection__rowContent">
                    <Value
                      value={collateralUSD}
                      symbol="USD"
                      maximumValueDecimals={2}
                      tokenIcon={true}
                      withoutSymbol={true}
                      color="white"
                    />

                    {isUserInIsolationMode && <IsolatedBadge isWhite={true} />}
                  </div>
                </Row>
              ) : (
                <div className="SupplyBalanceSection__content">
                  <Row
                    className="SupplyBalanceSection__row"
                    title={intl.formatMessage(messages.usedAsCollateral)}
                    isColumn={lg && !md}
                    color="white"
                    weight="light"
                  >
                    <Value
                      value={collateralUSD}
                      symbol="USD"
                      maximumValueDecimals={2}
                      tokenIcon={true}
                      withoutSymbol={true}
                      color="white"
                    />
                  </Row>

                  {isUserInIsolationMode && <IsolatedBadge isWhite={true} />}
                </div>
              )}
            </>
          ) : undefined
        }
      />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </>
  );
}
