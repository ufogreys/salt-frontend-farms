import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex } from '@saltswap/uikit'
import useI18n from 'hooks/useI18n'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { calculateCakeEarned, apyModalRoi, formatROI } from 'utils/compoundApyHelpers'
import { Address } from 'config/constants/types'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  lpLabel?: string
  cakePrice?: BigNumber
  apy?: BigNumber
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  stakedBalanceInUSD?: BigNumber
}

const Grid = styled.div<{ hasStakedBalance: boolean }>`
  display: grid;
  grid-template-columns: repeat(${({ hasStakedBalance }) => (hasStakedBalance ? 4 : 3)}, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`

const GridItem = styled.div`
  margin-bottom: '10px';
`

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  stakedBalanceInUSD,
  tokenAddresses,
  cakePrice,
  apy,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const farmApy = apy.times(new BigNumber(100)).toNumber()
  const oneThousandDollarsWorthOfCake = 1000 / cakePrice.toNumber()

  const cakeEarnedPerThousand1D = calculateCakeEarned({ numberOfDays: 1, farmApy, cakePrice })
  const cakeEarnedPerThousand7D = calculateCakeEarned({ numberOfDays: 7, farmApy, cakePrice })
  const cakeEarnedPerThousand30D = calculateCakeEarned({ numberOfDays: 30, farmApy, cakePrice })
  const cakeEarnedPerThousand365D = calculateCakeEarned({ numberOfDays: 365, farmApy, cakePrice })

  const saltEarnedPerStakedAmount1D = calculateCakeEarned({
    numberOfDays: 1,
    farmApy,
    cakePrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const saltEarnedPerStakedAmount7D = calculateCakeEarned({
    numberOfDays: 7,
    farmApy,
    cakePrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const saltEarnedPerStakedAmount30D = calculateCakeEarned({
    numberOfDays: 30,
    farmApy,
    cakePrice,
    principalAmount: Number(stakedBalanceInUSD),
  })
  const saltEarnedPerStakedAmount365D = calculateCakeEarned({
    numberOfDays: 365,
    farmApy,
    cakePrice,
    principalAmount: Number(stakedBalanceInUSD),
  })

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid hasStakedBalance={!stakedBalanceInUSD.isZero()}>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'SALT per $1000')}
          </Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
              {`Shrimp per $${Number(stakedBalanceInUSD).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            </Text>
          </GridItem>
        )}
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{cakeEarnedPerThousand1D}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(saltEarnedPerStakedAmount1D, cakePrice)}</Text>
          </GridItem>
        )}
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{cakeEarnedPerThousand7D}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(saltEarnedPerStakedAmount7D, cakePrice)}</Text>
          </GridItem>
        )}
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand30D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{cakeEarnedPerThousand30D}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(saltEarnedPerStakedAmount30D, cakePrice)}</Text>
          </GridItem>
        )}
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>
            {apyModalRoi({ amountEarned: cakeEarnedPerThousand365D, amountInvested: oneThousandDollarsWorthOfCake })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text>{cakeEarnedPerThousand365D}</Text>
        </GridItem>
        {!stakedBalanceInUSD.isZero() && (
          <GridItem>
            <Text>{formatROI(saltEarnedPerStakedAmount365D, cakePrice)}</Text>
          </GridItem>
        )}
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(
          999,
          'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
        )}
      </Description>
      <Flex justifyContent="center">
        <LinkExternal href={`https://exchange.saltswap.finance/#/add/${liquidityUrlPathParts}`}>
          {TranslateString(999, 'Get')} {lpLabel}
        </LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
