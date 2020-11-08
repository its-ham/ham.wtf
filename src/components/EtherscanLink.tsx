import React from 'react';

function abbreviateAddress(address : string) : string {
  return `${address.slice(0, 6)}...${address.slice(-2)}`;
}

interface EtherscanLinkProps {
  address: string;
  token?: boolean;
  abbreviate?: boolean;
  children?: any;
}

export function EtherscanLink(props : EtherscanLinkProps) {
  const { address, token, abbreviate, children } = props;
  const addressLabel = children || (abbreviate ? abbreviateAddress(address) : address);
  return <a className="etherscan-link" target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/${ token ? "token" : "address"}/${address}`}>
  { addressLabel }
  </a>;
}

export function TokenLink(props : EtherscanLinkProps) {
  return <EtherscanLink token={true} {...props} />;
}

export default EtherscanLink;
