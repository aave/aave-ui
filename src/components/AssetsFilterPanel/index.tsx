import React from 'react';

import LabeledSwitcher from '../basic/LabeledSwitcher';
import SearchField from '../fields/SearchField';

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
}: AssetsFilterPanelProps) {
  return (
    <div className="AssetsFilterPanel">
      <div className="AssetsFilterPanel__content">
        {toggleActive ? (
          <LabeledSwitcher
            leftOption={optionTitleLeft}
            rightOption={optionTitleRight}
            onToggle={switchOnToggle}
            value={switchValue}
            darkOnDarkMode={darkOnDarkMode}
          />
        ) : (
          <></>
        )}

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
