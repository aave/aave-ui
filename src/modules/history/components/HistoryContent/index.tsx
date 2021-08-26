import React, { useState } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';

// import DefaultButton from '../../../../components/basic/DefaultButton';
import BasicTable from '../../../../components/BasicTable';
import Value from '../../../../components/basic/Value';
import HistoryItem from '../HistoryItem';
import StateChanges from '../StateChanges';
import HistoryModal from '../HistoryModal';
import { HistoryItemTypes } from '../../types';

import messages from './messages';
import staticStyles from './style';

interface HistoryContentProps {
  data: HistoryItemTypes[];
}

export default function HistoryContent({ data }: HistoryContentProps) {
  const intl = useIntl();

  const [itemData, setItemData] = useState<HistoryItemTypes | undefined>(undefined);

  const handleItemClick = (item: HistoryItemTypes) => {
    setItemData(item);
  };
  const handleModalClose = () => {
    setItemData(undefined);
  };

  const getTitle = (type: string) => {
    let title: MessageDescriptor = messages.deposit;

    switch (type) {
      case 'Deposit':
        title = messages.deposit;
        break;
      case 'Borrow':
        title = messages.borrowed;
        break;
      case 'RedeemUnderlying':
        title = messages.withdrawal;
        break;
      case 'Repay':
        title = messages.repayment;
        break;
      case 'Swap':
        title = messages.changeOfAPYType;
        break;
      case 'UsageAsCollateral':
        title = messages.changeOfUsageAsCollateral;
        break;
      case 'LiquidationCall':
        title = messages.liquidation;
        break;
    }

    return title;
  };

  return (
    <div className="HistoryContent">
      <div className="HistoryContent__items-wrapper">
        {/*<div className="HistoryContent__button-inner">*/}
        {/*  <DefaultButton*/}
        {/*    title={intl.formatMessage(messages.download)}*/}
        {/*    transparent={true}*/}
        {/*    color="dark"*/}
        {/*  />*/}
        {/*</div> TODO: uncomment when CVC download logic is added */}

        <BasicTable>
          {data.map((item, index) => (
            <HistoryItem
              title={item.type && intl.formatMessage(getTitle(item.type))}
              type={item.type}
              date={item.date}
              onClick={() => handleItemClick(item)}
              key={index}
            >
              {(item.type === 'Deposit' ||
                item.type === 'Borrow' ||
                item.type === 'RedeemUnderlying' ||
                item.type === 'Repay' ||
                item.type === 'LiquidationCall') &&
              item.amount ? (
                <Value
                  value={item.amount}
                  symbol={item.symbol}
                  subValue={item.amountInUsd}
                  subSymbol="USD"
                  tokenIcon={true}
                  className="HistoryContent__value"
                />
              ) : (
                <StateChanges type={item.type} condition={item.condition} symbol={item.symbol} />
              )}
            </HistoryItem>
          ))}
        </BasicTable>
      </div>

      {itemData && (
        <HistoryModal
          data={itemData}
          title={itemData?.type && intl.formatMessage(getTitle(itemData?.type))}
          isVisible={!!itemData}
          onBackdropPress={handleModalClose}
        />
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
