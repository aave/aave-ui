import React, { PropsWithChildren, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

export function storeReferralCode(referralCode: number, fromUrl: boolean = true): void {
  localStorage.setItem('referralCode', referralCode.toString());
  if (fromUrl) {
    localStorage.setItem('referralCodeFromUrl', referralCode.toString());
  }
}

export function getReferralCode(): string | undefined {
  return localStorage.getItem('referralCode') || undefined;
}

// referral code from Url has higher priority then code from wallet itseft, and to solve the mess with imToken we store it separately
// to know was imToken referral id from wallet itself or from url
export function getReferralCodeFromUrl(): string | null {
  return localStorage.getItem('referralCodeFromUrl');
}

export function removeReferralCode(): void {
  return localStorage.removeItem('referralCode');
}

export function ReferralHandler({ children }: PropsWithChildren<{}>) {
  const { search } = useLocation();
  useEffect(() => {
    const query = queryString.parse(search);
    const referralCode = Number(query.referral);
    const mockWalletAddress = query.mockWalletAddress ? String(query.mockWalletAddress) : undefined;
    if (mockWalletAddress) {
      localStorage.setItem('mockWalletAddress', mockWalletAddress);
    }
    if (Number.isInteger(Number(query.referral)) && referralCode >= -1 && referralCode <= 65535) {
      storeReferralCode(referralCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
}
