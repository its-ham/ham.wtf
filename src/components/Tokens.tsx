import React, { useState } from 'react';

import { BigNumber } from 'ethers';
import Big from 'big.js';

import './Tokens.scss';

export interface TokenInputProps {
  max?: BigNumber;
  decimals: number;
  onChange?: (n: BigNumber) => void;
}

function toFixed(n : BigNumber, decimals : number, decimalsToShow : number) : string {
    return Big(n.toString()).div(Big(10).pow(decimals)).toFixed(decimalsToShow);
}

export function TokenAmountInput(props : TokenInputProps) {
  const { max, decimals } = props;

  const fixedMax = max && !BigNumber.from(0).eq(max) ? toFixed(max, decimals, 2) : undefined;

  const [ value, setValue ] = useState("0.00");

  function onChange(e : any) {
    const v = e.target.value;
    setValue(v);
    if (!!props.onChange && v !== "") {
      props.onChange(BigNumber.from(Big(v).mul(Big(10).pow(decimals)).toFixed(0)));
    }
  }

  return <div className="input-wrapper">
    <input type="number" placeholder="0.0" step="0.10" min="0.00" max={fixedMax} value={value} onChange={onChange} />
    { fixedMax ? <a className="max" role="button" onClick={() => setValue(fixedMax)}>max</a> : <span className="max">max</span> }
  </div>;
}
