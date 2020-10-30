import { put, all } from "redux-saga/effects";

import { watchDefaultProvider } from "./chain";
import { watchConnectWallet, watchDisconnectWallet } from "./wallet";

function* initialize() {
	yield put({ type: "RETRIEVE_DEFAULT_PROVIDER" });
}

export default function* rootSaga() {
  yield all([
    initialize(),
    watchDefaultProvider(),
    watchConnectWallet(),
    watchDisconnectWallet()
  ])
}
