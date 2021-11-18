import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import { TokenIcon } from '../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

export interface CompositionItem {
  value: number | string;
  percentage: number;
  title: string;
  color: string;
}

export interface CompositionBarProps {
  dataset: CompositionItem[];
  isCollateral?: boolean;
  className?: string;
}

export default function CompositionBar({ dataset, isCollateral, className }: CompositionBarProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const percentages = dataset.map(({ percentage }: CompositionItem) => percentage);
  const sumPercentages = (accumulator: number, currentValue: number) => {
    return accumulator + currentValue;
  };
  const allPercentage = percentages.length && percentages.reduce(sumPercentages);
  const restPercentage = 100 - allPercentage;

  const [elem, setElem] = useState(0);
  const onOptionHover = (elem: number) => {
    setElem(elem);
  };
  const [restPercentElem, setRestPercentElem] = useState(0);
  const onRestPercentOptionHover = (elem: number) => {
    setRestPercentElem(elem);
  };

  const setItemWidth = (percentage: number) => {
    let itemWidth = Number(percentage.toFixed(1));
    itemWidth =
      itemWidth === 100
        ? itemWidth - Number(`0.${dataset.length + dataset.length - 2}`)
        : itemWidth;
    itemWidth = itemWidth === 0 ? itemWidth + 0.2 : itemWidth;
    return itemWidth;
  };

  return (
    <div className={classNames('CompositionBar__container', className)}>
      <div className="CompositionBar__wrapper">
        <div className="CompositionBar">
          {dataset.map(({ value, percentage, title, color }: CompositionItem, i: number) => {
            const itemWidth = setItemWidth(percentage);
            const style = {
              color,
              backgroundColor: color,
              width: `${itemWidth}%`,
            };
            return (
              <div
                className="CompositionBar__item"
                key={title + i}
                style={style}
                onMouseEnter={() => onOptionHover(i + 1)}
                onMouseLeave={() => onOptionHover(0)}
              />
            );
          })}

          {restPercentage > 1 && (
            <div
              className="CompositionBar__rest-percentage"
              style={{ width: `${restPercentage}%` }}
              onMouseEnter={() => onRestPercentOptionHover(1)}
              onMouseLeave={() => onRestPercentOptionHover(0)}
            />
          )}
        </div>
      </div>

      <div className="CompositionBar__item-optionsWrapper">
        {dataset.map(({ value, percentage, title, color }: CompositionItem, i: number) => {
          const itemWidth = setItemWidth(percentage);
          return (
            <div
              className={classNames('CompositionBar__item-optionInner', {
                CompositionBar__item__small: itemWidth < 15,
                CompositionBar__item__smallLast:
                  (isCollateral ? true : dataset.length > 3) &&
                  itemWidth < 15 &&
                  (dataset.length - 1 === i ||
                    dataset.length - 2 === i ||
                    dataset.length - 3 === i) &&
                  restPercentage < 10,
                CompositionBar__item__smallFirst: itemWidth < 15 && elem === 1,
                CompositionBar__itemOptionInnerHover: elem === i + 1,
                CompositionBar__itemNonHover: itemWidth < 5 && dataset.length - 1 === i,
              })}
              style={{ color, width: `${itemWidth}%` }}
              key={i}
            >
              <div
                className={classNames('CompositionBar__item-option', {
                  CompositionBar__itemOptionOpen: elem === i + 1,
                })}
              >
                <div className="Item__token-inner">
                  <TokenIcon
                    className="CompositionBar__token-icon"
                    tokenSymbol={title}
                    height={15}
                    width={15}
                  />
                  <p className="Item__title" style={{ color }}>
                    {title}
                  </p>
                </div>

                <div className="Item__value">
                  <p>
                    {intl.formatNumber(Number(value), {
                      maximumFractionDigits: 3,
                    })}
                  </p>
                  <b>
                    {intl.formatNumber(percentage, {
                      maximumFractionDigits:
                        Number(percentage.toFixed(1)) === 100 || Number(percentage.toFixed(1)) === 0
                          ? 4
                          : 1,
                    })}
                  </b>
                  %
                </div>
              </div>
            </div>
          );
        })}

        {restPercentage > 1 && (
          <div className="CompositionBar__rest-percentage" style={{ width: `${restPercentage}%` }}>
            <div
              className={classNames('CompositionBar__item-option', {
                CompositionBar__itemOptionOpen: restPercentElem === 1,
              })}
            >
              <p>
                {intl.formatMessage(messages.left)}
                <b>
                  {intl.formatNumber(restPercentage, {
                    maximumFractionDigits: 1,
                  })}
                </b>
                <span>%</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true}>{`
        .CompositionBar__wrapper {
          border: 1px solid ${currentTheme.white.hex};
        }
        .CompositionBar__item-option {
          background: ${currentTheme.white.hex};
        }
        .Item__value {
          color: ${currentTheme.darkBlue.hex};
        }
        .CompositionBar__rest-percentage {
          p {
            color: ${currentTheme.primary.hex};
          }
          b {
            color: ${currentTheme.darkBlue.hex};
          }
          span {
            color: ${currentTheme.darkBlue.hex};
          }
        }
        .CompositionBar__item-option:after {
          background: ${currentTheme.white.hex};
        }
      `}</style>
    </div>
  );
}
