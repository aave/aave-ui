import { ChainId } from '@aave/contract-helpers';
import { useIntl } from 'react-intl';
import { IntlShape } from 'react-intl/src/types';
import staticStyles from './style';
import messages from './messages';
import { useStaticPoolDataContext } from '../../../libs/pool-data-provider';
import { useState } from 'react';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import EModeModal from '../../../components/eMode/EModeModal';

export interface DashboardLeftTopLineProps {
  chainId: ChainId;
  intl: IntlShape;
  onMobile?: boolean;
}

export function getEmodeMessage(categoryId: number, intl: IntlShape) {
  if (categoryId === 1) {
    return intl.formatMessage(messages.stablecoins);
  } else if (categoryId === 2) {
    return intl.formatMessage(messages.eth);
  } else if (categoryId === 3) {
    return intl.formatMessage(messages.btc);
  } else {
    return intl.formatMessage(messages.stablecoins);
  }
}
export function DashboardLeftTopLine(props: DashboardLeftTopLineProps) {
  const intl = useIntl();
  const { userId, userEmodeCategoryId } = useStaticPoolDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const { currentMarketData } = useProtocolDataContext();

  // TO-DO: Need styling here
  if (userId && currentMarketData.v3) {
    return (
      <div>
        <div className="DashboardLeftTopLine__title">{intl.formatMessage(messages.eMode)}</div>
        {userEmodeCategoryId === 0 ? (
          <div
            className="DashboardLeftTopLine__toggleDisabled"
            onClick={() => setModalVisible(true)}
          >
            {intl.formatMessage(messages.off)}
          </div>
        ) : (
          <div className="DashboardLeftTopLine__toggleActive" onClick={() => setModalVisible(true)}>
            {getEmodeMessage(userEmodeCategoryId, intl)}
          </div>
        )}
        <div className="DashboardLeftTopLine__toggleSwitch" onClick={() => setModalVisible(true)}>
          '⚙️'
        </div>
        <EModeModal visible={modalVisible} setVisible={setModalVisible} />
        <style jsx={true}>{staticStyles}</style>
      </div>
    );
  } else {
    return null;
  }
}
