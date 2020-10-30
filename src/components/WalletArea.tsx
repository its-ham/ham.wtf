import React from 'react';
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function abbreviateAddress(address : string) : string {
  return `${address.slice(0, 6)}...${address.slice(-2)}`;
}

export default function WalletArea() {
  const { currentAccount } = useSelector((s : any) => s.wallet, shallowEqual);
  const dispatch = useDispatch();

  if (!!currentAccount) {
    return <span className="walletArea">
      🟢&nbsp;
      <a href={`https://etherscan.io/address/${currentAccount}`}>{ abbreviateAddress(currentAccount) }</a>
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
