import React from 'react';
import { useIntl } from 'react-intl';
import Chart from 'react-apexcharts';
import { useThemeContext } from '@aave/aave-ui-kit';

import { TokenIcon } from '../../../../../helpers/markets/assets';

import messages from './messages';
import staticStyles from './style';

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
  const { currentTheme } = useThemeContext();

  const options = {
    chart: {
      fontFamily: 'roboto-font',
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        color: `${currentTheme.darkBlue.hex}`,
        top: 0,
        left: 1,
        blur: 5,
        opacity: 0.08,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '89%',
        },
      },
    },
    colors: [currentTheme.green.hex, currentTheme.red.hex],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    labels: [
      intl.formatMessage(messages.totalBorrowed),
      intl.formatMessage(messages.availableLiquidity),
    ],
    tooltip: {
      enabled: false,
    },
  };

  const seriesData = [+availableLiquidity, +totalBorrows];

  return (
    <div className="ReserveStatusGraph">
      <div className="ReserveStatusGraph__inner">
        <Chart options={options} series={seriesData} type="donut" />
        <TokenIcon
          className="ReserveStatusGraph__icon"
          tokenSymbol={symbol}
          height={100}
          width={100}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .ReserveStatusGraph {
          &:after {
            border-color: ${currentTheme.mainBg.hex};
          }
        }
      `}</style>
    </div>
  );
}
