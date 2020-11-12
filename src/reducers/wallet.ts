import { BigNumber, Signer } from "ethers";
import Web3Modal from "web3modal";
import { fromJS }  from "immutable";

import { Token } from "../types";

export interface TokenBalance {
  balance: BigNumber,
  token: Token,
}

export interface Balances {
  [key: string] : TokenBalance;
}

export interface WalletState {
  accounts?: string[];
  currentAccount?: string;
  signer?: Signer;
  web3modal?: Web3Modal;
  balances: Balances;
  balance?: BigNumber;
}

export default function (state : WalletState = { balances: {} }, action : any) : WalletState {
  switch(action.type) {
    case "SET_TOKEN_BALANCE":
      const { token } = action.payload;
      const newTokenBal = fromJS(action.payload);
      return fromJS(state).updateIn(["balances", token.symbol], (tokenBal : any) => tokenBal ? tokenBal.mergeDeep(newTokenBal) : newTokenBal).toJS() as WalletState;
    case "SET_ETH_BALANCE":
      return { balance: action.payload.ethBalance, ...state };
    case "SET_WEB3MODAL":
      return { web3modal: action.payload.web3modal, ...state };
    case "SET_SIGNER":
      let address = action.payload.signer.address;
      let newState = {
        signer: action.payload.signer,
        ...state
      };
      if (!!address) {
        newState.currentAccount = address;
      }
      return newState;
    case "SET_ACCOUNTS":
      return {
        accounts: action.payload.accounts,
        ...state
      };
    case "SET_CURRENT_ACCOUNT":
      return {
        currentAccount: action.payload.currentAccount,
        ...state
      };
  }
  return state;
}
