import React from 'react';
import classNames from 'classnames';
import { DarkModeSwitcher } from '@aave/aave-ui-kit';

import LangSwitcher from '../basic/LangSwitcher';

import staticStyles from './style';

interface FooterProps {
  inside?: boolean;
}

export default function Footer({ inside }: FooterProps) {
  return (
    <footer className={classNames('Footer', { Footer__inside: inside })}>
      <DarkModeSwitcher />
      <LangSwitcher />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </footer>
  );
}
