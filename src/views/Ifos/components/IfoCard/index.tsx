import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Button, Card, CardBody, CardRibbon, Flex, Text, useModal } from '@saltswap/uikit'
import { Ifo, IfoStatus } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { useIdoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import IfoCardHeader from './IfoCardHeader'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'
import CurrencyInputPanel from '../CurrencyInputPanel'
import ContributeModal from './ContributeModal'

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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  justify-content: space-between;
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
    currency,
    currencyAddress,
    tokenDecimals,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    softCap: new BigNumber(0),
    hardCap: new BigNumber(0),
    tokensPerBnb: new BigNumber(0),
    softCapProgress: 0,
    hardCapProgress: 0,
    weiRaised: new BigNumber(0),
  })
  const { account } = useWallet()
  const presaleContract = useIdoContract('0x9DDE81E9E62DCa90cA08E6c55220edcCD8A2C1fD')

  const TranslateString = useI18n()
  const [value, setValue] = useState('')

  const Ribbon = getRibbonComponent('live', TranslateString)

  const [onPresentContributeModal] = useModal(
    <ContributeModal currency="BNB" contract={presaleContract} currencyAddress={currencyAddress} />,
  )

  useEffect(() => {
    const fetchProgress = async () => {
      const [softCap, hardCap, tokensPerBnb, weiRaised] = await Promise.all([
        presaleContract.methods.softCap().call(),
        presaleContract.methods.hardCap().call(),
        presaleContract.methods.tokensPerBnb().call(),
        presaleContract.methods.weiRaised().call(),
      ])

      const softCapProgress = 10 // new BigNumber(100).pow(18)
      const hardCapProgress = 1

      setState({
        isLoading: false,
        softCap,
        hardCap,
        tokensPerBnb,
        softCapProgress,
        hardCapProgress,
        weiRaised,
      })
    }

    fetchProgress()
  }, [presaleContract, setState])

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>Wei raised:</Text>
          <Text bold style={{ fontSize: '16px' }}>
            {state.weiRaised?.toString()}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>Soft Cap:</Text>
          <Text bold style={{ fontSize: '16px' }}>
            {state.softCapProgress?.toString()}%
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text style={{ fontSize: '16px' }}>Hard Cap:</Text>
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
        {account && (
          <>
            {/* <CurrencyInputPanel
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
            /> */}

            <ButtonsWrapper>
              <Button
                id="contribute"
                style={{ marginRight: '8px' }}
                fullWidth
                disabled={false}
                onClick={onPresentContributeModal}
              >
                Contribute
              </Button>
            </ButtonsWrapper>
          </>
        )}
        {/* <ContributeModal currency={currency} contract={presaleContract} currencyAddress={currencyAddress} /> */}
        <IfoCardContribute
          address={address}
          currency={currency}
          currencyAddress={currencyAddress}
          contract={presaleContract}
          status="live"
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
