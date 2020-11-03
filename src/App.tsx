import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';
import Color from 'color';
import useEventListener from '@use-it/event-listener';

import Manifesto from './components/Manifesto';
import WalletArea from './components/WalletArea';
import Farms from './components/Farms';
import pig from './images/pig.svg';
import deadPig from './images/pig-dead.svg';
import './App.scss';

function Logo() {
  const [hovering, setHover] = useState(false);
  return <NavLink to="/" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
    <img className="logo" src={hovering ? deadPig : pig} alt="logo" />
  </NavLink>;
}

function Nav() {
  return <nav>
    <Logo />
    <ul>
      <li>
        <NavLink to="/farming">Farming</NavLink>
      </li>
      <li>
        <NavLink to="/manifesto">Manifesto</NavLink>
      </li>
    </ul>
    <WalletArea />
  </nav>;
}

function App() {
  const [degen, setDegen] = useState(0.0);

  useEventListener("scroll", (e) => {
    const maxScroll = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    setDegen(window.scrollY / maxScroll);
  });

  const bg = Color('#fff7d6').mix(Color('#300c48'), degen * 1.4);

  return (
    <Router>
      <main className="App"
            style={{ backgroundColor: bg.hex() }}>
        <header>
          <Nav />
        </header>
        <Switch>
          <Route path="/farming">
            <Farms degeneracy={degen}/>
          </Route>
          <Route path="/manifesto">
            <Manifesto />
          </Route>
          <Route path="/">
            <Redirect to="/farming" />
          </Route>
        </Switch>
        <footer>
          <nav>
              <a href="https://github.com/its-ham/">Github</a>
              <a href="https://twitter.com/hamburglar_1971">Twitter</a>
          </nav>
        </footer>
      </main>
    </Router>
  );
}

export default App;
