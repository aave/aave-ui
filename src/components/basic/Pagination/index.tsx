import React from 'react';
import { useThemeContext } from '@aave/aave-ui-kit';

import goToTop from '../../../helpers/goToTop';
import TailArrow from '../TailArrow';

import staticStyles from './style';

interface PaginationProps {
  page: number;
  pageChange: (previous: boolean) => void;
  nextButtonDisabled?: boolean;
}

export default function Pagination({ page, pageChange, nextButtonDisabled }: PaginationProps) {
  const { sm } = useThemeContext();

  return (
    <div className="Pagination">
      <button
        className="Pagination__button"
        type="button"
        onClick={() => {
          sm && goToTop();
          pageChange(true);
        }}
        disabled={page === 0}
      >
        <TailArrow className="Pagination__arrow" color="dark" type="right" />
      </button>
      <button
        className="Pagination__button"
        type="button"
        onClick={() => {
          sm && goToTop();
          pageChange(false);
        }}
        disabled={nextButtonDisabled}
      >
        <TailArrow className="Pagination__arrow" color="dark" type="left" />
      </button>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </div>
  );
}
