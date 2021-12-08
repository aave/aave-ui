import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import BalanceSectionWrapper from '../BalanceSectionWrapper';
import Row from '../../../../../../components/basic/Row';
import Value from '../../../../../../components/basic/Value';
import IsolatedBadge from '../../../../../../components/isolationMode/IsolatedBadge';

import messages from './messages';
import staticStyles from './style';

interface DepositBalanceSectionProps {
  isCollapse: boolean;
  balance: number | string;
  collateralUSD: number | string;
  isUserInIsolationMode?: boolean;
}

export default function DepositBalanceSection({
  isCollapse,
  balance,
  collateralUSD,
  isUserInIsolationMode,
}: DepositBalanceSectionProps) {
  const intl = useIntl();
  const { md, sm, lg } = useThemeContext();

  return (
    <>
      <BalanceSectionWrapper
        className={isUserInIsolationMode ? 'DepositBalanceSection__withIsolatedBadge' : undefined}
        isCollapse={isCollapse}
        title={intl.formatMessage(messages.depositBalance)}
        value={balance}
        children={
          !isCollapse || (md && !sm && !isCollapse) ? (
            <>
              {md ? (
                <Row
                  className="DepositBalanceSection__row"
                  title={intl.formatMessage(messages.usedAsCollateral)}
                  isColumn={lg && !md}
                  color="white"
                  weight="light"
                >
                  <div className="DepositBalanceSection__rowContent">
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
                <div className="DepositBalanceSection__content">
                  <Row
                    className="DepositBalanceSection__row"
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
