import { useThemeContext } from '@aave/aave-ui-kit';
import ParentSize from '@visx/responsive/lib/components/ParentSizeModern';

import staticStyles from './style';
import { PieChart } from '../PieChart';

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

  return (
    <div className="CircleCompositionBar">
      <ParentSize>
        {(parent) => (
          <PieChart
            width={parent.width}
            height={parent.height}
            slices={data}
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
