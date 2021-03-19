import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { useCake, useLottery } from './useContract'
import { getAllowance } from '../utils/erc20'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const lotteryContract = useLottery()
  const cakeContract = useCake()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(cakeContract, lotteryContract, account)
      setAllowance(new BigNumber(res))
    }

    if (account && cakeContract && cakeContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, cakeContract, lotteryContract])

  return allowance
}

// Retrieve IFO allowance
export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any) => {
  const { account }: { account: string } = useWallet()
  const [allowance, setAllowance] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await tokenContract.methods.allowance(account, spenderAddress).call()
        setAllowance(new BigNumber(res))
      } catch (e) {
        setAllowance(null)
      }
    }
    fetch()
  }, [account, spenderAddress, tokenContract, dependency])

  return allowance
}

// IDO
export const useIdoSoftCap = (presaleContract: Contract, dependency?: any) => {
  const { account }: { account: string } = useWallet()
  const [softCap, setSoftCap] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await presaleContract.methods.softCap().call()
        setSoftCap(new BigNumber(res))
      } catch (e) {
        setSoftCap(null)
      }
    }
    fetch()
  }, [account, presaleContract, dependency])

  return softCap
}

export const useIdoHardCap = (presaleContract: Contract, dependency?: any) => {
  const { account }: { account: string } = useWallet()
  const [hardCap, setHardCap] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await presaleContract.methods.hardCap().call()
        setHardCap(new BigNumber(res))
      } catch (e) {
        setHardCap(null)
      }
    }
    fetch()
  }, [account, presaleContract, dependency])

  return hardCap
}

export const useIdoTotalBnb = (presaleContract: Contract, dependency?: any) => {
  const { account }: { account: string } = useWallet()
  const [totalBnb, setTotalBnb] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await presaleContract.methods.totalBnb().call()
        setTotalBnb(new BigNumber(res))
      } catch (e) {
        setTotalBnb(null)
      }
    }
    fetch()
  }, [account, presaleContract, dependency])

  return totalBnb
}

//  await PresaleContract.methods.hardCap().call();

// uint256 immutable softCap;
// uint256 immutable hardCap;
// uint256 immutable tokensPerBnb;
// uint256 immutable minContribution;
// uint256 immutable maxContribution;

// uint256 public totalBnb;
