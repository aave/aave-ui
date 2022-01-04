import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import staticStyles from './style';

import arrowIcon from './images/arrowIcon.svg';

interface CircleBackButtonProps {
  className?: string;
  icon?: string;
}

export default function CircleBackButton({ className, icon }: CircleBackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      className={classNames('CircleBackButton', className)}
      type="button"
      onClick={() => navigate(-1)}
    >
      <img src={icon || arrowIcon} alt="" />

      <style jsx={true}>{staticStyles}</style>
    </button>
  );
}
