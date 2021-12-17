import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, AnimationArrow, DropdownWrapper } from '@aave/aave-ui-kit';

import CustomScroll from '../../../../basic/CustomScroll';
import BasicField from '../../../BasicField';
import ValuePercent from '../../../../basic/ValuePercent';
import { getAssetInfo, TokenIcon } from '../../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

type Option = {
  label: string;
  value: string;
  decimals: number;
  apy?: string;
};

interface AssetSelectProps {
  asset: string;
  setAsset: (value: string, decimals: number) => void;
  options: Option[];
  title: string;
  reverseTitle?: boolean;
  queryAsset?: string;
}

export default function AssetSelect({
  asset,
  setAsset,
  options,
  title,
  reverseTitle,
  queryAsset,
}: AssetSelectProps) {
  const intl = useIntl();
  const { currentTheme, sm, isCurrentThemeDark } = useThemeContext();

  const [visible, setVisible] = useState(false);
  const [activeAsset, setActiveAsset] = useState<Option | undefined>(undefined);
  const [searchValue, setSearchValue] = useState('');

  const borderColor = rgba(`${currentTheme.darkBlue.rgb}, 0.1`);

  const filteredSearch = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    if (options.length === 1) {
      setAsset(options[0].value, options[0].decimals);
      setActiveAsset(options[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.length]);

  useEffect(() => {
    if (!!queryAsset && options.length > 1) {
      const option = options.find((option) => option.value === queryAsset);
      setAsset(option?.value || '', option?.decimals || 0);
      setActiveAsset(option);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionsComponent = () => (
    <>
      {filteredSearch.map((option, index) => (
        <button
          className="AssetSelect__option"
          type="button"
          onClick={() => {
            setAsset(option.value, option.decimals);
            setActiveAsset(option);
            setVisible(false);
            setSearchValue('');
          }}
          disabled={asset === option.value}
          key={index}
        >
          <TokenIcon
            tokenSymbol={option.label.toUpperCase()}
            height={30}
            width={30}
            tokenFullName={getAssetInfo(option.label).formattedSymbol || option.label.toUpperCase()}
            onWhiteBackground={true}
          />
        </button>
      ))}
    </>
  );

  return (
    <div
      className={classNames('AssetSelect', {
        AssetSelect__reverse: reverseTitle,
        AssetSelect__active: visible,
      })}
    >
      <div className="AssetSelect__title">
        <p>{title}</p>
      </div>

      <DropdownWrapper
        className="AssetSelect"
        visible={visible}
        setVisible={setVisible}
        verticalPosition="bottom"
        horizontalPosition="left"
        buttonComponent={
          <button
            className="AssetSelect__button"
            type="button"
            onClick={() => setVisible(!visible)}
            disabled={options.length <= 1}
          >
            {!!activeAsset?.label ? (
              <TokenIcon
                tokenSymbol={activeAsset.label}
                height={25}
                width={25}
                tokenFullName={
                  getAssetInfo(activeAsset.label).formattedSymbol || activeAsset.label.toUpperCase()
                }
              />
            ) : (
              <p className="AssetSelect__button-placeholder">
                {intl.formatMessage(messages.asset)}
              </p>
            )}

            {options.length > 1 && (
              <AnimationArrow
                active={visible}
                width={14}
                height={8}
                arrowTopPosition={4}
                arrowWidth={8}
                arrowHeight={1}
                color={sm ? currentTheme.whiteElement.hex : currentTheme.white.hex}
              />
            )}
          </button>
        }
      >
        <div className="AssetSelect__content">
          <div
            className={classNames('AssetSelect__content-inner', {
              AssetSelect__contentWithoutScroll: filteredSearch.length <= 3,
            })}
          >
            <BasicField
              value={searchValue}
              onChange={setSearchValue}
              placeholder={intl.formatMessage(messages.search)}
              type="text"
              className="AssetSelect__search"
            />

            {filteredSearch.length ? (
              <>
                {filteredSearch.length <= 3 ? (
                  optionsComponent()
                ) : (
                  <CustomScroll>{optionsComponent()}</CustomScroll>
                )}
              </>
            ) : (
              <p className="AssetSelect__noData">{intl.formatMessage(messages.noDataTitle)}</p>
            )}
          </div>
        </div>
      </DropdownWrapper>

      {!!activeAsset?.apy && (
        <div className="AssetSelect__apy">
          <p className="AssetSelect__apy-title">{intl.formatMessage(messages.APY)}</p>
          <ValuePercent value={activeAsset.apy} color="dark" />
        </div>
      )}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AssetSelect {
          &__title {
            color: ${currentTheme.textDarkBlue.hex};
          }
          &__button {
            background: ${isCurrentThemeDark
              ? sm
                ? currentTheme.textDarkBlue.hex
                : currentTheme.whiteItem.hex
              : currentTheme.textDarkBlue.hex};
            color: ${sm ? currentTheme.whiteElement.hex : currentTheme.white.hex};

            .TokenIcon {
              .TokenIcon__name {
                color: ${sm ? currentTheme.whiteElement.hex : currentTheme.white.hex};
              }
            }
          }

          &__content-inner {
            background: ${currentTheme.white.hex};
          }

          .AssetSelect__search {
            input {
              color: ${currentTheme.darkBlue.hex};
              border-bottom: 1px solid ${borderColor};
            }
          }

          &__option {
            border-bottom: 1px solid ${borderColor};
            &:hover,
            &:disabled {
              background: ${borderColor};
            }
          }

          &__noData {
            color: ${currentTheme.darkBlue.hex};
          }

          .AssetSelect__apy {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
