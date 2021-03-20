import React, { useState, useEffect } from 'react'
import { useModal, Text } from '@saltswap/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { useIdoContract } from 'hooks/useContract'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  tokenDecimals: number
}

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  tokenDecimals,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [contributions, setContributions] = useState(new BigNumber(0))
  const presaleContract = contract

  const { account } = useWallet()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetch = async () => {
      setContributions(new BigNumber(await presaleContract.methods.contributions(account).call()))
    }

    if (account) {
      fetch()
    }
  }, [account, presaleContract.methods, pendingTx])

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }
  const isFinished = status === 'finished'
  const percentOfUserContribution = new BigNumber(contributions).div(raisingAmount).times(100)

  return (
    <>
      <LabelButton
        disabled={pendingTx}
        buttonLabel={isFinished ? 'Claim' : 'Contribute'}
        label={isFinished ? 'Your tokens to claim' : `Your contribution (${currency})`}
        value={getBalanceNumber(contributions, tokenDecimals).toFixed(4)}
        onClick={isFinished ? claim : onPresentContributeModal}
      />
      <Text fontSize="14px" color="textSubtle">
        {isFinished
          ? `You'll be refunded any excess tokens when you claim`
          : `${percentOfUserContribution.toFixed(5)}% of total`}
      </Text>
    </>
  )
}

export default IfoCardContribute
