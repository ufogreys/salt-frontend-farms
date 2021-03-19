import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Button, Card, CardBody, CardRibbon, Progress, Text } from '@saltswap/uikit'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { useERC20, useIdoContract, useIfoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import { useIdoSoftCap } from 'hooks/useAllowance'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardTime from './IfoCardTime'
import IfoCardContribute from './IfoCardContribute'
import CurrencyInputPanel from '../CurrencyInputPanel'

export interface IfoCardProps {
  ifo: Ifo
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  width: 100%;
`

const StyledProgress = styled.div`
  margin-top: 4px;
  margin-bottom: 16px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  justify-content: space-between;
`

// const getStatus = (currentBlock: number, startBlock: number, endBlock: number): IfoStatus | null => {
//   if (currentBlock < startBlock) {
//     return 'coming_soon'
//   }

//   if (currentBlock >= startBlock && currentBlock <= endBlock) {
//     return 'live'
//   }

//   if (currentBlock > endBlock) {
//     return 'finished'
//   }

//   return null
// }

// const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
//   if (status === 'coming_soon') {
//     return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
//   }

//   if (status === 'live') {
//     return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
//   }

//   return null
// }

const IfoCard: React.FC<IfoCardProps> = ({ ifo }) => {
  const {
    id,
    address,
    name,
    subTitle,
    description,
    launchDate,
    launchTime,
    saleAmount,
    raiseAmount,
    cakeToBurn,
    projectSiteUrl,
    currency,
    currencyAddress,
    tokenDecimals,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    softCap: new BigNumber(0),
    hardCap: new BigNumber(0),
    tokensPerBnb: new BigNumber(0),
    minContribution: new BigNumber(0),
    maxContribution: new BigNumber(0),
    // totalBnb: new BigNumber(0),
    softCapProgress: 0,
    hardCapProgress: 0,
  })
  const { account } = useWallet()
  const presaleContract = useIdoContract('0x9DDE81E9E62DCa90cA08E6c55220edcCD8A2C1fD')

  // const currentBlock = useBlock()
  // const TranslateString = useI18n()
  const [value, setValue] = useState('')

  // const Ribbon = getRibbonComponent(state.status, TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [softCap, hardCap, tokensPerBnb, minContribution, maxContribution] = await Promise.all([
        presaleContract.methods.softCap().call(),
        presaleContract.methods.hardCap().call(),
        presaleContract.methods.tokensPerBnb().call(),
        presaleContract.methods.minContribution().call(),
        presaleContract.methods.maxContribution().call(),
        // presaleContract.methods.totalBnb().call(),
      ])

      const totalBnb = new BigNumber(100).pow(18)

      const softCapProgress = 10 // new BigNumber(100).pow(18)
      const hardCapProgress = 1

      // eslint-disable-next-line no-console
      console.log('softCap', softCap)

      setState({
        isLoading: false,
        status: null,
        softCap,
        hardCap,
        tokensPerBnb,
        minContribution,
        maxContribution,
        softCapProgress,
        hardCapProgress,
        // totalBnb,
      })
    }

    fetchProgress()
  }, [presaleContract, setState])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'

  return (
    <StyledIfoCard ifoId={id} isActive={isActive}>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
        <Text fontSize="14px" color="textSubtle">
          Soft Cap: {state.softCapProgress?.toString()}%
        </Text>
        <Text fontSize="14px" color="textSubtle">
          Hard Cap: {state.hardCapProgress?.toString()}%
        </Text>
        <StyledProgress>
          <LinearProgress
            variant="buffer"
            value={state.hardCapProgress}
            valueBuffer={state.softCapProgress}
            color="secondary"
          />
        </StyledProgress>
        {/* <IfoCardTime
          isLoading={state.isLoading}
          status={state.status}
          secondsUntilStart={state.secondsUntilStart}
          secondsUntilEnd={state.secondsUntilEnd}
          block={isActive || isFinished ? state.endBlockNum : state.startBlockNum}
        /> */}
        {!account && <UnlockButton fullWidth />}
        {account && (
          <>
            <CurrencyInputPanel
              label=""
              placeholder="0.0"
              value={value}
              showMaxButton={false}
              onUserInput={(input) => {
                setValue(input)
              }}
              currency={{ name: 'BNB', symbol: 'BNB', decimals: 18 }}
              id="ido-input-token"
              showCommonBases={false}
            />

            <ButtonsWrapper>
              <Button
                id="buy"
                style={{ marginRight: '8px' }}
                fullWidth
                disabled={false}
                onClick={() => {
                  console.log('buy clicked!')
                }}
              >
                Buy
              </Button>
              <Button
                id="refund"
                variant="secondary"
                fullWidth
                onClick={() => {
                  console.log('refund clicked!')
                }}
              >
                Refund
              </Button>
            </ButtonsWrapper>
          </>
        )}
        {(isActive || isFinished) && (
          <IfoCardContribute
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            contract={presaleContract}
            status={state.status}
            raisingAmount={new BigNumber(100)} // TODO
            tokenDecimals={tokenDecimals}
          />
        )}
        <IfoCardDescription description={description} />
        <IfoCardDetails
          launchDate={launchDate}
          launchTime={launchTime}
          saleAmount={saleAmount}
          raiseAmount={raiseAmount}
          cakeToBurn={cakeToBurn}
          projectSiteUrl={projectSiteUrl}
          raisingAmount={new BigNumber(100)} // TODO
          totalAmount={new BigNumber(100)} // TODO
        />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
