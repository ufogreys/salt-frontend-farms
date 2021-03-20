import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon, Flex, Text } from '@saltswap/uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useIdoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import { getIdoAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import IfoCardHeader from './IfoCardHeader'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'

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
  margin-top: 12px;
  margin-bottom: 16px;
`

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

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
    currencyAddress,
    tokenDecimals,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    isOpen: null,
    softCap: new BigNumber(0),
    hardCap: new BigNumber(0),
    tokensPerBnb: new BigNumber(0),
    softCapProgress: 0,
    hardCapProgress: 0,
    weiRaised: new BigNumber(0),
  })
  const { account } = useWallet()
  const presaleContract = useIdoContract(getIdoAddress())

  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent('live', TranslateString)

  useEffect(() => {
    const fetchProgress = async () => {
      const [softCap, hardCap, tokensPerBnb, weiRaised, isOpen] = await Promise.all([
        presaleContract.methods.softCap().call(),
        presaleContract.methods.hardCap().call(),
        presaleContract.methods.tokensPerBnb().call(),
        presaleContract.methods.weiRaised().call(),
        presaleContract.methods.isOpen().call(),
      ])

      const softCapProgress = (weiRaised / softCap) * 100
      const hardCapProgress = (weiRaised / hardCap) * 100

      setState({
        isLoading: false,
        softCap,
        hardCap,
        tokensPerBnb,
        softCapProgress,
        hardCapProgress,
        weiRaised,
        isOpen,
      })
    }

    fetchProgress()
  }, [presaleContract, setState])

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>BNB raised:</Text>
          <Text bold style={{ fontSize: '16px' }}>
            {getFullDisplayBalance(new BigNumber(state.weiRaised))} BNB
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>Soft Cap ({getBalanceNumber(state.softCap)} BNB):</Text>
          <Text bold style={{ fontSize: '16px' }}>
            {state.softCapProgress?.toString()}%
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>Hard Cap ({getBalanceNumber(state.hardCap)} BNB):</Text>
          <Text bold style={{ fontSize: '16px' }}>
            {state.hardCapProgress?.toString()}%
          </Text>
        </Flex>
        <StyledProgress>
          <LinearProgress
            variant="buffer"
            value={state.hardCapProgress}
            valueBuffer={state.softCapProgress}
            color="secondary"
          />
        </StyledProgress>
        {!account && <UnlockButton fullWidth />}
        <IfoCardContribute
          address={address}
          currency="BNB"
          currencyAddress={currencyAddress}
          contract={getIdoAddress()}
          status={state.isOpen ? 'live' : 'finished'}
          raisingAmount={new BigNumber(100)} // TODO
          tokenDecimals={tokenDecimals}
        />
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
