import { Farm as _Farm } from "../types";

export type Farm = _Farm;

export default function (state : Farm[]  = [], action : any) : Farm[] {
  switch(action.type) {
    case "SET_FARM_INFO":
      const { contractAddress } = action.payload;
      const farm = state.find((f : Farm) => f.contractAddress === contractAddress);
      if (!!farm) {
        return [
          { ...action.payload, ...farm }
        ].concat(state.filter((f : Farm) => f.contractAddress !== contractAddress));
      }
      return state;
  }
  return state;
}
