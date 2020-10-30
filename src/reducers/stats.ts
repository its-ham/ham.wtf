import { BigNumber } from "ethers";

export interface Stats {
  supply?: BigNumber;
  priceInUSD?: BigNumber;
  numberOfHolders?: BigNumber;
}

export default function (state : Stats = {}, action : any) : Stats {
  return state;
}
