import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";

import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { Token } from "../types";
import { RootState } from "../reducers";

function* connectWallet() {
  try {
    let modal = yield select((s : any) => s.wallet.web3modal);
    if (!modal) {
      modal = new Web3Modal();
      yield put({ type: "SET_WEB3MODAL", payload: { web3modal: modal }});
    }
    let baseProvider = yield call(() => modal.connect());
    let provider = new providers.Web3Provider(baseProvider);
    yield call(() => provider.getNetwork());
    yield put({ type: "SET_PROVIDER", payload: { provider }});

    let signer = provider.getSigner();
    yield put({ type: "SET_SIGNER", payload: { signer }});
    let accounts = yield call(() => provider.listAccounts());
    yield put({ type: "SET_ACCOUNTS", payload: { accounts }});
    if (accounts.length > 0) {
      yield put({ type: "SET_CURRENT_ACCOUNT", payload: { currentAccount: accounts[0] }});
    }
  } catch(e) {
    console.log("No wallet", e);
  }
}

function* disconnectWallet() {}

function* retrieveTokenBalance(provider : providers.Web3Provider, token : Token, account : string) {
  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
  ];
  const erc20 = new ethers.Contract(token.contractAddress, abi, provider);
  const balance = yield call([erc20, erc20.balanceOf], account);
  yield put({ type: "SET_TOKEN_BALANCE", payload: { balance, ...token }});
}

function* retrieveETHBalance(provider : providers.Web3Provider, account : string) {
  const balance = yield call([provider, provider.getBalance], account);
  yield put({ type: "SET_ETH_BALANCE", payload: { balance }});
}

function* retrieveBalances() {
  let [tokenBalances, provider, account] = yield select((s : RootState) =>
    [
      s.wallet.balances,
      s.chain.provider,
      s.wallet.currentAccount
    ]
  );
  yield retrieveETHBalance(provider, account);
  yield all(
    Object.entries(tokenBalances).map((value : [string, any]) =>
      retrieveTokenBalance(provider, value[1].token as Token, account)
  ));
}

export function* watchSetCurrentAccount() {
  yield takeLatest("SET_CURRENT_ACCOUNT", retrieveBalances);
}

export function* watchConnectWallet() {
  yield takeLatest("CONNECT_WALLET", connectWallet);
}

export function* watchDisconnectWallet() {
  yield takeLatest("DISCONNECT_WALLET", disconnectWallet);
}
