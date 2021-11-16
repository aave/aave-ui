import React, { useState, ChangeEvent, useEffect } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import { useThemeContext, BasicModal, rgba } from '@aave/aave-ui-kit';
import { valueToBigNumber, normalize } from '@aave/protocol-js';

import Row from '../../basic/Row';
import Value from '../../basic/Value';
import Caption from '../../basic/Caption';
import DefaultButton from '../../basic/DefaultButton';
import Link from '../../../components/basic/Link';
import useGetGasPrices, { ResponseGasPrice } from '../../../libs/hooks/use-get-gas-prices';
import { gasPriceFormat } from '../index';

import messages from './messages';
import staticStyles from './style';

import whiteCloseIcon from '../../../images/whiteCloseIcon.svg';
import closeIcon from '../../../images/closeIcon.svg';
import warningIcon from '../../../images/warningIconOrange.svg';

export interface Gas {
  txName: string;
  gasLimit: string;
}

export interface GasEstimations {
  gas: Gas[];
  defaultGasPrice: string;
  totalGas: string;
}

interface EditorModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  gasTxs: GasEstimations;
  marketRefPriceInUsd: string;
  customGasPrice: string | null;
  setCustomGasPrice: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<GasKeys>>;
  selectedOption: GasKeys;
  manualPriceValue: string | number;
  setManualPriceValue: (value: string | number) => void;
}

export enum GasKeys {
  safeLow = 'safeLow',
  average = 'average',
  fast = 'fast',
  fastest = 'fastest',
  manual = 'manual',
}

