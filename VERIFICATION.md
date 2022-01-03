# Verification

This guide will show the process of verifying that you are submitting transactions to the correct contract addresses when interacting with the Aave protocol

The [deployed contracts page](https://docs.aave.com/developers/deployed-contracts/deployed-contracts) gives a breakdown of code and contract addresses for all components of the Aave Protocol. On the left side of the page there are links to the deployed contracts page for each network where the Aave Protocol is deployed.

## Deposit  

### Approve

For all tokens except network base tokens (ETH, MATIC, AVAX), a token approval is required before depositing. The approval is called on the underlying asset (i.e. DAI token contract if you are approving the spending of DAI) and the "to" address for the token approval is the **LendingPool** contract.

### Deposit

For all tokens except network base tokens (ETH, MATIC, AVAX), the deposit function is called on the **LendingPool** contract

### Deposit Network Base Tokens

For network base tokens, the depositETH function is called on the **WETHGateway** contract which is used to wrap and deposit

## Withdraw  

There is no approval required to withdraw assets. The withdraw function is called on the **LendingPool** contract

### Withdraw Network Base Tokens

For network base tokens, the withdrawETH function is called on the **WETHGateway** contract which is used to unwrap and withdraw

## Borrow  

For all tokens except network base tokens, the borrow function is called on the **LendingPool** contract

### Borrow Network Base Tokens

For network base tokens, there are two steps. First, approveDelegation is called on the debt token (i.e. variableDebtWrappedAVAX if you are borrowing AVAX with a variable rate) and approves a delegation to the **WETHGateway** contract. Next, the borrow calls borrowETH on the **WETHGateway** contract.

## Repay  

### Approve

For all tokens except network base tokens (ETH, MATIC, AVAX), a token approval is required before repaying. The approval is called on the underlying asset (i.e. DAI token contract if you are approving the spending of DAI) and the "to" address for the token approval is the **LendingPool** contract.

### Repay

For all tokens except network base tokens (ETH, MATIC, AVAX), the repay function is called on the **LendingPool** contract

### Repay Network Base Tokens

For network base tokens, the repayETH function is called on the **WETHGateway** contract which is used to wrap and repay

## Stake  

### Approve

The approval is called on the Aave token contract and the "to" address for the approval is the **stkAave** contract which can be found in the [governance](https://docs.aave.com/developers/protocol-governance/governance) section

### Stake

The stake function is called on the **stkAave** token

## Voting  

A vote is submitted by calling the submitVote function on the **AaveGovernenceV2** contract which can be found in the [governance](https://docs.aave.com/developers/protocol-governance/governance) section