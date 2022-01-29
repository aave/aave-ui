import React from 'react';
import classNames from 'classnames';

import { useThemeContext } from '@aave/aave-ui-kit';
import Link from '../../../../../components/basic/Link';
import DefaultButton from '../../../../../components/basic/DefaultButton';
import TableCol from '../TableCol';

import staticStyles from './style';
import styled from 'styled-components';

type TableButtonColProps = {
  title: string;
  linkTo: string;
  disabled?: boolean;
  withoutBorder?: boolean;
  dashboard?: boolean;
};

const ButtonText = styled.span<{ withoutBorder?: boolean }>`
  font-family: Montserrat;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: ${(props) => (props.withoutBorder ? '#7159ff' : 'white')};
`;

const DashBoardTableButton = ({ text }: { text: string }) => {
  return (
    <div
      className="flex-row centered"
      style={{
        backgroundColor: '#7159ff',
        color: 'white',
        padding: '8px 15px',
        borderRadius: 4,
      }}
    >
      <ButtonText>{text}</ButtonText>
    </div>
  );
};

export default function TableButtonCol({
  title,
  linkTo,
  disabled,
  withoutBorder,
  dashboard,
}: TableButtonColProps) {
  const { currentTheme, xl, lg, md } = useThemeContext();

  const columnWidth = xl && !lg ? 80 : lg && !md ? 90 : md ? 80 : 100;

  return (
    <TableCol maxWidth={71} minWidth={71}>
      <Link to={linkTo} disabled={disabled} className={classNames({ ButtonLink: !withoutBorder })}>
        {withoutBorder ? (
          <ButtonText withoutBorder>{title}</ButtonText>
        ) : dashboard ? (
          <DashBoardTableButton text={title} />
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