export default function EditorModal({
  visible,
  setVisible,
  gasTxs,
  customGasPrice,
  marketRefPriceInUsd,
  setCustomGasPrice,
  selectedOption,
  setSelectedOption,
  manualPriceValue,
  setManualPriceValue,
}: EditorModalProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();

  const formattedManualPrice =
    manualPriceValue > 0 && selectedOption === GasKeys.manual
      ? manualPriceValue
      : gasPriceFormat(gasTxs.defaultGasPrice);

  const { data: apiGasPrice, loading } = useGetGasPrices();
  const [selected, setSelected] = useState<GasKeys>(selectedOption);
  const [manualPrice, setManualPrice] = useState(formattedManualPrice);
  const [gasPrice, setGasPrice] = useState(customGasPrice || gasTxs.defaultGasPrice);

  const totalEstimation = normalize(valueToBigNumber(gasTxs.totalGas).times(gasPrice), 18);

  const handleUpdateGasManual = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const parsedValue = new BigNumber(event.currentTarget.value || '0')
      .multipliedBy(new BigNumber(10).pow(9))
      .toFixed(0);
    setManualPrice(event.currentTarget.value);
    setGasPrice(parsedValue.toString());
    setSelected(GasKeys.manual);
  };

  const handleSelectOption = (option: GasKeys, gasPrice: string) => {
    setGasPrice(gasPrice);
    setSelected(option);
  };

  const handleConfirmGasPrice = () => {
    setCustomGasPrice(gasPrice);
    setSelectedOption(selected);
    setManualPriceValue(manualPrice);
    setVisible(false);
  };

  useEffect(() => {
    setSelected(selectedOption);
    setManualPrice(formattedManualPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  if (!apiGasPrice) return null;

  const hoverBackground = rgba(`${currentTheme.primary.rgb}, 0.1`);

  const txEstimationModalInput = (time: number, key: keyof ResponseGasPrice) => {
    let message: MessageDescriptor = { id: '', defaultMessage: '' };

    if (key === GasKeys.average) {
      message = messages.standard;
    } else if (key === GasKeys.fast) {
      message = messages.fast;
    } else if (key === GasKeys.fastest) {
      message = messages.instant;
    }

    return (
      <button
        className={classNames('TxEstimationModal__input', {
          TxEstimationModal__inputSelected: selected === key,
        })}
        onClick={() => {
          handleSelectOption(key as GasKeys, apiGasPrice[key].legacyGasPrice);
        }}
      >
        <div className="TxEstimationModal__inputValue">
          {gasPriceFormat(apiGasPrice[key].legacyGasPrice)}
        </div>

        <div className="TxEstimationModal__inputDescription">
          <p>{intl.formatMessage(message)}</p>
          <span>{intl.formatMessage(messages.time, { time: time })}</span>
        </div>
      </button>
    );
  };

  return (
    <BasicModal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      withCloseButton={true}
      className="TxEstimationModal__wrapper"
      closeIcon={isCurrentThemeDark ? whiteCloseIcon : closeIcon}
    >
      <div className="TxEstimationModal">
        <Caption
          title={intl.formatMessage(messages.caption)}
          description={intl.formatMessage(messages.description)}
        />

        {gasTxs.gas.length > 1 && (
          <div className="TxEstimationModal__warningArea">
            <img src={warningIcon} alt="" />
            <p>{intl.formatMessage(messages.warningText)}</p>
          </div>
        )}

        <div className="TxEstimationModal__content-description">
          <p>{intl.formatMessage(messages.valuesDescription)}</p>
        </div>
        <div className="TxEstimationModal__content">
          {gasTxs.gas.map((tx, i) => {
            const estimation = normalize(valueToBigNumber(tx.gasLimit).times(gasPrice), 18);
            return (
              <Row title={`${tx.txName}:`} withMargin={true} key={`steps-${i}`}>
                <div className="TxEstimationModal__contentValues">
                  <Value value={Number(estimation)} symbol="ETH" />
                  <span className="TxEstimationModal__contentValues--separator">/</span>
                  <Value
                    value={valueToBigNumber(estimation)
                      .multipliedBy(marketRefPriceInUsd)
                      .toNumber()}
                    symbol="USD"
                  />
                </div>
              </Row>
            );
          })}

          <Row title={intl.formatMessage(messages.total)}>
            <div className="TxEstimationModal__contentValues TxEstimationModal__total">
              <Value
                className="TxEstimationModal__total"
                value={Number(totalEstimation)}
                symbol="ETH"
              />
              <span className="TxEstimationModal__contentValues--separator">/</span>
              <Value
                className="TxEstimationModal__total"
                value={valueToBigNumber(totalEstimation)
                  .multipliedBy(marketRefPriceInUsd)
                  .toNumber()}
                symbol="USD"
              />
            </div>
          </Row>
        </div>

        <div className="TxEstimationModal__content-description">
          <p>{intl.formatMessage(messages.optionsTitle)}</p>
        </div>
        <div className="TxEstimationModal__options">
          {txEstimationModalInput(5, GasKeys.average)}
          {txEstimationModalInput(2, GasKeys.fast)}
          {txEstimationModalInput(0, GasKeys.fastest)}

          <div className="TxEstimationModal__input">
            <div className="TxEstimationModal__inputValue">
              <input
                type="number"
                value={manualPrice}
                onChange={handleUpdateGasManual}
                onFocus={handleUpdateGasManual}
              />
            </div>
            <div className="TxEstimationModal__inputDescription">
              <p>{intl.formatMessage(messages.manual)}</p>
            </div>
          </div>
        </div>

        <div className="TxEstimationModal__confirm">
          <DefaultButton
            className="TxEstimationModal__button"
            title={intl.formatMessage(messages.confirm)}
            disabled={loading}
            onClick={handleConfirmGasPrice}
            type="button"
          />
          <div className="TxEstimationModal__footer">
            {intl.formatMessage(messages.readMore, {
              link: (
                <Link
                  to="https://apiv5.paraswap.io/prices/gas/1?eip1559=true"
                  title="apiv5.paraswap.io"
                  color="secondary"
                  absolute={true}
                  inNewWindow={true}
                />
              ),
            })}
          </div>
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .TxEstimationModal__wrapper {
          background: ${currentTheme.whiteElement.hex} !important;
        }

        .TxEstimationModal {
          color: ${currentTheme.textDarkBlue.hex};

          &__warningArea {
            background: ${currentTheme.mainBg.hex};
          }

          &__content {
            background: ${currentTheme.whiteItem.hex};
            border: 1px solid
              ${isCurrentThemeDark ? currentTheme.mainBg.hex : currentTheme.darkBlue.hex};
          }

          &__options {
            .TxEstimationModal__input {
              background: ${currentTheme.mainBg.hex};
              color: ${currentTheme.textDarkBlue.hex};
              &:after {
                background: ${hoverBackground};
              }

              &.TxEstimationModal__inputSelected,
              &:hover {
                border-color: ${currentTheme.primary.hex};
              }
              &:last-child {
                color: ${currentTheme.textDarkBlue.hex};
                border: 1px solid ${currentTheme.textDarkBlue.hex};
              }

              input {
                color: ${currentTheme.textDarkBlue.hex};
              }
            }

            .TxEstimationModal__inputDescription {
              span {
                color: ${currentTheme.lightBlue.hex};
              }
            }
          }

          .TxEstimationModal__total,
          .TxEstimationModal__total .Value__value {
            color: ${currentTheme.primary.hex};
          }
        }
      `}</style>
    </BasicModal>
  );
}
