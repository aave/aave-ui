import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { useThemeContext } from '@aave/aave-ui-kit';

import Row from '../../../../../../components/basic/Row';
import NetAPYHelpModal from '../../../../../../components/HelpModal/NetAPYHelpModal';
import ValuePercent from '../../../../../../components/basic/ValuePercent';

import messages from './messages';
import staticStyles from './style';

interface NetAPYProps {
  value: number;
  isCollapse: boolean;
}

export default function NetAPY({ value, isCollapse }: NetAPYProps) {
  const intl = useIntl();
  const { sm } = useThemeContext();

  return (
    <Row
      className={classNames('NetAPY', { NetAPY__collapsed: isCollapse })}
      title={
        <NetAPYHelpModal
          text={intl.formatMessage(messages.netAPY)}
          color="white"
          lightWeight={true}
          iconSize={12}
        />
      }
      isColumn={!sm}
    >
      <ValuePercent value={value / 100} color="white" isCompact={true} />

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </Row>
  );
}
