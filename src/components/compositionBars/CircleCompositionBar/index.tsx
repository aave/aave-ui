import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Chart from 'react-apexcharts';
import { valueToBigNumber } from '@aave/protocol-js';

import { useThemeContext } from '@aave/aave-ui-kit';

import messages from './messages';
import staticStyles from './style';

export interface CircleCompositionBarItem {
  color: string;
  value: number;
  title: string | number;
}

interface CircleCompositionBarProps {
  title: string;
  totalValue: number;
  data: CircleCompositionBarItem[];
}

export default function CircleCompositionBar({
  title,
  totalValue,
  data,
}: CircleCompositionBarProps) {
  const intl = useIntl();
  const { currentTheme, xl, lg, md } = useThemeContext();

  const [newData, setNewData] = useState<CircleCompositionBarItem[]>([]);
  const [values, setValues] = useState<number[]>([]);
  const [percentages, setPercentages] = useState<number[]>([]);
  const [leftItem, setLeftItem] = useState({
    title: '',
    value: 0,
    color: currentTheme.white.hex,
  });

  useEffect(() => {
    setNewData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  useEffect(() => {
    if (!!newData.length) {
      setValues(newData.map(({ value }: CircleCompositionBarItem) => value));
      setPercentages(
        newData.map(({ value }: CircleCompositionBarItem) =>
          valueToBigNumber(value).dividedBy(totalValue).multipliedBy(100).toNumber()
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData.length]);

  const sumValues = (accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  };

  const allValues = !!newData.length && !!values.length ? values.reduce(sumValues) : 0;
  const allPercentage =
    !!newData.length && !!percentages.length ? percentages.reduce(sumValues) : 0;

  const restValue =
    !!newData.length && allValues ? valueToBigNumber(totalValue).minus(allValues).toNumber() : 0;
  const restPercentage =
    !!newData.length && allPercentage ? valueToBigNumber(100).minus(allPercentage).toNumber() : 0;

  useEffect(() => {
    if (restPercentage > 0) {
      setLeftItem({
        title: `${intl.formatMessage(messages.borrowingPowerAvailable)}: ${intl.formatNumber(
          restPercentage,
          {
            maximumFractionDigits: 2,
          }
        )}%`,
        value: restValue,
        color: currentTheme.white.hex,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restPercentage]);

  const options = {
    chart: {
      fontFamily: 'roboto-font',
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
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
    colors: [...newData.map((item) => item.color), leftItem.color],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    labels: [...newData.map((item) => item.title.toString()), leftItem.title],
    tooltip: {
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName: string) => seriesName,
        },
      },
    },
  };

  const chartSize = xl && !lg ? 150 : lg && !md ? 125 : md ? 150 : 187.5;

  return (
    <div className="CircleCompositionBar">
      <Chart
        options={options}
        series={[...newData.map((item) => item.value), leftItem.value]}
        type="donut"
        width={chartSize}
        height={chartSize}
      />

      <div className="CircleCompositionBar__title">
        <p>{title}</p>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .CircleCompositionBar {
          &__title {
            background: ${currentTheme.darkBlue.hex};
            p {
              color: ${currentTheme.white.hex};
            }
          }
          .apexcharts-tooltip-series-group {
            background: ${currentTheme.white.hex} !important;
            color: ${currentTheme.darkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
