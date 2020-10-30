import { Provider } from "@ethersproject/abstract-provider";

export interface ChainState {
  provider?: Provider;
}

export default function (state : ChainState = {}, action : any) : ChainState {
  switch (action.type) {
    case "SET_PROVIDER":
      return { provider: action.payload.provider as Provider, ...state};
  }
  return state;
}
