import { useWeb3React } from '@web3-react/core';
import NashRamp from '@nash-io/ramp-widget-sdk';

import { useProtocolDataContext } from '../../libs/protocol-data-provider';

import * as logos from './images';
import { ENABLE_NASH } from '../config/onramp-config';
import { ChainId } from '@aave/contract-helpers';

enum PaymentName {
  nash = 'nash',
}

interface Payment {
  name: PaymentName;
  logo: string;
  availableAssets?: string[];
  initialized: boolean;
}

type Payments = {
  payments: Payment[];
  paymentClick: (name: PaymentName, currencySymbol: string) => void;
  isPaymentNashNotOnMainMarket: (name: PaymentName) => boolean;
};

export function usePayments(): Payments {
  const { account } = useWeb3React();
  const { currentMarketData } = useProtocolDataContext();
  const payments: Payment[] = [
    {
      name: PaymentName.nash,
      logo: logos.nashLogo,
      availableAssets: ['USDC', 'AAVE', 'ETH'],
      initialized: ENABLE_NASH,
    },
  ].filter((option) => option.initialized);

  const paymentClick = (name: PaymentName, currencySymbol: string) => {
    switch (name) {
      case PaymentName.nash:
        // @ts-ignore
        new NashRamp({
          env: 'PRODUCTION',
          base: 'eur',
          target: currencySymbol,
          destination: account || '',
        }).init({
          width: 500,
          height: 480,
          // @ts-ignore
          modal: true,
        });
        break;
    }
  };

  const isPaymentNashNotOnMainMarket = (name: PaymentName) =>
    (currentMarketData.chainId === ChainId.polygon ||
      currentMarketData.chainId === ChainId.mumbai) &&
    name === PaymentName.nash;

  return { payments, paymentClick, isPaymentNashNotOnMainMarket };
}
