import React, { ReactNode } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { rgba, useThemeContext, BasicModal } from '@aave/aave-ui-kit';

import Caption from '../../../../components/basic/Caption';
import Row from '../../../../components/basic/Row';
import Link from '../../../../components/basic/Link';
import Value from '../../../../components/basic/Value';
import BorrowContent from './BorrowContent';
import StateChangesContent from './StateChangesContent';
import LiquidationContent from './LiquidationContent';
import { getAssetInfo, TokenIcon } from '../../../../helpers/config/assets-config';
import { HistoryItemTypes } from '../../types';

import messages from './messages';
import staticStyles from './style';

import linkIcon from '../../../../images/linkIcon.svg';

interface HistoryModalProps {
  data: HistoryItemTypes;
  title?: string;
  isVisible: boolean;
  onBackdropPress: () => void;
}

export default function HistoryModal({
  data,
  title,
  isVisible,
  onBackdropPress,
}: HistoryModalProps) {
  const intl = useIntl();
  const { currentTheme, xl, md } = useThemeContext();

  const contentBorderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.2`);

  let description: MessageDescriptor | undefined = undefined;
  let childComponent: ReactNode | undefined = undefined;

  switch (data.type) {
    case 'Deposit':
      description = messages.depositDescription;
      break;
    case 'Borrow':
      description = messages.borrowedDescription;
      childComponent = data.borrowRate && data.borrowRateMode && (
        <BorrowContent borrowRate={Number(data.borrowRate)} borrowRateMode={data.borrowRateMode} />
      );
      break;
    case 'RedeemUnderlying':
      description = messages.withdrawalDescription;
      break;
    case 'Repay':
      description = messages.repaidDescription;
      break;
    case 'Swap':
      description = messages.APYTypeChangeDescription;
      childComponent = <StateChangesContent type={data.type} condition={data.condition} />;
      break;
    case 'UsageAsCollateral':
      description = messages.usageOfCollateralDescription;
      childComponent = <StateChangesContent type={data.type} condition={data.condition} />;
      break;
    case 'LiquidationCall':
      description = messages.liquidationDescription;
      childComponent = data.type === 'LiquidationCall' &&
        data.collateralAmount &&
        data.collateralAmountSymbol && (
          <LiquidationContent
            value={Number(data.collateralAmount)}
            symbol={data.collateralAmountSymbol}
          />
        );
      break;
  }

  const amountTitle =
    data.type === 'LiquidationCall' ? messages.liquidationAmount : messages.amount;

  return (
    <BasicModal
      className="HistoryModal"
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      withCloseButton={true}
    >
      <div className="HistoryModal__wrapper">
        {title && description && (
          <Caption
            title={title}
            description={intl.formatMessage(description)}
            marginBottom={xl && !md ? 15 : 20}
            onWhiteBackground={true}
          />
        )}

        <div className="HistoryModal__content">
          <Row title={intl.formatMessage(messages.date)} withMargin={true} onWhiteBackground={true}>
            <p className="HistoryModal__text HistoryModal__date">
              <span>{dayjs.unix(data.date).format('L')}</span>
              <span>{dayjs.unix(data.date).format('LT')}</span>
            </p>
          </Row>

          {(data.type === 'Swap' || data.type === 'UsageAsCollateral') && data.symbol && (
            <Row
              title={intl.formatMessage(messages.asset)}
              withMargin={true}
              onWhiteBackground={true}
            >
              <div className="HistoryModal__asset-line">
                <TokenIcon tokenSymbol={data.symbol} height={20} width={20} />
                <span>
                  {getAssetInfo(data.symbol).formattedSymbol || getAssetInfo(data.symbol).symbol}
                </span>
              </div>
            </Row>
          )}

          {(data.type === 'Borrow' ||
            data.type === 'Deposit' ||
            data.type === 'Repay' ||
            data.type === 'RedeemUnderlying' ||
            data.type === 'LiquidationCall') &&
            data.amount && (
              <Row
                title={intl.formatMessage(amountTitle)}
                withMargin={true}
                onWhiteBackground={true}
              >
                <Value
                  value={data.amount}
                  symbol={data.symbol}
                  subValue={data.amountInUsd}
                  subSymbol="USD"
                  tokenIcon={true}
                  className="HistoryModal__value"
                  onWhiteBackground={true}
                />
              </Row>
            )}

          {childComponent}

          <Row
            title={intl.formatMessage(messages.viewTransaction)}
            withMargin={true}
            onWhiteBackground={true}
          >
            <Link
              className="HistoryModal__link"
              to={data.transactionLink}
              absolute={true}
              inNewWindow={true}
            >
              <span>
                <img src={linkIcon} alt="Share" /> {intl.formatMessage(messages.explorer)}
              </span>
            </Link>
          </Row>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .HistoryModal {
          &__content {
            border: solid 1px ${contentBorderColor};
          }
          &__text,
          &__asset-line span {
            color: ${currentTheme.darkBlue.hex};
          }

          .HistoryModal__link {
            color: ${currentTheme.darkBlue.hex};
            &:hover {
              color: ${currentTheme.secondary.hex};
            }
          }
        }
      `}</style>
    </BasicModal>
  );
}
