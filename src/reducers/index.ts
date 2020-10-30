import { combineReducers } from "redux";

import chain from "./chain";
import wallet from "./wallet";
import farms from "./farms";
import stats from "./stats";

export default combineReducers({
  chain, wallet, farms, stats
});
