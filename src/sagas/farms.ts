// TODO when there's a provider, look for the registry
// once we have the registry, pull all farms
// once we have all farms, if we have a wallet, get your balance
//   otherwise, wait until we have a wallet address, then show your balance
//   get all balances for all stakeable farm tokens as well
//


import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { Farm } from "../types";
import { RootState } from "../reducers";

function* retrieveFarmInfo(provider : Provider, farm : Farm) {
  const account = yield select((s : RootState) => s.wallet.currentAccount);
  const abi = [
    "function _totalSupply() view returns (uint256)",
    "function rewardPerToken() public view returns (uint256)",
    "function periodFinish() public view returns (uint256)",
    "function rewardRate() public view returns (uint256)",
    "function earned(address account) public view returns (uint256)",
    "function balanceOf(address account) public view returns (uint256)",
  ];

  if (!!farm.contractAddress) {
    const contract = new ethers.Contract(farm.contractAddress, abi, provider);
    const [totalStaked, rewardPerToken, periodFinish, rewardRate] = yield all([
      call([farm, contract._totalSupply]),
      call([farm, contract.rewardPerToken]),
      call([farm, contract.periodFinish]),
      call([farm, contract.rewardRate]),
    ]);

    const amountEarned = account ? yield call([farm, contract.earned], account) : undefined;
    const amountStaked = account ? yield call([farm, contract.balanceOf], account) : undefined;
    yield put({
      type: "SET_FARM_INFO",
      payload: {
        totalStaked, rewardPerToken, periodFinish, rewardRate, amountEarned,
        amountStaked, ...farm
      }
    });
  }
}

function* retrieveAllFarmInfo() {
  const [provider, farms] = yield select((s : RootState) => [s.chain.provider, s.farms]);
  yield all(farms.map((farm : Farm) => retrieveFarmInfo(provider, farm)));
}

export function* watchSetCurrentAccount() {
  yield takeLatest('SET_CURRENT_ACCOUNT', retrieveAllFarmInfo);
}

export function* watchSetProvider() {
  yield takeLatest('SET_PROVIDER', retrieveAllFarmInfo);
}
