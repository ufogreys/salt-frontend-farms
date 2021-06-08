import BigNumber from 'bignumber.js'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useRefresh from 'hooks/useRefresh'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import poolsConfig from 'config/constants/pools'
import erc20 from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import CoinGecko from 'coingecko-api'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool } from './types'
import { QuoteToken } from '../config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => useSelector((state: State) => state.farms.data)

export const useFarmFromPid = (pid: number): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))

export const useFarmFromSymbol = (lpSymbol: string): Farm =>
  useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))

export const useFarmUser = (pid: number) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : ZERO,
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : ZERO,
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : ZERO,
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : ZERO,
  }
}

// Pools

export const usePools = (account: string): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  return useSelector((state: State) => state.pools.data)
}

export const usePoolFromPid = (sousId: number): Pool =>
  useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))

// Prices

export const usePriceSaltBusd = (): BigNumber => {
  const pid = 0 // SALT-BUSD LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceSaltBnb = (): BigNumber => {
  const pid = 2 // SALT-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 3 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  return farm.tokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : ZERO
}

export const usePriceSlimeBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))
  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xcb645714520080EF4E65De3254d61356262F0818' // SLIME/BNB LP
      const [wbnbTokenBalanceLP, slimeTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 2).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!slimeTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(slimeTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceEggBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xd1B59D11316E87C3a0A069E80F590BA35cD8D8D3' // EGG/BNB LP
      const [wbnbTokenBalanceLP, eggTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 4).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!eggTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(eggTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBrewBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x723203e821f1ff2d0e396d5dd2ea390f3c9d42cf' // BREW/BNB LP
      const [wbnbTokenBalanceLP, brewTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 5).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!brewTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(brewTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBtcbBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x7561eee90e24f3b348e1087a005f78b4c8453524' // BTCB/BNB LP
      const [wbnbTokenBalanceLP, btcbTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 7).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!btcbTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(btcbTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceCtcBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x4191251c15ae5b5b795c0ed58c33863a3c4ac3c0' // CTC/BNB LP
      const [wbnbTokenBalanceLP, ctcTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: poolsConfig.find((p) => p.sousId === 8).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!ctcTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(ctcTokenBalanceLP)).div(10000000000))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBlueBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xca5a529f3137109eccd5a239e58a150f651710a2' // BLUE/BNB LP
      const [wbnbTokenBalanceLP, blueTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x36C0556c2B15aED79F842675Ff030782738eF9e8',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!blueTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(blueTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceBlueSaltLPBnb = () => {
  const bluePrice = usePriceBlueBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xc7953f27b4b7049e41c3c10354e995870cb8e109' // SALT/BLUE LP
      const [saltTokenBalanceLP, blueTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x36C0556c2B15aED79F842675Ff030782738eF9e8', // BLUE
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!blueTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: blueTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice)
  const blueValue = new BigNumber(price.blueTokenBalance).times(bluePrice)
  const topValue = saltValue.plus(blueValue)
  const lpPrice = topValue.div(price.totalSupplyLP)

  return lpPrice
}

export const usePriceSlmeSaltLPBnb = () => {
  const smlePrice = usePriceSlimeBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xbea4674a61cccc6b735999511ba9a8ba3aa26a85' // SALT/Slme LP
      const [saltTokenBalanceLP, slmeTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x4fcfa6cc8914ab455b5b33df916d90bfe70b6ab1', // Slime
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!slmeTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: slmeTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice)
  const slmeValue = new BigNumber(price.blueTokenBalance).times(smlePrice)
  const topValue = saltValue.plus(slmeValue)
  const lpPrice = topValue.div(price.totalSupplyLP)

  return lpPrice
}

export const usePriceSaltBusdLPBnb = () => {
  const smlePrice = usePriceSlimeBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x6596f770786915556C47E301cC8290aa14288d99' // SALT/Busd LP
      const [saltTokenBalanceLP, slmeTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xe9e7cea3dedca5984780bafc599bd69add087d56', // Busd
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!slmeTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: slmeTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice)
  const slmeValue = new BigNumber(price.blueTokenBalance).times(smlePrice)
  const topValue = saltValue.plus(slmeValue)
  const lpPrice = topValue.div(price.totalSupplyLP)

  return lpPrice
}

export const usePriceMomoBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xfd0fe39fe5ad487219d3e7cafad1b1c425c725b6' // MOMO/BNB LP
      const [wbnbTokenBalanceLP, momoTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xafb2997fe9a99022e61c7e01b974e0e3d7704b02',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!momoTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(momoTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceSaltMomoLPBnb = () => {
  const smlePrice = usePriceSlimeBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x2e63a08ca1ab08a3f1eb0ca0d3f0a1a4278dfa8f' // SALT/MOMO LP
      const [saltTokenBalanceLP, slmeTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xafb2997fe9a99022e61c7e01b974e0e3d7704b02', // MOMO
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!slmeTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: slmeTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice)
  const slmeValue = new BigNumber(price.blueTokenBalance).times(smlePrice)
  const topValue = saltValue.plus(slmeValue)
  const lpPrice = topValue.div(price.totalSupplyLP)

  return lpPrice
}

export const usePricePalmBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x6fc4c985559233d0b69410316911e5c6e096ccb6' // PALM/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x9768E5b2d8e761905BC81Dfc554f9437A46CdCC6',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceSaltPalmLPBnb = () => {
  const smlePrice = usePriceSlimeBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x34951e9ca4891b4264a6cb9850e0b85a850414e5' // SALT/PALM LP
      const [saltTokenBalanceLP, slmeTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x9768E5b2d8e761905BC81Dfc554f9437A46CdCC6', // PALM
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!slmeTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: slmeTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice)
  const slmeValue = new BigNumber(price.blueTokenBalance).times(smlePrice)
  const topValue = saltValue.plus(slmeValue)
  const lpPrice = topValue.div(price.totalSupplyLP)

  return lpPrice
}

export const usePriceMchBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x729a9911542294ea0f04cd4e49934f03001a606b' // MCH/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x46483f3a766ae2c0c811ff953ac3dc69a3a20968',
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)).div(10000000000))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceSafepBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x94dfad55c01b5321b8df5fa2acdf74b97c2ba545' // safep/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xa8c514d991f59bab02d32b68f04204cb89261c88', // safep
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)).div(10000000000))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceUbuBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x506C6F29DbB50Ef7D9C580cDB914c0E7877515aE' // ubu/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xd2ddfba7bb12f6e70c2aab6b6bf9edaef42ed22f', // ubu
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceGenBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x10b1b01d84ed34bddbc87186ec635d6904eb9c49' // GEN/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0xB0F2939A1c0e43683E5954c9Fe142F7df9F8D967', // GEN
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceShrimpBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x4Ace7a7BB1fCD7b6e7Fd707ebdE3Ffea3F21524A' // shrimp/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x62ee12e4fe74a815302750913c3c796bca23e40e', // SHRIMP
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceShellBnb = () => {
  const [price, setPrice] = useState(new BigNumber(0))

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0x63677efd975edbe8bbc2afbd19706516dac338c4' // shell/BNB LP
      const [wbnbTokenBalanceLP, palmTokenBalanceLP] = await multicall(erc20, [
        {
          address: poolsConfig.find((p) => p.sousId === 1).rewardTokenAddress[CHAIN_ID],
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x0cb5ffb1e824e8adc81f3d264aa447bf13d7ac7e', // SHELL
          name: 'balanceOf',
          params: [lpAddress],
        },
      ])

      if (!palmTokenBalanceLP || !wbnbTokenBalanceLP) return

      setPrice(new BigNumber(wbnbTokenBalanceLP).div(new BigNumber(palmTokenBalanceLP)))
    }

    fetchPrice()
  }, [])

  return price
}

