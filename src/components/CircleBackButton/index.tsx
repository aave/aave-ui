import React from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import staticStyles from './style';

import arrowIcon from './images/arrowIcon.svg';

interface CircleBackButtonProps {
  className?: string;
  icon?: string;
}

export default function CircleBackButton({ className, icon }: CircleBackButtonProps) {
  const history = useHistory();

  return (
    <button
      className={classNames('CircleBackButton', className)}
      type="button"
      onClick={history.goBack}
    >
      <img src={icon || arrowIcon} alt="" />

      <style jsx={true}>{staticStyles}</style>
    </button>
  );
}
