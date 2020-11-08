import { BigNumber } from "ethers";

import { FarmType } from "./types";

export default {
  ham: {
    token: {
      contractAddress: "0xa047498beaf604eaaef4f85b0085eddbb4253085",
      symbol: "HAM",
      decimal: BigNumber.from(18)
    },
  },
  chain: {},
  wallet: {
    balances: {
      HAM: {
        token: {
          contractAddress: "0xa047498beaf604eaaef4f85b0085eddbb4253085",
          symbol: "HAM",
          decimals: BigNumber.from(18)
        },
        balance: BigNumber.from(0)
      }
    }
  },
  farms: [
    {
      contractAddress: "0x36a5f370cd6d9ba660fbef0daf6ffb231c2a8e6d",
      type: FarmType.Trough,
      wrappedToken: {
        contractAddress: "0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16",
        symbol: "YAMv1",
        decimal: 18
      },
      duration: BigNumber.from(1250000),
      startTime: BigNumber.from(1604188799),
      periodFinish: BigNumber.from(1605534578),
    },
    {
      contractAddress: "0xfdb6f34019a0c29681eca78c4f8df5c2bf64fa27",
      type: FarmType.Basic,
      wrappedToken: {
        contractAddress: "0x514910771af9ca656af840dff83e8264ecf986ca",
        symbol: "LINK",
        decimal: 18
      },
      duration: BigNumber.from(625000),
      startTime: BigNumber.from(1604188799),
      periodFinish: BigNumber.from(1604909422),
    },
    {
      contractAddress: "0xf844c38c801ef4de4465ed4c963f2394700748f8",
      type: FarmType.Basic,
      wrappedToken: {
        contractAddress: "0x0d438f3b5175bebc262bf23753c1e53d03432bde",
        symbol: "wNXM",
        decimal: 18
      },
      duration: BigNumber.from(625000),
      startTime: BigNumber.from(1604188799),
      periodFinish: BigNumber.from(1604909395),
    },
    {
      contractAddress: "0x36a5f370cd6d9ba660fbef0daf6ffb231c2a8e6d",
      type: FarmType.Dam,
      acceptedLPTokens: [
        {
          contractAddress: "0x3da1313ae46132a397d90d95b1424a9a7e3e0fce",
          symbol: "ETH/CRV",
          decimal: 18
        },
        {
          contractAddress: "0x8bd1661da98ebdd3bd080f0be4e6d9be8ce9858c",
          symbol: "ETH/REN",
          decimal: 18
        },
        {
          contractAddress: "0xb9b752f7f4a4680eeb327ffe728f46666763a796",
          symbol: "ETH/BZXR",
          decimal: 18
        },
        {
          contractAddress: "0xe6f19dab7d43317344282f803f8e8d240708174a",
          symbol: "ETH/KEEP",
          decimal: 18
        },
      ]
    },
    {
      contractAddress: "0x90f22dcff3cb8b762b8015b3624224964d491783",
      type: FarmType.Basic,
      wrappedToken: {
        contractAddress: "0x419D48fFc4Cf75Ecaf4f87322eEcccc386A17C53",
        symbol: "SAM",
        decimal: 18
      },
      duration: BigNumber.from(1250000),
      periodFinish: BigNumber.from(1605534559),
      startTime: BigNumber.from(1604188799),
    },
  ]
};
