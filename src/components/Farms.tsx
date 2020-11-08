import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux'
import useEventListener from '@use-it/event-listener';

import { BigNumber } from 'ethers';

import { RootState } from "../reducers";

import EtherscanLink, { TokenLink } from "./EtherscanLink";
import { TokenAmountInput } from "./Tokens";
import Countdown from "./Countdown";
import { WalletButton } from "./WalletArea";

import iYamWhatIYam from '../images/i-yam-what-i-yam.png';
import notoriousPIG from '../images/notorious-pig.png';
import loveFindsAWay from '../images/love-finds-a-way.png';
import damPigs from '../images/dam-pigs.png';
import summonSam from '../images/summon-sam.png';
import lock from '../images/lock.png';
import "./Farms.scss";

interface FarmProps {
  callToAction?: string;
  contractAddress?: string;
  disabled?: boolean;
  imageSrc: string;
  title?: string;
  subtitle?: string;
  onClosePressed?: (e : any) => void;
  children?: any;
  dark?: boolean;
}

function ZoomedFarm(props : FarmProps) {
  const { children, contractAddress, disabled, imageSrc, title, subtitle } = props;
  const containerRef = useRef(null);

  const farm = useSelector((s : RootState) =>
    s.farms.find(x => x.contractAddress === contractAddress), shallowEqual);

  const endDate = farm && farm.startTime && farm.duration && new Date(farm.startTime.add(farm.duration).mul(1000).toNumber());

  const onContainerPressed = (event : any) => {
    if (event.target === containerRef.current &&
        props.onClosePressed !== undefined) {
      props.onClosePressed(event);
    }
  };

  useEventListener("keyup", (e : any) => {
    if (e.key === "Escape" && props.onClosePressed !== undefined) {
      props.onClosePressed(e);
    }
  });

  return <div ref={containerRef}
    className={classNames({zoomedFarm: true, dark: !!props.dark})}
    onClick={props.onClosePressed === undefined ? undefined : onContainerPressed}>
    <div className="zoomedFarmModal">
      <a className="close" onClick={props.onClosePressed || undefined}>&times;</a>
      <img src={imageSrc} alt="farm" />
      { (title || subtitle) &&
        <div className="sidebar">
          { title && <h2>{props.title}</h2> }
          { subtitle && <h3>{props.subtitle}</h3> }
          { children }
          <div className="farm-details">
            <dl>
              { endDate && <>
                  <dt>Time remaining:</dt>
                  <dd><Countdown date={endDate} /></dd>
                </>
              }
              <dt>Contract:</dt>
              <dd><EtherscanLink address={contractAddress || ""} abbreviate={true} /></dd>
            </dl>
          </div>
          { !disabled &&
            <form className="harvest-controls">
              <button type="button" className="exit" disabled={ farm && (!farm.amountStaked || farm.amountStaked.eq(0)) }>
                Exit 🏃🚪
              </button>
              <button type="button" className="harvest" disabled={ farm && (!farm.amountEarned || farm.amountEarned.eq(0)) }>
                Harvest 🍖
              </button>
            </form>
          }
        </div>
      }
    </div>
  </div>;
}

function Farm(props : FarmProps) {
  const { contractAddress, imageSrc } = props;
  const [zoomed, setZoomed] = useState(false);
  return <>
    <li className="farm">
      <img src={imageSrc} onClick={() => setZoomed(true)} alt="farm"/>
      {zoomed && <ZoomedFarm onClosePressed={(e) => setZoomed(false)} {...props} />}
    </li>
  </>;
}

function LockedFarm() {
  return <Farm imageSrc={lock} />;
}

function secondsSinceEpoch() {
  return Math.round((new Date()).getTime() / 1000);
}

function BaseFarm(props : FarmProps) {
  const { callToAction, children, contractAddress, ...otherProps } = props;
  const farm = useSelector((s : RootState) =>
    s.farms.find(x => x.contractAddress === contractAddress), shallowEqual);
  const wallet = useSelector((s : RootState) => s.wallet);

  const token = farm ? farm.wrappedToken : null;
  const balance = token && wallet.balances[token.symbol] ? wallet.balances[token.symbol].balance : BigNumber.from(0);

  const farmStarted = farm && farm.startTime && farm.startTime.lt(secondsSinceEpoch());
  const farmEnded = farm && farm.startTime && farm.duration && farm.startTime.add(farm.duration).gt(secondsSinceEpoch());
  const disabled = balance.lte(0) || !farmStarted || farmEnded;

  return <Farm disabled={disabled} { ...props }>
    { children }
    <form>
      <TokenAmountInput max={balance} decimals={2} />
      {
        wallet.currentAccount ?
        <button disabled={!!disabled}>{ callToAction || "Stake" }</button> :
        <WalletButton />
      }
    </form>
  </Farm>;
}

interface DamProps extends FarmProps {}

function Dam(props : DamProps) {
  const { children, ...otherProps } = props;
  return <BaseFarm callToAction="Stake LP Tokens" { ...otherProps }>
    { children }
  </BaseFarm>;
}

interface TroughProps extends FarmProps {}

function Trough(props : TroughProps) {
  const { children, ...otherProps } = props;
  return <BaseFarm { ...otherProps }>
    { children }
  </BaseFarm>;
}

interface FarmsProps {
  degeneracy: number;
}

function Farms(props : FarmsProps) {
  return <section className="">
    <header>
      <h1>Farm</h1>
      <p>Tend the hogs, eat HAM</p>
    </header>
    <ul className="farms">
      <Trough title="I Yam What I Yam" contractAddress="0x72cba355a6f104de8a78005cf5fffcbaef2a58f8" imageSrc={iYamWhatIYam} callToAction="Feed the hogs">
        <p>
          Stake and burn 2 YAM, earn 1 HAM. It's like musical chairs with sweet potatoes 🎵 🍠
        </p>
        <p>
          Sorry, the hogs only eat <TokenLink address="0x0e2298E3B3390e3b945a5456fBf59eCc3f55DA16">Yam Classic</TokenLink>.
        </p>
      </Trough>
      <BaseFarm title="Love Finds a Way" contractAddress="0xfdb6f34019a0c29681eca78c4f8df5c2bf64fa27" imageSrc={loveFindsAWay}>
        <p>
          Faced with true love, what's a frog to do?
        </p>
        <p>
          Stake LINK, kiss HAM 💋
        </p>
      </BaseFarm>
      <BaseFarm title="Notorious P.I.G." subtitle="(Pig Insurers Guild)" contractAddress="0xf844c38c801ef4de4465ed4c963f2394700748f8" imageSrc={notoriousPIG}>
        <p>
          Stake WNXM, eat HAM 🧐
        </p>
      </BaseFarm>
      <Dam title="Dam Pigs" contractAddress="0x36a5f370cd6d9ba660fbef0daf6ffb231c2a8e6d" imageSrc={damPigs}>
        <p>
          Stake Uniswap LP tokens, befriend a beaver, remove liquidity, build a dam.
        </p>
        <p>
          Eat HAM 🌊
        </p>
      </Dam>
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
      <BaseFarm title="Summon Sam" contractAddress="0x90f22dcff3cb8b762b8015b3624224964d491783" imageSrc={summonSam}>
        <p>
          Risk the dark arts. Call forth <a href="https://app.uniswap.org/#/swap?outputCurrency=0x419d48ffc4cf75ecaf4f87322eecccc386a17c53">SAM</a>, and entreat His Unholiness for audits.
        </p>
        <p> Eat HAM 👿</p>
      </BaseFarm>
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
    </ul>
  </section>;
}

export default Farms;
