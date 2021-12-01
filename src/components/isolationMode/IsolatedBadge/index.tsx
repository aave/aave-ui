import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { rgba, useThemeContext } from '@aave/aave-ui-kit';

import IsolatedAssetModal from '../IsolatedAssetModal';

import messages from './messages';
import staticStyles from './style';

import alert from '../../../images/alertCircle.svg';
import alertWhite from '../../../images/alertCircleWhite.svg';

interface IsolatedBadgeProps {
  isWhiteIcon?: boolean;
}

export default function IsolatedBadge({ isWhiteIcon }: IsolatedBadgeProps) {
  const intl = useIntl();
  const { currentTheme, xl } = useThemeContext();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const borderColor = rgba(`${currentTheme.lightBlue.rgb}, 0.2`);

  return (
    <div
      className="IsolatedBadge"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsModalVisible(true);
      }}
    >
      <p className="IsolatedBadge__text">{intl.formatMessage(messages.isolated)}</p>
      <button className="IsolatedBadge__button" type="button">
        <img
          width={xl ? 14 : 16}
          height={xl ? 14 : 16}
          src={isWhiteIcon ? alertWhite : alert}
          alt=""
        />
      </button>

      {isModalVisible && (
        <IsolatedAssetModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
      )}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .IsolatedBadge {
          color: ${currentTheme.textDarkBlue.hex};
          border: 1px solid ${borderColor};
        }
      `}</style>
    </div>
  );
}
