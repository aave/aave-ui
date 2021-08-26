import React from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { API_ETH_MOCK_ADDRESS } from '@aave/protocol-js';
import { rgba, useThemeContext, textCenterEllipsis } from '@aave/aave-ui-kit';

import { useGetWalletsBalance } from '../../libs/pool-data-provider/hooks/use-get-wallets-balance';
import Preloader from '../basic/Preloader';

import staticStyles from './style';

interface AddressListProps {
  availableAddresses: string[];
  activeAddress?: string;
  pageSize: number;
  offset: number;
  onSelectAddress: (address: string, index: number) => void;
  skipPagination?: boolean;
}

export default function AddressList({
  availableAddresses,
  activeAddress,
  pageSize,
  offset,
  onSelectAddress,
  skipPagination,
}: AddressListProps) {
  const intl = useIntl();
  const { currentTheme } = useThemeContext();

  const { loading: balanceLoading, walletsData: wallets } = useGetWalletsBalance(
    availableAddresses,
    [API_ETH_MOCK_ADDRESS],
    18,
    30
  );
  const addressesPagination = skipPagination ? wallets : wallets.slice(offset, offset + pageSize);
  const hoverColor = rgba(`${currentTheme.primary.rgb}, 0.5`);

  return (
    <div
      className={classNames('AddressList', {
        AddressList__withPagination: availableAddresses.length > 4,
      })}
    >
      {addressesPagination.map((wallet, index) => (
        <button
          className={classNames('AddressList__address', {
            AddressList__addressActive: wallet.address === activeAddress,
          })}
          onClick={() => onSelectAddress(wallet.address, index)}
          type="button"
          disabled={wallet.address === activeAddress}
          key={index}
        >
          <p className="AddressList__address-text">
            {index + 1 + offset}. {textCenterEllipsis(wallet.address, 8, 8)}
          </p>
          {balanceLoading ? (
            <Preloader />
          ) : (
            <p className="AddressList__value">
              {intl.formatNumber(+wallet.balances[API_ETH_MOCK_ADDRESS], {
                maximumFractionDigits: 5,
                minimumFractionDigits: 5,
              })}
              <span>ETH</span>
            </p>
          )}
        </button>
      ))}

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .AddressList {
          &__address {
            &:hover {
              box-shadow: 0 1px 6px 0 ${hoverColor};
              border-color: ${currentTheme.primary.hex};
            }
            p {
              color: ${currentTheme.darkBlue.hex};
            }
          }

          &__addressActive {
            background: ${currentTheme.primary.hex};
            p {
              color: ${currentTheme.white.hex};
            }
          }
        }
      `}</style>
    </div>
  );
}
