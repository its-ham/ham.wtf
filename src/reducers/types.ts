import { BigNumber } from "ethers";

export interface Token {
    contractAddress: string;
    symbol: string;
    decimals: BigNumber;
}
