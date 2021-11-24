import { useIntl } from 'react-intl';
import { useThemeContext, BasicModal } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import Row from '../basic/Row';
import Caption from '../basic/Caption';

import messages from './messages';
import staticStyles from './style';
import { getEmodeMessage } from '../../ui-config/branding/DashboardLeftTopLine';
import DefaultButton from '../basic/DefaultButton';
import { useTxBuilderContext } from '../../libs/tx-provider';
import { Pool } from '@aave/contract-helpers';
import { sendEthTransaction, EthTransactionData } from '../../helpers/send-ethereum-tx';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';

interface EModeModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function EModeModal({ visible, setVisible }: EModeModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const { userEmodeCategoryId } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();
  const { lendingPool } = useTxBuilderContext();
  const { library: provider } = useWeb3React<providers.Web3Provider>();
  const [txData, setTxData] = useState({} as EthTransactionData);
  const eModeEnabled = userEmodeCategoryId !== 0;
  // Just to clean up console
  if (userEmodeCategoryId === 3) {
    console.log(txData);
  }
  // For now just assuming selected category is stablecoins, in the future this will depend on a selector
  const selectedEmodeCategoryId = 1;

  const availableAssets = reserves.filter((reserve) => {
    if (eModeEnabled) {
      return reserve.eModeCategoryId === userEmodeCategoryId;
    } else {
      return reserve.eModeCategoryId === selectedEmodeCategoryId;
    }
  });

  let avaialbleAssetsText = '';
  let first = true;
  availableAssets.forEach((asset) => {
    if (!first) {
      avaialbleAssetsText += ', ';
    }
    avaialbleAssetsText += asset.symbol;
    first = false;
  });

  let disableButton = false;
  user?.userReservesData.forEach((userReserve) => {
    if (
      (Number(userReserve.scaledVariableDebt) > 0 || Number(userReserve.principalStableDebt) > 0) &&
      userReserve.reserve.eModeCategoryId !== selectedEmodeCategoryId
    ) {
      disableButton = true;
    }
  });

  // TO-DO: This will trigger a seperate confirmation screen
  const handleButtonPress = async () => {
    const newPool: Pool = lendingPool as Pool;
    if (eModeEnabled) {
      const disableTransaction = await newPool.setUserEMode({
        user: user ? user.id : '',
        categoryId: 0,
      });
      await sendEthTransaction(disableTransaction[0].tx, provider, setTxData, null);
    } else {
      const enableTransaction = await newPool.setUserEMode({
        user: user ? user.id : '',
        categoryId: selectedEmodeCategoryId,
      });
      await sendEthTransaction(enableTransaction[0].tx, provider, setTxData, null);
    }
  };

  return (
    <BasicModal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      withCloseButton={true}
      className="EModeModal__wrapper"
    >
      <div className="EModeModal">
        <Caption
          title={intl.formatMessage(messages.efficiencyMode)}
          description={intl.formatMessage(messages.efficiencyModeDescription)}
          onWhiteBackground={true}
        />

        <div className="EModeModal__content">
          <Row
            title={intl.formatMessage(messages.status)}
            onWhiteBackground={true}
            withMargin={true}
          >
            {eModeEnabled
              ? intl.formatMessage(messages.enabled)
              : intl.formatMessage(messages.disabled)}
          </Row>

          <Row
            title={intl.formatMessage(messages.assetsCategory)}
            withMargin={true}
            onWhiteBackground={true}
          >
            {eModeEnabled
              ? getEmodeMessage(userEmodeCategoryId, intl)
              : getEmodeMessage(selectedEmodeCategoryId, intl)}
          </Row>

          <Row
            title={intl.formatMessage(messages.availableAssets)}
            withMargin={true}
            onWhiteBackground={true}
          >
            {avaialbleAssetsText}
          </Row>
          {/* TO-DO: Need styling here */}
          {disableButton ? (
            <p style={{ fontSize: '10px' }}>{intl.formatMessage(messages.eModeDisabledNote)}</p>
          ) : (
            <></>
          )}

          <DefaultButton
            onClick={handleButtonPress}
            className="EModeModal__button"
            title={
              eModeEnabled
                ? intl.formatMessage(messages.disableEmode)
                : intl.formatMessage(messages.enableEmode)
            }
            mobileBig={true}
            disabled={disableButton}
            type="submit"
          />
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .EModeModal {
          &__content {
            border: 1px solid ${currentTheme.darkBlue.hex};
          }
          &__subTitle {
            color: ${currentTheme.secondary.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
