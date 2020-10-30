import { ethers } from "ethers";
import { put, takeLatest } from "redux-saga/effects";

function* retrieveDefaultProvider() {
	const provider = ethers.getDefaultProvider();
  yield put({ type: 'SET_PROVIDER', payload: { provider } });
}

export function* watchDefaultProvider() {
  yield takeLatest('RETRIEVE_DEFAULT_PROVIDER', retrieveDefaultProvider)
}
