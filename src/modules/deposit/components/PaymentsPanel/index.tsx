import React from 'react';
import { useIntl } from 'react-intl';
import { useThemeContext } from '@aave/aave-ui-kit';

import { usePayments } from '../../../../helpers/payments';
import Link from '../../../../components/basic/Link';

import messages from './messages';
import staticStyles from './style';

interface PaymentsPanelProps {
  currencySymbol: string;
  withoutOrTitle?: boolean;
}

export default function PaymentsPanel({ currencySymbol, withoutOrTitle }: PaymentsPanelProps) {
  const intl = useIntl();
  const { currentTheme, sm } = useThemeContext();
  const { payments, paymentClick, isPaymentNashNotOnMainMarket } = usePayments();

  return (
    <div className="PaymentsPanel">
      {!withoutOrTitle && (
        <div className="PaymentsPanel__mobileTop-line">
          <p>{intl.formatMessage(messages.or)}</p>
        </div>
      )}

      <div className="PaymentsPanel__content">
        <div className="PaymentsPanel__text">
          <p>
            {intl.formatMessage(messages.description, {
              countryOfResidence: (
                <Link
                  to="https://integrate.transak.com/Coverage-Payment-Methods-Fees-Limits-30c0954fbdf04beca68622d9734c59f9"
                  inNewWindow={true}
                  absolute={true}
                  color="primary"
                >
                  {intl.formatMessage(messages.countryOfResidence)}
                </Link>
              ),
            })}
          </p>
        </div>
        <div className="PaymentsPanel__buttons">
          {payments.map((payment) => (
            <React.Fragment key={payment.name}>
              {payment.availableAssets?.length ? (
                <>
                  {payment.availableAssets?.includes(currencySymbol.toUpperCase()) && (
                    <>
                      {isPaymentNashNotOnMainMarket(payment.name) ? (
                        <></>
                      ) : (
                        <button
                          onClick={() => paymentClick(payment.name, currencySymbol)}
                          className="PaymentsPanel__button"
                        >
                          <div className="PaymentsPanel__button-image">
                            <img src={payment.logo} alt={payment.name} />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </>
              ) : (
                <button
                  onClick={() => paymentClick(payment.name, currencySymbol)}
                  className="PaymentsPanel__button"
                >
                  <div className="PaymentsPanel__button-image">
                    <img src={payment.logo} alt={payment.name} />
                  </div>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style jsx={true} global={true}>
        {staticStyles}
      </style>
      <style jsx={true} global={true}>{`
        .PaymentsPanel {
          background: ${currentTheme.whiteItem.hex};
          border: 1px solid ${currentTheme.secondary.hex};
          color: ${currentTheme.textDarkBlue.hex};

          &__button {
            background: ${currentTheme.white.hex};
            &:hover {
              box-shadow: 0 0 9px 0 ${currentTheme.primary.hex};
            }
          }

          &__mobileTop-line {
            p {
              &:before,
              &:after {
                background: ${sm ? currentTheme.textDarkBlue.hex : currentTheme.darkBlue.hex};
              }
            }
          }
        }
      `}</style>
    </div>
  );
}
