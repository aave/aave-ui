import avalancheLogo from './branding/images/avalancheLogo.svg';
import polygonLogo from './branding/images/polygonLogo.svg';
import { CustomMarket } from './markets';

export interface NetworkBannerConfig {
  networkName: string;
  bridgeName: string;
  bridgeUrl: string;
  brandColor: string;
  bridgeLogo: string;
}

// Pages where the banners should be displayed
export const DISPLAY_BANNER_PAGES = ['/deposit', '/borrow'];

export const networkBannerConfigs: { [key: string]: NetworkBannerConfig } = {
  [CustomMarket.proto_fuji]: {
    brandColor: '#E84142',
    networkName: 'Avalanche',
    bridgeName: 'Avalanche Bridge',
    bridgeUrl: 'https://bridge.avax.network/',
    bridgeLogo: avalancheLogo,
  },
  [CustomMarket.proto_matic]: {
    brandColor: '#8247E5',
    networkName: 'Polygon',
    bridgeName: 'Polygon PoS Bridge',
    bridgeUrl: 'https://wallet.matic.network/bridge/',
    bridgeLogo: polygonLogo,
  },
};
