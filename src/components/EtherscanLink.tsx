import React from 'react';

function abbreviateAddress(address : string) : string {
  return `${address.slice(0, 6)}...${address.slice(-2)}`;
}

interface EtherscanLinkProps {
  address: string;
  token?: boolean;
  abbreviate?: boolean;
}

function EtherscanLink(props : EtherscanLinkProps) {
  const { address, token, abbreviate } = props;
return <a className="etherscan-link" target="_blank" href={`https://etherscan.io/${ token ? "token" : "address"}/${address}`}>{ abbreviate ? abbreviateAddress(address) : address }</a>;
}

export default EtherscanLink;
