import { BigNumber } from "ethers";

import { Token } from "./types";

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
  rewardPerToken?: BigNumber;
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

type Farm = (BaseFarm | Trough | Dam | CompostHeap);

export default function (state : Farm[]  = [], action : any) : Farm[] {
  return state;
}
