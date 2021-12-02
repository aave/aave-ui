import { useIntl } from 'react-intl';
import { useThemeContext, BasicModal } from '@aave/aave-ui-kit';
import { useDynamicPoolDataContext, useStaticPoolDataContext } from '../../libs/pool-data-provider';
import Row from '../basic/Row';
import Caption from '../basic/Caption';

import messages from './messages';
import staticStyles from './style';
import { getEmodeMessage } from '../../ui-config/branding/DashboardLeftTopLine';
import DefaultButton from '../basic/DefaultButton';
import { formatUserSummary } from '@aave/math-utils';
import { useCurrentTimestamp } from '../../libs/pool-data-provider/hooks/use-current-timestamp';
import { useHistory } from 'react-router';

interface EModeModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function EModeModal({ visible, setVisible }: EModeModalProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();
  const {
    userEmodeCategoryId,
    rawUserReserves,
    marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd,
  } = useStaticPoolDataContext();
  const { reserves, user } = useDynamicPoolDataContext();
  const currentTimestamp = useCurrentTimestamp(1);
  const history = useHistory();

  const eModeEnabled = userEmodeCategoryId !== 0;

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

  let disableError = '';
  user?.userReservesData.forEach((userReserve) => {
    if (
      (Number(userReserve.scaledVariableDebt) > 0 || Number(userReserve.principalStableDebt) > 0) &&
      userReserve.reserve.eModeCategoryId !== selectedEmodeCategoryId
    ) {
      disableError = intl.formatMessage(messages.eModeDisabledNote);
    }
  });
  if (eModeEnabled && rawUserReserves) {
    const newSummary = formatUserSummary({
      currentTimestamp,
      marketReferencePriceInUsd,
      marketReferenceCurrencyDecimals,
      rawUserReserves,
      userEmodeCategoryId: 0,
    });
    if (Number(newSummary.healthFactor) < 1.01 && newSummary.healthFactor !== '-1') {
      disableError = intl.formatMessage(messages.eModeDisabledLiquidation);
    }
  }

  const handleButtonPress = async () => {
    const newMode = eModeEnabled ? '0' : selectedEmodeCategoryId.toString();
    const url = '/emode/confirm/' + newMode;
    history.push(url);
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
          {disableError ? <div className="EModeModal__error">{disableError}</div> : <></>}

          <DefaultButton
            onClick={handleButtonPress}
            className="EModeModal__button"
            title={
              eModeEnabled
                ? intl.formatMessage(messages.disableEmode)
                : intl.formatMessage(messages.enableEmode)
            }
            mobileBig={true}
            disabled={disableError !== ''}
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
