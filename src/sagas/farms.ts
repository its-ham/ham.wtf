import { ethers } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

import { Farm, FarmType, Token } from "../types";
import { RootState } from "../reducers";

const farmABI = [
  "function _totalSupply() view returns (uint256)",
  "function rewardPerToken() public view returns (uint256)",
  "function periodFinish() public view returns (uint256)",
  "function rewardRate() public view returns (uint256)",
  "function earned(address account) public view returns (uint256)",
  "function balanceOf(address account) public view returns (uint256)",
  "function stake(uint256 amount) public",
];

const damABI = farmABI.concat([
  "function stake(address uniswapPair, uint256 amount) public",
]);

const erc20ABI = [
  "function balanceOf(address account) public view returns (uint256)",
  "function allowance(address account, address spender) public view returns (uint256)",
  "function approve(address spender, uint tokens) public returns (bool success)",
];

function* retrieveFarmInfo(provider : Provider, farm : Farm) {
  const account = yield select((s : RootState) => s.wallet.currentAccount);

  if (!!farm.contractAddress) {
    const contract = new ethers.Contract(farm.contractAddress, farmABI, provider);
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

function* stakeFarm(action : any) {
  const { amount, contractAddress } = action.payload;
  const [account, signer, provider, farms] = yield select((s : RootState) => [s.wallet.currentAccount, s.wallet.signer, s.chain.provider, s.farms]);
  const farm = farms.find((f : Farm) => f.contractAddress && f.contractAddress.toLowerCase() === contractAddress.toLowerCase());
  if (!farm || !farm.wrappedToken) {
    console.error(`Couldn't find farm ${ contractAddress } to stake`);
    return;
  }
  if (!account || !signer || !provider) {
    console.error(`Can't stake without wallet`);
    return;
  }
  const wrappedToken = farm.wrappedToken;
  const erc20 = new ethers.Contract(wrappedToken.contractAddress, erc20ABI, signer);
  yield call([erc20, erc20.approve], farm.contractAddress, amount)
  const contract = new ethers.Contract(farm.contractAddress, damABI, signer);
  yield call([contract, contract.stakeAndUnwrap], amount);
}

function* buildDam(action : any) {
  const { amount, lpTokenAddress, contractAddress } = action.payload;
  const [account, signer, provider, farms] = yield select((s : RootState) => [s.wallet.currentAccount, s.wallet.signer, s.chain.provider, s.farms]);
  const farm = farms.find((f : Farm) => f.contractAddress && f.contractAddress.toLowerCase() === contractAddress.toLowerCase() && f.type === FarmType.Dam);
  if (!farm || !farm.wrappedToken) {
    console.error(`Couldn't find dam ${ contractAddress } to build`);
    return;
  }
  let acceptedLPTokenContracts = new Set<string>((farm.acceptedLPTokens || []).map((t : Token) => t.contractAddress));
  if (!lpTokenAddress || !acceptedLPTokenContracts.has(lpTokenAddress)) {
    console.error("Unsupported LP token");
    return;
  }
  if (!account || !signer || !provider) {
    console.error(`Can't stake without wallet`);
    return;
  }
  const erc20 = new ethers.Contract(lpTokenAddress, erc20ABI, signer);
  yield call([erc20, erc20.approve], farm.contractAddress, amount)
  const contract = new ethers.Contract(farm.contractAddress, farmABI, signer);
  yield call([contract, contract.stakeAndUnwrap], amount);
}

export function* watchStakeFarm() {
  yield takeEvery('STAKE_FARM', stakeFarm);
}

export function* watchBuildDam() {
  yield takeEvery('BUILD_DAM', buildDam);
}

export function* watchSetCurrentAccount() {
  yield takeLatest('SET_CURRENT_ACCOUNT', retrieveAllFarmInfo);
}

export function* watchSetProvider() {
  yield takeLatest('SET_PROVIDER', retrieveAllFarmInfo);
}
