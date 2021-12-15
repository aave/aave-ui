import React, { ReactNode } from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';

import staticStyles from './style';

interface TableHeaderButtonProps {
  sortName?: string;
  sortDesc?: boolean;
  sortKey?: string;
  setSortName?: (value: string) => void;
  setSortDesc?: (value: boolean) => void;
  withSorting?: boolean;
  subTitle?: string;
  title: string | ReactNode;
  className?: string;
  size?: 'normal' | 'small';
}

export default function TableHeaderButton({
  sortName,
  sortDesc,
  sortKey,
  setSortName,
  setSortDesc,
  withSorting,
  subTitle,
  title,
  className,
  size = 'normal',
}: TableHeaderButtonProps) {
  const { currentTheme } = useThemeContext();

  const handleSorting = (name: string) => {
    setSortDesc && setSortDesc(false);
    setSortName && setSortName(name);
    if (sortName === name) {
      setSortDesc && setSortDesc(!sortDesc);
    }
  };

  return (
    <>
      {withSorting && sortKey ? (
        <div
          onClick={() => handleSorting(sortKey)}
          className={classNames(
            'TableHeaderButton TableHeaderButton__withSort',
            {
              TableHeaderButton__desk: sortName === sortKey && sortDesc,
              TableHeaderButton__sort: sortName === sortKey,
              TableHeaderButton__withSubTitle: !!subTitle,
            },
            className,
            `TableHeaderButton__${size}`
          )}
        >
          {!!subTitle && <span className="TableHeaderButton__subTitle">{subTitle}</span>}
          <div className="TableHeaderButton__title">{title}</div>
        </div>
      ) : (
        <div
          className={classNames(
            'TableHeaderButton',
            {
              TableHeaderButton__withSubTitle: !!subTitle,
            },
            className
          )}
        >
          {!!subTitle && <span className="TableHeaderButton__subTitle">{subTitle}</span>}
          <div className="TableHeaderButton__title">{title}</div>
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .TableHeaderButton {
          color: ${currentTheme.textDarkBlue.hex};
          .TableHeaderButton__subTitle {
            color: ${currentTheme.lightBlue.hex};
          }

          &__withSort {
            &:hover {
              .TableHeaderButton__title {
                &:after {
                  border-top-color: ${currentTheme.textDarkBlue.hex};
                }
              }
            }
            .TableHeaderButton__title {
              &:after {
                border-top-color: ${currentTheme.lightBlue.hex};
              }
            }
          }

          &__sort {
            .TableHeaderButton__title {
              &:after {
                border-top-color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }

          &__desk {
            .TableHeaderButton__title {
              &:after {
                border-bottom-color: ${currentTheme.textDarkBlue.hex};
              }
            }
          }
        }
      `}</style>
    </>
  );
}
