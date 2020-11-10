import { BigNumber, Signer } from "ethers";
import Web3Modal from "web3modal";

import { Token } from "../types";

export interface Balances {
  [key: string] : {
    balance: BigNumber,
    token: Token,
  };
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
      const { token, balance } = action.payload;
      let balances = { ...state.balances };
      if (state.balances[token.symbol]) {
        balances[token.symbol].balance = balance;
      } else {
        balances[token.symbol] = { token, balance };
      }
      return {
        balances,
        ...state
      };
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
