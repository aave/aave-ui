import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import ContentWrapper from '../../../../../components/wrappers/ContentWrapper';
import NoDataPanel from '../../../../../components/NoDataPanel';

import staticStyles from './style';

interface TableNoDataProps {
  caption: string;
  title: string;
  description: string;
  withTopMargin?: boolean;
}

export default function TableNoData({
  caption,
  title,
  description,
  withTopMargin,
}: TableNoDataProps) {
  const { currentTheme } = useThemeContext();

  return (
    <div className={classNames('TableNoData', { TableNoData__withTopMargin: withTopMargin })}>
      <strong className="TableNoData__title">{caption}</strong>
      <ContentWrapper withFullHeight={true}>
        <NoDataPanel title={title} description={description} />
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .TableNoData {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
