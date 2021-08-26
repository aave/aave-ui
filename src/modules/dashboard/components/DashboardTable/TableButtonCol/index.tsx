import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import Link from '../../../../../components/basic/Link';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import TableCol from '../TableCol';

import staticStyles from './style';

type TableButtonColProps = {
  title: string;
  linkTo: string;
  disabled?: boolean;
  withoutBorder?: boolean;
};

export default function TableButtonCol({
  title,
  linkTo,
  disabled,
  withoutBorder,
}: TableButtonColProps) {
  const { currentTheme, xl, lg, md } = useThemeContext();

  const columnWidth = xl && !lg ? 80 : lg && !md ? 90 : md ? 80 : 100;

  return (
    <TableCol maxWidth={columnWidth} minWidth={columnWidth}>
      <Link to={linkTo} disabled={disabled} className={classNames({ ButtonLink: !withoutBorder })}>
        {withoutBorder ? (
          <span className="TableButtonCol__button TableButtonCol__buttonText">{title}</span>
        ) : (
          <DefaultButton
            className="TableButtonCol__button"
            color="dark"
            title={title}
            disabled={disabled}
          />
        )}
      </Link>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TableButtonCol__buttonText {
          color: ${currentTheme.textDarkBlue.hex};
        }
      `}</style>
    </TableCol>
  );
}
