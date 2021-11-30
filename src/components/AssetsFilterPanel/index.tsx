import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import LabeledSwitcher from '../basic/LabeledSwitcher';
import SearchField from '../fields/SearchField';
import IsolationInfoBanner from '../isolationMode/IsolationInfoBanner';

import staticStyles from './style';

export type AssetsFilterPanelProps = {
  optionTitleLeft: string;
  optionTitleRight: string;
  switchOnToggle: (value: boolean) => void;
  switchValue: boolean;
  searchValue: string;
  searchOnChange: (value: string) => void;
  darkOnDarkMode?: boolean;
  toggleActive?: boolean;
  showToggle?: boolean;
  isolationText?: string;
};

export default function AssetsFilterPanel({
  optionTitleLeft,
  optionTitleRight,
  switchOnToggle,
  switchValue,
  searchValue,
  searchOnChange,
  darkOnDarkMode,
  toggleActive = true,
  showToggle = true,
  isolationText,
}: AssetsFilterPanelProps) {
  const { md } = useThemeContext();

  return (
    <div className="AssetsFilterPanel">
      {isolationText && md && <IsolationInfoBanner text={isolationText} />}

      <div className="AssetsFilterPanel__content">
        <div className="AssetsFilterPanel__left--inner">
          {toggleActive && (
            <>
              {showToggle && (
                <LabeledSwitcher
                  leftOption={optionTitleLeft}
                  rightOption={optionTitleRight}
                  onToggle={switchOnToggle}
                  value={switchValue}
                  darkOnDarkMode={darkOnDarkMode}
                />
              )}
            </>
          )}

          {isolationText && !md && (
            <IsolationInfoBanner text={isolationText} withoutMargin={!showToggle} />
          )}
        </div>

        <div
          className={
            toggleActive
              ? 'AssetsFilterPanel__search-inner'
              : 'AssetsFilterPanel__search-inner-force-right'
          }
        >
          <SearchField value={searchValue} onChange={searchOnChange} />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
