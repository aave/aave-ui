import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import CollateralHelpModal from '../../../../../components/HelpModal/CollateralHelpModal';
import BorrowInterestHelpModal from '../../../../../components/HelpModal/BorrowInterestHelpModal';

import staticStyles from './style';

type TableHeaderProps = {
  head: string[];
  colWidth: (string | number)[];
  isDeposit?: boolean;
  className?: string;
};

export default function TableHeader({ head, colWidth, isDeposit, className }: TableHeaderProps) {
  const { currentTheme, sm } = useThemeContext();

  return (
    <div className={classNames('TableHeader', className)}>
      <div className="TableHeader__inner">
        {head.map((title, i) => (
          <div className="TableHeader__item" style={{ maxWidth: colWidth[i] }} key={title + i}>
            {!sm && i === head.length - 1 ? (
              <>
                {!isDeposit ? (
                  <BorrowInterestHelpModal
                    className="TableHeader__help-text"
                    text={title}
                    iconSize={12}
                  />
                ) : (
                  <CollateralHelpModal
                    className="TableHeader__help-text"
                    text={title}
                    iconSize={12}
                  />
                )}
              </>
            ) : (
              <p className="TableHeader__title">{title}</p>
            )}
          </div>
        ))}
        {!sm && (
          <>
            <div className="TableHeader__item" />
            <div className="TableHeader__item" />
          </>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableHeader {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </div>
  );
}
