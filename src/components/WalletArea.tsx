import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import EtherscanLink from "./EtherscanLink";

export function WalletButton() {
  const dispatch = useDispatch();
  return <button type="button" onClick={() => dispatch({ type: "CONNECT_WALLET" })}>
    Connect Wallet
  </button>
}

export default function WalletArea() {
  const { currentAccount } = useSelector((s : any) => s.wallet, shallowEqual);

  if (!!currentAccount) {
    return <span className="walletArea">
      🟢&nbsp;
      <EtherscanLink address={currentAccount} abbreviate={true} />
      &nbsp;
      <button>Disconnect</button>
    </span>;
  }
  return <span className="walletArea">
    <WalletButton />
  </span>;
}
