import { Signer } from "ethers";
import Web3Modal from "web3modal";

export interface WalletState {
  accounts?: string[];
  currentAccount?: string;
  signer?: Signer;
  web3modal?: Web3Modal;
}

export default function (state : WalletState = {}, action : any) : WalletState {
  switch(action.type) {
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
