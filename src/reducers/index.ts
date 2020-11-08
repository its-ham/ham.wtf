import { combineReducers } from "redux";

import ham from "./ham";
import chain from "./chain";
import wallet  from "./wallet";
import farms from "./farms";

const rootReducer = combineReducers({
  ham, chain, wallet, farms
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
