import { useThemeContext } from '@aave/aave-ui-kit';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

import staticStyles from './style';
import { PieChart } from '../PieChart';
import BigNumber from 'bignumber.js';
import { useIntl } from 'react-intl';

import messages from './messages';

export interface CircleCompositionBarItem {
  color: string;
  value: number;
  label: string | number;
}

interface CircleCompositionBarProps {
  title: string;
  totalValue: number;
  data: CircleCompositionBarItem[];
}

export default function CircleCompositionBar({ title, data }: CircleCompositionBarProps) {
  const { currentTheme } = useThemeContext();
  const intl = useIntl();
  const availableBorrowPower = data
    .reduce((acc, slice) => acc.minus(slice.value), new BigNumber(100))
    .toNumber();
  return (
    <div className="CircleCompositionBar">
      <ParentSize>
        {(parent) => (
          <PieChart
            width={parent.width}
            height={parent.height}
            slices={[
              ...data,
              {
                value: availableBorrowPower,
                label: `${intl.formatMessage(
                  messages.borrowingPowerAvailable
                )}: ${intl.formatNumber(availableBorrowPower, {
                  maximumFractionDigits: 2,
                })}%`,
                color: currentTheme.white.hex,
              },
            ]}
            centerText={title}
            disableBackground
          />
        )}
      </ParentSize>

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
        }
      `}</style>
    </div>
  );
}