export const usePriceSaltMchLPBnb = () => {
  const smlePrice = usePriceMchBnb()
  const saltPrice = usePriceSaltBnb()
  const [price, setPrice] = useState({
    blueTokenBalance: new BigNumber(0),
    saltTokenBalance: new BigNumber(0),
    totalSupplyLP: new BigNumber(0),
  })

  useEffect(() => {
    const fetchPrice = async () => {
      const lpAddress = '0xf09a33f69c7f9a19f87c53469b52665ec4e1c97b' // SALT/MCH LP
      const [saltTokenBalanceLP, slmeTokenBalanceLP, totalSupply] = await multicall(erc20, [
        {
          address: '0x2849b1aE7E04A3D9Bc288673A92477CF63F28aF4', // SALT
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: '0x46483f3a766ae2c0c811ff953ac3dc69a3a20968', // MCH
          name: 'balanceOf',
          params: [lpAddress],
        },
        {
          address: lpAddress,
          name: 'totalSupply',
          params: [],
        },
      ])

      if (!slmeTokenBalanceLP || !saltTokenBalanceLP || !totalSupply) return
      setPrice({
        blueTokenBalance: slmeTokenBalanceLP,
        saltTokenBalance: saltTokenBalanceLP,
        totalSupplyLP: totalSupply,
      })
    }

    fetchPrice()
  }, [])

  // price salt x salts in LP + price blue x blue in LP / LP tokens
  const saltValue = new BigNumber(price.saltTokenBalance).times(saltPrice).div(1e18)
  const slmeValue = new BigNumber(price.blueTokenBalance).times(smlePrice).div(1e8)
  const topValue = saltValue.plus(slmeValue)
  const lpPrice = topValue.div(new BigNumber(price.totalSupplyLP).div(1e18))

  return lpPrice
}

