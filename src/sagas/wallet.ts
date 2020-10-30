import { providers } from "ethers";
import Web3Modal from "web3modal";

import { call, put, select, takeLatest } from "redux-saga/effects";

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

function* disconnectWallet() {

}

export function* watchConnectWallet() {
  yield takeLatest("CONNECT_WALLET", connectWallet);
}

export function* watchDisconnectWallet() {
  yield takeLatest("DISCONNECT_WALLET", disconnectWallet);
}


// CONNECT_WALLET
// WALLET_CONNECTED (address, signer?)
// TODO
// once we have the wallet, pull the current ETH and HAM balance
// DISCONNECT_WALLET -> should fire off RETRIEVE_DEFAULT_PROVIDER?
//
