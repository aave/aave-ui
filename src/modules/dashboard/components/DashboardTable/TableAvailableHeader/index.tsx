import React from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { CapType } from '../../../../../components/caps/helper';
import AvailableCapsHelpModal from '../../../../../components/caps/AvailableCapsHelpModal';

import staticStyles from './style';

type TableAvailableHeaderProps = {
  head: string[];
  colWidth: (string | number)[];
  isDeposit?: boolean;
  className?: string;
};

export default function TableAvailableHeader({
  head,
  colWidth,
  isDeposit,
  className,
}: TableAvailableHeaderProps) {
  const { currentTheme, lg, sm } = useThemeContext();

  return (
    <div className={classNames('TableAvailableHeader', className)}>
      <div className="TableAvailableHeader__inner">
        {head.map((title, i) => (
          <div
            className="TableAvailableHeader__item"
            style={{ maxWidth: colWidth[i] }}
            key={title + i}
          >
            {!sm && i === 1 ? (
              <AvailableCapsHelpModal
                shortTitle={!lg}
                className="TableAvailableHeader__help-text"
                iconSize={12}
                capType={isDeposit ? CapType.supplyCap : CapType.borrowCap}
              />
            ) : (
              <p className="TableAvailableHeader__title">{title}</p>
            )}
          </div>
        ))}
        <div className="TableAvailableHeader__item" />
        <div className="TableAvailableHeader__item" />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableAvailableHeader {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
