import { ethers } from "ethers";
import { put, takeLatest } from "redux-saga/effects";

function* retrieveDefaultProvider() {
  const provider = ethers.getDefaultProvider("homestead", {
    alchemy: "6yoiLWZd4EedWEqtADlIilBnQx-9m8aY",
    infura: "0f30b33e3ca64e11b893c57b1dfad29b",
    quorum: 1
  });
  yield put({ type: 'SET_PROVIDER', payload: { provider } });
}

export function* watchDefaultProvider() {
  yield takeLatest('RETRIEVE_DEFAULT_PROVIDER', retrieveDefaultProvider)
}
