import React from 'react';
import { useIntl } from 'react-intl';
import { BasicModal, useThemeContext } from '@aave/aave-ui-kit';

import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { getAssetInfo, TokenIcon } from '../../../helpers/config/assets-config';
import Caption from '../../basic/Caption';
import DefaultButton from '../../basic/DefaultButton';
import Row from '../../basic/Row';
import ValuePercent from '../../basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';
import { ReserveIncentiveResponse } from '../../../libs/pool-data-provider/hooks/use-incentives-data';

interface IncentivesInfoModalProps {
  isVisible: boolean;
  setVisible: (value: boolean) => void;
  incentives: ReserveIncentiveResponse[];
  incentivesNetAPR: 'Infinity' | number;
  symbol: string;
}

export default function IncentivesInfoModal({
  isVisible,
  setVisible,
  incentives,
  incentivesNetAPR,
  symbol,
}: IncentivesInfoModalProps) {
  const intl = useIntl();
  const { currentMarket } = useProtocolDataContext();
  const { currentTheme } = useThemeContext();

  console.log();

  return (
    <BasicModal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
      className="IncentivesInfoModal"
      withCloseButton={true}
    >
      <div className="IncentivesInfoModal__content">
        <Caption
          title={intl.formatMessage(messages.caption, {
            marketName: currentMarket
              .split('_')
              .map((name) => <span className="IncentivesInfoModal__marketName">{name} </span>),
          })}
          description={intl.formatMessage(messages.description, { symbol })}
          onWhiteBackground={true}
          marginBottom={20}
        />

        <div className="IncentivesInfoModal__info">
          {incentives.length > 1 && (
            <div className="IncentivesInfoModal__netAPR--inner">
              <Row title={intl.formatMessage(messages.netAPR)} onWhiteBackground={true}>
                {incentivesNetAPR !== 'Infinity' ? (
                  <div className="IncentivesInfoModal__valueInner">
                    <ValuePercent
                      value={incentivesNetAPR / 100}
                      color="dark"
                      onWhiteBackground={true}
                    />
                    <p className="IncentivesInfoModal__text-apr">
                      {intl.formatMessage(messages.apr)}
                    </p>
                  </div>
                ) : (
                  <div className="IncentivesInfoModal__valueInner">
                    <strong className="IncentivesInfoModal__infinity">∞</strong>
                    <p className="IncentivesInfoModal__text-apr">
                      % {intl.formatMessage(messages.apr)}
                    </p>
                  </div>
                )}
              </Row>
            </div>
          )}

          <div className="IncentivesInfoModal__incentives">
            {incentives.map((incentive) => {
              const asset = getAssetInfo(incentive.rewardTokenSymbol);

              return (
                <Row
                  title={
                    <TokenIcon
                      tokenSymbol={asset.symbol}
                      height={16}
                      width={16}
                      withTokenSymbol={true}
                      tokenFullName={asset.formattedName}
                      onWhiteBackground={true}
                    />
                  }
                  withMargin={true}
                  onWhiteBackground={true}
                  key={incentive.rewardTokenAddress}
                >
                  {incentive.incentiveAPR !== 'Infinity' ? (
                    <div className="IncentivesInfoModal__valueInner">
                      <ValuePercent
                        value={+incentive.incentiveAPR}
                        color="dark"
                        onWhiteBackground={true}
                      />
                      <p className="IncentivesInfoModal__text-apr">
                        {intl.formatMessage(messages.apr)}
                      </p>
                    </div>
                  ) : (
                    <div className="IncentivesInfoModal__valueInner">
                      <strong className="IncentivesInfoModal__infinity">∞</strong>
                      <p className="IncentivesInfoModal__text-apr">
                        % {intl.formatMessage(messages.apr)}
                      </p>
                    </div>
                  )}
                </Row>
              );
            })}
          </div>
        </div>

        <div className="IncentivesInfoModal__buttonInner">
          <DefaultButton
            title={intl.formatMessage(messages.buttonTitle)}
            size="medium"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              setVisible(false);
            }}
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .IncentivesInfoModal {
          &__info {
            border: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__netAPR--inner {
            border-bottom: 1px solid ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
