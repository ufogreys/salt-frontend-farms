import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { smartHarvest, harvest } from 'utils/callHelpers'
import { useMasterchef, useSmartChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => [...accum, harvest(masterChefContract, pid, account)], [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSmartChefHarvest = (sousId: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const smartChefContract = useSmartChef(sousId)

  const handleHarvest = useCallback(async () => {
    await smartHarvest(smartChefContract, account)
    dispatch(updateUserPendingReward(String(sousId), account))
    dispatch(updateUserBalance(String(sousId), account))
  }, [account, dispatch, smartChefContract, sousId])

  return { onReward: handleHarvest }
}
