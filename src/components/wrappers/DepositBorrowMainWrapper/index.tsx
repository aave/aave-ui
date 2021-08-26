import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapperWithTopLine from '../ContentWrapperWithTopLine';
import AssetsFilterPanel from '../../AssetsFilterPanel';
import MarketSwitcher from '../../market/MarketSwitcher';
import Row from '../../basic/Row';
import Value from '../../basic/Value';

import messages from './messages';
import staticStyles from './style';

interface DepositBorrowMainWrapperProps {
  children: ReactNode;
  items: ReactNode;
  contentTitle: string;
  itemsTitle: string;
  isShowRightPanel?: boolean;
  searchValue: string;
  setSearchValue: (value: string) => void;
  showOnlyStableCoins: boolean;
  setShowOnlyStableCoins: (value: boolean) => void;
  withSwitchMarket?: boolean;
  totalValue: string | number;
}

export default function DepositBorrowMainWrapper({
  children,
  items,
  contentTitle,
  itemsTitle,
  isShowRightPanel,
  searchValue,
  setSearchValue,
  showOnlyStableCoins,
  setShowOnlyStableCoins,
  withSwitchMarket,
  totalValue,
}: DepositBorrowMainWrapperProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();

  return (
    <div className="DepositBorrowMainWrapper">
      <div className="DepositBorrowMainWrapper__left-inner">
        {!sm && (
          <ContentWrapperWithTopLine title={contentTitle} className="">
            <AssetsFilterPanel
              optionTitleLeft={intl.formatMessage(messages.optionTitleLeft)}
              optionTitleRight={intl.formatMessage(messages.optionTitleRight)}
              switchValue={showOnlyStableCoins}
              switchOnToggle={setShowOnlyStableCoins}
              searchValue={searchValue}
              searchOnChange={setSearchValue}
              darkOnDarkMode={true}
            />

            <div className="DepositBorrowMainWrapper__content">{children}</div>
          </ContentWrapperWithTopLine>
        )}

        {sm && <div className="DepositBorrowMainWrapper__mobile--content">{children}</div>}

        {withSwitchMarket && !sm && (
          <div className="DepositBorrowMainWrapper__changeMarket-inner">
            {intl.formatMessage(messages.changeMarket, {
              button: (
                <MarketSwitcher
                  className="DepositBorrowMainWrapper__changeMarket"
                  toTop={true}
                  textButton={true}
                />
              ),
            })}
          </div>
        )}
      </div>

      {isShowRightPanel && (
        <div className="DepositBorrowMainWrapper__right-inner">
          <ContentWrapperWithTopLine title={itemsTitle}>
            <div className="DepositBorrowMainWrapper__items">{items}</div>
            <Row
              className="DepositBorrowMainWrapper__total"
              title={intl.formatMessage(messages.total)}
            >
              <Value
                value={totalValue}
                tokenIcon={true}
                withoutSymbol={true}
                symbol="USD"
                maximumValueDecimals={2}
              />
            </Row>
          </ContentWrapperWithTopLine>
        </div>
      )}

      {withSwitchMarket && sm && (
        <div className="DepositBorrowMainWrapper__changeMarket-inner">
          {intl.formatMessage(messages.changeMarket, {
            button: (
              <MarketSwitcher
                className="DepositBorrowMainWrapper__changeMarket"
                toTop={true}
                textButton={true}
              />
            ),
          })}
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .DepositBorrowMainWrapper {
          &__caption {
            color: ${currentTheme.textDarkBlue.hex};
          }
          .DepositBorrowMainWrapper__changeMarket-inner {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
