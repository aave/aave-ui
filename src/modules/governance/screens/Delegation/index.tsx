import React, { FormEvent, useState } from 'react';
import { MessageDescriptor, useIntl } from 'react-intl';
import { ethers } from 'ethers';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useThemeContext, canBeEnsAddress } from '@aave/aave-ui-kit';

import { useStaticPoolDataContext } from '../../../../libs/pool-data-provider';
import DefaultButton from '../../../../components/basic/DefaultButton';
import GovernanceWrapper from '../../components/GovernanceWrapper';
import ContentWrapper from '../../../../components/wrappers/ContentWrapper';
import Caption from '../../../../components/basic/Caption';
import SelectField from '../../../../components/fields/SelectField';
import Value from '../../../../components/basic/Value';
import TextField from '../../../../components/fields/TextField';
import DelegationFieldInner from './components/DelegationFieldInner';
import { useAaveTokensProviderContext } from '../../../../libs/aave-tokens-balance-provider/AaveTokensBalanceProvider';
import { useGovernanceDataContext } from '../../../../libs/governance-provider';
import { TokenIcon } from '../../../../helpers/config/assets-config';

import messages from './messages';
import staticStyles from './style';

import { Asset, DELEGATED_ASSETS, delegationTypes } from './types';

export default function Delegation() {
  const intl = useIntl();
  const location = useLocation();
  const history = useHistory();
  const { lg, md } = useThemeContext();

  const [isAssetSelectVisible, setAssetSelectVisible] = useState(false);
  const [asset, setAsset] = useState<Asset>();

  const [isDelegationTypeSelectVisible, setDelegationTypeSelectVisible] = useState(false);
  const [delegationType, setDelegationType] = useState('');

  const [delegationTypeLabel, setDelegationTypeLabel] = useState<MessageDescriptor>({
    id: '',
    defaultMessage: '',
  });

  const [toAddress, setToAddress] = useState('');
  const [toAddressError, setToAddressError] = useState('');

  // Get the users balance for AAVE and stkAave
  const { aaveTokens } = useAaveTokensProviderContext();
  const { userId } = useStaticPoolDataContext();
  const {
    governanceConfig: { aaveTokenAddress, stkAaveTokenAddress },
  } = useGovernanceDataContext();

  const hasBalance = Number(aaveTokens.aave) + Number(aaveTokens.stkAave) > 0;

  const delegationAssets: Asset[] = [
    {
      symbol: DELEGATED_ASSETS[0].symbol,
      icon: DELEGATED_ASSETS[0].icon,
      value: Number(aaveTokens.aave),
      address: aaveTokenAddress,
    },
    {
      symbol: DELEGATED_ASSETS[1].symbol,
      icon: DELEGATED_ASSETS[1].icon,
      value: Number(aaveTokens.stkAave),
      address: stkAaveTokenAddress,
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ethers.utils.isAddress(toAddress) && !canBeEnsAddress(toAddress)) {
      setToAddressError(intl.formatMessage(messages.toAddressError));
      return;
    }

    if (!!userId && !!asset && !!delegationType && !!toAddress) {
      const query = queryString.stringify({
        asset: asset.symbol,
        assetAddress: asset.address,
        assetValue: asset.value,
        delegationType,
        toAddress,
      });
      history.push(`${location.pathname}/confirmation?${query}`);
    }
  };

  const iconSize = lg && !md ? 24 : 30;

  return (
    <GovernanceWrapper className="Delegation" withMobileGrayBg={false}>
      <ContentWrapper withFullHeight={true} withBackButton={true}>
        <div className="Delegation__content">
          <Caption
            title={intl.formatMessage(messages.caption)}
            description={intl.formatMessage(messages.description)}
          />

          <form onSubmit={handleSubmit} className="Delegation__form">
            <DelegationFieldInner title={intl.formatMessage(messages.asset)}>
              <SelectField
                className="Delegation__select"
                visible={isAssetSelectVisible}
                setVisible={setAssetSelectVisible}
                placeholder={intl.formatMessage(messages.selectAssetToDelegate)}
                value={!!asset && asset.symbol}
              >
                {delegationAssets.map((item: Asset, index) => (
                  <button
                    className="Delegation__select-item"
                    type="button"
                    onClick={() => {
                      setAsset(item);
                      setAssetSelectVisible(false);
                    }}
                    disabled={asset?.symbol === item.symbol}
                    key={index}
                  >
                    <TokenIcon
                      tokenSymbol={item.symbol.toUpperCase()}
                      tokenFullName={item.symbol}
                      height={iconSize}
                      width={iconSize}
                      onWhiteBackground={true}
                    />
                    <Value value={item.value} maximumValueDecimals={5} onWhiteBackground={true} />
                  </button>
                ))}
              </SelectField>
            </DelegationFieldInner>

            <DelegationFieldInner title={intl.formatMessage(messages.type)}>
              <SelectField
                className="Delegation__select"
                visible={isDelegationTypeSelectVisible}
                setVisible={setDelegationTypeSelectVisible}
                placeholder={intl.formatMessage(messages.selectDelegationType)}
                value={!!delegationType ? intl.formatMessage(delegationTypeLabel) : ''}
              >
                {delegationTypes.map((item, index) => (
                  <button
                    className="Delegation__select-item"
                    type="button"
                    onClick={() => {
                      setDelegationType(item.value);
                      setDelegationTypeLabel(item.label);
                      setDelegationTypeSelectVisible(false);
                    }}
                    disabled={delegationType === item.value}
                    key={index}
                  >
                    <span>{intl.formatMessage(item.label)}</span>
                  </button>
                ))}
              </SelectField>
            </DelegationFieldInner>

            <DelegationFieldInner title={intl.formatMessage(messages.delegationToAddress)}>
              <div className="Delegation__textField-inner" onChange={() => setToAddressError('')}>
                <TextField
                  value={toAddress}
                  onChange={setToAddress}
                  placeholder={intl.formatMessage(messages.enterETHAddress)}
                  error={toAddressError}
                />
              </div>
            </DelegationFieldInner>

            <div className="Delegation__button-inner">
              <DefaultButton
                title={intl.formatMessage(messages.buttonTitle)}
                mobileBig={true}
                disabled={
                  !userId ||
                  !asset ||
                  !delegationType ||
                  !toAddress ||
                  !!toAddressError ||
                  !hasBalance
                }
                type="submit"
              />
            </div>
          </form>
        </div>
      </ContentWrapper>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
    </GovernanceWrapper>
  );
}
