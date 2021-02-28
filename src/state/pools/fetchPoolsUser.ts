import pools from 'config/constants/pools'
import smartChefABI from 'config/abi/smartChef.json'
import smartChefBnbABI from 'config/abi/smartChefBnb.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = pools.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
const bnbPools = pools.filter((p) => p.stakingTokenName === QuoteToken.BNB)
const web3 = getWeb3()

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'allowance',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingTokenAddress[CHAIN_ID],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await web3.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))

  const userInfoNonBnb = await multicall(smartChefABI, calls)
  const stakedBalances = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfoNonBnb[index].amount._hex).toJSON(),
    }),
    {},
  )

  // FIXME BNB pools -- how to get this? Same as non-BNB pools?
  const bnbCalls = nonBnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))
  // const userInfoBnb = await multicall(smartChefBnbABI, bnbCalls)
  const userInfoBnb = [{
    amount: {
      _hex: 42
    }
  }]
  const stakedBnbBalances = bnbPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfoBnb[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedBalances, ...stakedBnbBalances }
}

export const fetchUserPendingRewards = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(smartChefABI, calls)
  const pendingRewards = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // FIXME BNB pools -- how to get this? Same as non-BNB pools?
  const bnbCalls = bnbPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  // const bnbRes = await multicall(smartChefABI, bnbCalls)
  const bnbRes = [42]
  const bnbPendingRewards = pools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(bnbRes[index]).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards, ...bnbPendingRewards }
}