export const usePriceEthBusd = (): BigNumber => {
  const [ethPrice, setEthPrice] = useState(new BigNumber(1900))

  useEffect(() => {
    const fetchPrice = async () => {
      const CoinGeckoClient = new CoinGecko()
      const result = await CoinGeckoClient.coins.fetch('ethereum', {})
      setEthPrice(new BigNumber(result.data?.market_data?.current_price?.usd))
    }

    fetchPrice()
  }, [])

  return ethPrice
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const { account } = useWallet()
  const pools = usePools(account)
  const bnbPrice = usePriceBnbBusd()
  const ethPrice = usePriceEthBusd()
  const saltPrice = usePriceSaltBusd()
  const bluePrice = usePriceBlueBnb()
  const slimePrice = usePriceSlimeBnb()
  const saltBlueLPPrice = usePriceBlueSaltLPBnb()
  const saltSlmeLPPrice = usePriceSlmeSaltLPBnb()
  const saltBusdLPPrice = usePriceSaltBusdLPBnb()
  const saltMomoLPPrice = usePriceSaltMomoLPBnb()
  const totalValue = useRef(new BigNumber(0))

  useEffect(() => {
    let farmsTotalValue = new BigNumber(0)
    for (let i = 0; i < farms.length; i++) {
      const farm = farms[i]
      if (farm.lpTotalInQuoteToken) {
        let val: BigNumber
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          val = bnbPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
          val = saltPrice.times(farm.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          val = ethPrice.times(farm.lpTotalInQuoteToken)
        } else {
          val = farm.lpTotalInQuoteToken
        }
        farmsTotalValue = farmsTotalValue.plus(val)
      }
    }

    let poolsTotalValue = new BigNumber(0)
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i]
      let poolValue: BigNumber
      if (pool.stakingTokenName === QuoteToken.SALT) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltPrice.times(totalSaltStaked)
      }

      if (pool.stakingTokenName === QuoteToken.SALTBLUE) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltBlueLPPrice.times(totalSaltStaked)
      }

      if (pool.stakingTokenName === QuoteToken.SALTSLME) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltSlmeLPPrice.times(totalSaltStaked)
      }

      if (pool.stakingTokenName === QuoteToken.SALTBUSD) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltBusdLPPrice.times(totalSaltStaked)
      }

      if (pool.stakingTokenName === QuoteToken.SALTMOMO) {
        const totalSaltStaked = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18))
        poolValue = saltMomoLPPrice.times(totalSaltStaked)
      }

      poolsTotalValue = poolsTotalValue.plus(poolValue ?? ZERO)
    }

    totalValue.current = farmsTotalValue.plus(poolsTotalValue)
  }, [
    bluePrice,
    bnbPrice,
    ethPrice,
    farms,
    pools,
    saltPrice,
    slimePrice,
    saltBlueLPPrice,
    saltSlmeLPPrice,
    saltBusdLPPrice,
    saltMomoLPPrice,
  ])

  if (!totalValue) {
    return new BigNumber(0)
  }

  return totalValue.current
}
