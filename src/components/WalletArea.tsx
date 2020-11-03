import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import EtherscanLink from "./EtherscanLink";

export default function WalletArea() {
  const { currentAccount } = useSelector((s : any) => s.wallet, shallowEqual);
  const dispatch = useDispatch();

  if (!!currentAccount) {
    return <span className="walletArea">
      🟢&nbsp;
      <EtherscanLink address={currentAccount} abbreviate={true} />
      &nbsp;
      <button>Disconnect</button>
    </span>;
  }
  return <span className="walletArea">
    <button onClick={() => dispatch({ type: "CONNECT_WALLET" })}>
      Connect Wallet
    </button>
  </span>;
}
