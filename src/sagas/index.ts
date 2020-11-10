import { put, all } from "redux-saga/effects";

import { watchDefaultProvider } from "./chain";
import { watchConnectWallet, watchDisconnectWallet, watchSetCurrentAccount } from "./wallet";
import { watchSetCurrentAccount as watchAccountForFarms, watchSetProvider as watchProviderForFarms, watchStakeFarm, watchBuildDam } from "./farms";

function* initialize() {
	yield put({ type: "RETRIEVE_DEFAULT_PROVIDER" });
}

export default function* rootSaga() {
  yield all([
    initialize(),
    watchDefaultProvider(),
    watchConnectWallet(),
    watchDisconnectWallet(),
    watchSetCurrentAccount(),
    watchAccountForFarms(),
    watchProviderForFarms(),
    watchStakeFarm(),
    watchBuildDam(),
  ])
}
