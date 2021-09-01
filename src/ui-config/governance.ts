import { Network } from '@aave/protocol-js';

export interface GovernanceConfig {
  network: Network;
  votingAssetName: string;
  averageNetworkBlockTime: number;
  queryGovernanceDataUrl: string;
  wsGovernanceDataUrl: string;
  aaveTokenAddress: string;
  aAaveTokenAddress: string;
  stkAaveTokenAddress: string;
  governanceForumLink: string;
  governanceFAQLink: string;
  addresses: {
    AAVE_GOVERNANCE_V2: string;
    AAVE_GOVERNANCE_V2_EXECUTOR_SHORT: string;
    AAVE_GOVERNANCE_V2_EXECUTOR_LONG: string;
    AAVE_GOVERNANCE_V2_HELPER: string;
  };
}

export const governanceConfig: GovernanceConfig | undefined = undefined;
