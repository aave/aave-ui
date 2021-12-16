import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { formatUserSummary } from '@aave/math-utils';
import { useThemeContext, BasicModal, rgba } from '@aave/aave-ui-kit';

import { useAppDataContext } from '../../../libs/pool-data-provider';
import { useCurrentTimestamp } from '../../../libs/pool-data-provider/hooks/use-current-timestamp';
import { getEmodeMessage } from '../../../helpers/e-mode/getEmodeMessage';
import Caption from '../../basic/Caption';
import Row from '../../basic/Row';
import Link from '../../basic/Link';
import EModeStatus from '../EModeStatus';
import DefaultButton from '../../basic/DefaultButton';

import messages from './messages';
import staticStyles from './style';

interface EModeModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export default function EModeModal({ visible, setVisible }: EModeModalProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const {
    userEmodeCategoryId,
    user,
    reserves,
    marketReferenceCurrencyDecimals,
    marketReferencePriceInUsd,
    userReserves,
  } = useAppDataContext();
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

  let availableAssetsText = '';
  let first = true;
  availableAssets.forEach((asset) => {
    if (!first) {
      availableAssetsText += ', ';
    }
    availableAssetsText += asset.symbol;
    first = false;
  });

  const assetsCategoryText = eModeEnabled
    ? getEmodeMessage(userEmodeCategoryId, intl)
    : getEmodeMessage(selectedEmodeCategoryId, intl);

  let disableError = undefined;
  user?.userReservesData.forEach((userReserve) => {
    if (
      (Number(userReserve.scaledVariableDebt) > 0 || Number(userReserve.principalStableDebt) > 0) &&
      userReserve.reserve.eModeCategoryId !== selectedEmodeCategoryId
    ) {
      disableError = intl.formatMessage(messages.eModeDisabledNote, {
        assetCategory: <strong>{assetsCategoryText}</strong>,
        link: (
          <Link
            to="https://docs.aave.com/faq/" // TODO: maybe need change link
            title={intl.formatMessage(messages.FAQs)}
            color="secondary"
            absolute={true}
            inNewWindow={true}
          />
        ),
      });
    }
  });

  if (eModeEnabled && user) {
    const newSummary = formatUserSummary({
      currentTimestamp,
      userReserves: userReserves,
      userEmodeCategoryId,
      marketReferenceCurrencyDecimals,
      marketReferencePriceInUsd,
    });
    if (Number(newSummary.healthFactor) < 1.01 && newSummary.healthFactor !== '-1') {
      disableError = intl.formatMessage(messages.eModeDisabledLiquidation);
    }
  }

  const handleButtonPress = () => {
    const newMode = eModeEnabled ? '0' : selectedEmodeCategoryId.toString();
    const url = '/emode/confirm/' + newMode;
    history.push(url);
  };

  return (
    <BasicModal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      withCloseButton={true}
      className="EModeModal"
    >
      <div className="EModeModal__content">
        <Caption
          title={intl.formatMessage(messages.efficiencyMode)}
          description={intl.formatMessage(messages.efficiencyModeDescription, {
            link: (
              <Link
                to="https://docs.aave.com/faq/" // TODO: maybe need change link
                title={intl.formatMessage(messages.learnMore)}
                color="secondary"
                absolute={true}
                inNewWindow={true}
              />
            ),
          })}
          onWhiteBackground={true}
        />

        <div className="EModeModal__content--info">
          <Row
            title={intl.formatMessage(messages.status)}
            onWhiteBackground={true}
            withMargin={true}
          >
            <EModeStatus isEModeEnabled={eModeEnabled} />
          </Row>

          <Row
            title={intl.formatMessage(messages.assetsCategory)}
            onWhiteBackground={true}
            withMargin={true}
          >
            <strong>{assetsCategoryText}</strong>
          </Row>

          <Row title={intl.formatMessage(messages.availableAssets)} onWhiteBackground={true}>
            <strong>{availableAssetsText}</strong>
          </Row>
        </div>

        <div className="EModeModal__content--note">
          <p>
            {disableError ||
              intl.formatMessage(messages.eModeEnableNote, {
                assetCategory: <strong>{assetsCategoryText}</strong>,
                link: (
                  <Link
                    to="https://docs.aave.com/faq/" // TODO: maybe need change link
                    title={intl.formatMessage(messages.FAQGuide)}
                    color="secondary"
                    absolute={true}
                    inNewWindow={true}
                  />
                ),
              })}
          </p>
        </div>

        <DefaultButton
          className={eModeEnabled ? 'EModeButton__dark' : undefined}
          onClick={handleButtonPress}
          title={
            eModeEnabled
              ? intl.formatMessage(messages.disableEmode)
              : intl.formatMessage(messages.enableEmode)
          }
          mobileBig={true}
          disabled={!!disableError}
          color={eModeEnabled ? 'dark' : 'primary'}
        />
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .EModeModal {
          &__content {
            &--info {
              border: 1px solid ${currentTheme.darkBlue.hex};
            }
            &--note {
              background: ${isCurrentThemeDark
                ? rgba(`${currentTheme.lightBlue.rgb}, 0.1`)
                : currentTheme.mainBg.hex};
              color: ${currentTheme.darkBlue.hex};
            }

            .EModeButton__dark {
              color: ${currentTheme.white.hex};
              background: ${currentTheme.darkBlue.hex};
              border-color: ${currentTheme.darkBlue.hex};
            }
          }
        }
      `}</style>
    </BasicModal>
  );
}
