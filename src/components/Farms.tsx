import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import useEventListener from '@use-it/event-listener';

import EtherscanLink from "./EtherscanLink";

import iYamWhatIYam from '../images/i-yam-what-i-yam.png';
import notoriousPIG from '../images/notorious-pig.png';
import loveFindsAWay from '../images/love-finds-a-way.png';
import damPigs from '../images/dam-pigs.png';
import summonSam from '../images/summon-sam.png';
import lock from '../images/lock.png';
import "./Farms.scss";

interface FarmProps {
  contract?: string;
  imageSrc: string;
  title?: string;
  subtitle?: string;
  onClosePressed?: (e : any) => void;
  children?: any;
  dark?: boolean;
}

function ZoomedFarm(props : FarmProps) {
  const { imageSrc, title, subtitle, contract, children } = props;
  const containerRef = useRef(null);

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
      <a className="close" onClick={props.onClosePressed || undefined}>X</a>
      <img src={imageSrc} alt="farm" />
      { (title || subtitle) &&
        <div className="sidebar">
          { title && <h2>{props.title}</h2> }
          { subtitle && <h3>{props.subtitle}</h3> }
          { children }
          { contract && contract !== "" && <span className="contract-details">Contract: <EtherscanLink address={contract} abbreviate={true} /></span> }
        </div>
      }
    </div>
  </div>;
}

function Farm(props : FarmProps) {
  const { imageSrc } = props;
  const [zoomed, setZoomed] = useState(false);
  return <>
    <img src={imageSrc} onClick={() => setZoomed(true)} className="farm" alt="farm"/>
    {zoomed && <ZoomedFarm onClosePressed={(e) => setZoomed(false)} {...props} />}
  </>;
}

function LockedFarm() {
  return <Farm imageSrc={lock} />;
}

function BaseFarm(props : FarmProps) {
  const { children, ...otherProps } = props;
  return <Farm { ...otherProps }>
    { children }
    <form>
      <input type="number" />
      <button>Stake</button>
    </form>
  </Farm>;
}


interface DamProps extends FarmProps {
  // callToAction: string;
}

function Dam(props : DamProps) {
  const { children, ...otherProps } = props;
  return <Farm { ...otherProps }>
    { children }
    <form>
      <input type="number" />
      <button>Stake LP Tokens</button>
    </form>
  </Farm>;
}

interface TroughProps extends FarmProps {
  callToAction: string;
}

function Trough(props : TroughProps) {
  const { callToAction, children, ...otherProps } = props;
  return <Farm { ...otherProps }>
    { children }
    <form>
      <input type="number" />
      <button>{ callToAction }</button>
    </form>
  </Farm>;
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
    <div className="farms">
      <Trough title="I Yam What I Yam" contract="0x72cba355a6f104de8a78005cf5fffcbaef2a58f8" imageSrc={iYamWhatIYam} callToAction="Feed the hogs">
        <p>
          Stake and burn 2 YAM, earn 1 HAM. It's like musical chairs with sweet potatoes 🎵 🍠
        </p>
        <p>
          Sorry, the hogs only eat <a href="https://etherscan.io/token/0x0e2298E3B3390e3b945a5456fBf59eCc3f55DA16" target="_blank" rel="noopener noreferrer">Yam Classic</a>.
        </p>
      </Trough>
      <BaseFarm title="Love Finds a Way" contract="0x897c0d25b8516599932291df44c8e7cefce488ec9b55bcbf3b6b8104e8126637" imageSrc={loveFindsAWay}>
        <p>
          Faced with true love, what's a frog to do?
        </p>
        <p>
          Stake LINK, kiss HAM 💋
        </p>
      </BaseFarm>
      <BaseFarm title="Notorious P.I.G." subtitle="(Pig Insurers Guild)" contract="0xf844c38c801ef4de4465ed4c963f2394700748f8" imageSrc={notoriousPIG}>
        <p>
          Stake WNXM, eat HAM 🧐
        </p>
      </BaseFarm>
      <Dam title="Dam Pigs" contract="0x36a5f370cd6d9ba660fbef0daf6ffb231c2a8e6d" imageSrc={damPigs}>
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
      <BaseFarm title="Summon Sam" contract="0x90f22dcff3cb8b762b8015b3624224964d491783" imageSrc={summonSam}>
        <p>
          Risk the dark arts. Call forth <a href="https://app.uniswap.org/#/swap?outputCurrency=0x419d48ffc4cf75ecaf4f87322eecccc386a17c53">SAM</a>, and entreat His Unholiness for audits.
        </p>
        <p> Eat HAM 👿</p>
      </BaseFarm>
      <LockedFarm />
      <LockedFarm />
      <LockedFarm />
    </div>
  </section>;
}

export default Farms;
