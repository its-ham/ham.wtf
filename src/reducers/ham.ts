import { BigNumber } from "ethers";

import { Token } from "../types";

export interface HamState {
  supply?: BigNumber;
  priceInUSD?: BigNumber;
  numberOfHolders?: BigNumber;
  token?: Token;
}

export default function (state : HamState = {}, action : any) : HamState {
  return state;
}
