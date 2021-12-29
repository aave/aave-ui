import React, { ReactNode } from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import NoDataPanel from '../../../../../components/NoDataPanel';

import staticStyles from './style';

interface TableNoDataProps {
  caption: string | ReactNode;
  title: string;
  description?: string;
}

export default function TableNoData({ caption, title, description }: TableNoDataProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className="TableNoData">
      <div className="TableNoData__title">{caption}</div>

      <NoDataPanel title={title} description={description} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .TableNoData {
          background: ${currentTheme.whiteElement.hex};
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
