import React from 'react';
import { useIntl } from 'react-intl';
import { BasicModal } from '@aave/aave-ui-kit';

import Caption from '../basic/Caption';
import Link from '../basic/Link';
import DefaultButton from '../basic/DefaultButton';
import InfoWrapper from './components/InfoWrapper';
import HealthFactor from '../HealthFactor';
import Row from '../basic/Row';
import ValuePercent from '../basic/ValuePercent';
import LTVContent from './components/LTVContent';

import messages from './messages';
import staticStyles from './style';

interface LiquidationRiskParametresInfoModalProps {
  isVisible: boolean;
  onBackdropPress: () => void;
  healthFactor: string;
  loanToValue: string;
  currentLoanToValue: string;
  currentLiquidationThreshold: string;
}

export default function LiquidationRiskParametresInfoModal({
  isVisible,
  onBackdropPress,
  healthFactor,
  loanToValue,
  currentLoanToValue,
  currentLiquidationThreshold,
}: LiquidationRiskParametresInfoModalProps) {
  const intl = useIntl();

  return (
    <BasicModal
      className="LiquidationRiskParametresInfoModal"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      withCloseButton={true}
    >
      <div className="LiquidationRiskParametresInfoModal__content">
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description, {
            link: (
              <Link
                to="https://docs.aave.com/risk/asset-risk/risk-parameters#risk-parameters-analysis"
                title={intl.formatMessage(messages.learnMore)}
                color="secondary"
                absolute={true}
                inNewWindow={true}
              />
            ),
          })}
          onWhiteBackground={true}
        />

        <InfoWrapper
          topContent={
            <HealthFactor
              value={healthFactor}
              withoutModal={true}
              withIcon={true}
              onWhiteBackground={true}
            />
          }
          topText={intl.formatMessage(messages.hfTopInfo)}
          bottomText={intl.formatMessage(messages.hfBottomInfo)}
        >
          <h1>HF Content</h1>
        </InfoWrapper>

        <InfoWrapper
          topContent={
            <Row title={intl.formatMessage(messages.currentLTV)} onWhiteBackground={true}>
              <ValuePercent value={loanToValue} onWhiteBackground={true} />
            </Row>
          }
          topText={intl.formatMessage(messages.ltvTopInfo)}
          bottomText={intl.formatMessage(messages.ltvBottomInfo)}
        >
          <LTVContent
            loanToValue={loanToValue}
            currentLoanToValue={currentLoanToValue}
            currentLiquidationThreshold={currentLiquidationThreshold}
          />
        </InfoWrapper>

        <div className="LiquidationRiskParametresInfoModal__buttonInner">
          <DefaultButton
            title={intl.formatMessage(messages.buttonTitle)}
            size="medium"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onBackdropPress();
            }}
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </BasicModal>
  );
}
