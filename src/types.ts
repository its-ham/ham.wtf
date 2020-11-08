import { BigNumber as _BigNumber } from "ethers";

export type BigNumber = _BigNumber;

export interface Token {
    contractAddress: string;
    symbol: string;
    decimals?: BigNumber;
}

export enum FarmType {
  Basic,
  Trough,
  CompostHeap,
  Dam
}

export interface BaseFarm {
  contractAddress?: string;
  type: FarmType;
  wrappedToken?: Token;
  amountStaked?: BigNumber;
  amountEarned?: BigNumber;
  totalStaked?: BigNumber;
  rewardPerToken?: BigNumber;
  rewardsRemaining?: BigNumber;
  startTime?: BigNumber;
  duration?: BigNumber;
}

export interface Trough extends BaseFarm {
  rewardMultiplier?: BigNumber;
  rewardDivisor?: BigNumber;
}

export interface Dam extends BaseFarm {
  acceptedLPTokens?: Token[];
}

export interface CompostHeap extends BaseFarm {
  tokensToSell?: Token[];
}

export type Farm = (BaseFarm | Trough | Dam | CompostHeap);
