import React from 'react';
import { useIntl } from 'react-intl';
import { ParentSize } from '@visx/responsive';
import { useThemeContext } from '@aave/aave-ui-kit';

import { getAssetInfo, TokenIcon } from '../../../../../helpers/config/assets-config';
import staticStyles from './style';
import { PieChart } from '../../../../../components/compositionBars/PieChart';
import messages from './messages';

interface ReserveStatusGraphProps {
  symbol: string;
  totalBorrows: number | string;
  availableLiquidity: number | string;
}

export default function ReserveStatusGraph({
  symbol,
  totalBorrows,
  availableLiquidity,
}: ReserveStatusGraphProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md, sm } = useThemeContext();

  const percentFromValue = (percent: number, value: number) => percent * (value / 100);

  const iconSize = xl && !lg ? 79 : lg && !md ? 60 : md && !sm ? 79 : 100;
  const symbolsLength = getAssetInfo(symbol).symbolsArray?.length || 0;
  const formattedIconSize =
    symbolsLength === 3
      ? percentFromValue(70, iconSize)
      : symbolsLength === 4
      ? percentFromValue(60, iconSize)
      : iconSize;

  return (
    <div className="ReserveStatusGraph">
      <div className="ReserveStatusGraph__inner">
        <ParentSize>
          {(parent) => (
            <PieChart
              width={parent.width}
              height={parent.height}
              slices={[
                {
                  value: +availableLiquidity,
                  label: intl.formatMessage(messages.availableLiquidity),
                  color: currentTheme.green.hex,
                },
                {
                  value: +totalBorrows,
                  label: intl.formatMessage(messages.totalBorrowed),
                  color: currentTheme.red.hex,
                },
              ]}
            />
          )}
        </ParentSize>
        <TokenIcon
          className="ReserveStatusGraph__icon"
          tokenSymbol={symbol}
          height={formattedIconSize}
          width={formattedIconSize}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
