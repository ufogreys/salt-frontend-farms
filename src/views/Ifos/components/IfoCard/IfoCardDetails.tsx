import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal } from '@saltswap/uikit'
import useI18n from 'hooks/useI18n'

export interface IfoCardDetailsProps {
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
  token: string
  currency: string
  maxContribution: string
  minContribution: string
}

const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  // launchDate,
  // launchTime,
  saleAmount,
  token,
  currency,
  // raiseAmount,
  projectSiteUrl,
  // raisingAmount,
  // totalAmount,
  maxContribution,
  minContribution,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
        {/* <Item>
          <Display>{TranslateString(582, 'Launch Time')}</Display>
          <Text>
            {launchDate},
            <Link
              href="https://www.timeanddate.com/worldclock/singapore/singapore"
              target="blank"
              rel="noopener noreferrer"
              ml="4px"
              style={{ display: 'inline' }}
            >
              {launchTime}
            </Link>
          </Text>
        </Item> */}
        <Item>
          <Display>{TranslateString(584, 'For Sale')}</Display>
          <Text>
            {saleAmount} {token}
          </Text>
        </Item>
        {/* <Item>
          <Display>{TranslateString(999, 'To raise (BNB)')}</Display>
          <Text>{raiseAmount} BNB</Text>
        </Item> */}
        <Item>
          <Display>Max contribution</Display>
          <Text>
            {maxContribution} {currency}
          </Text>
        </Item>
        <Item>
          <Display>Min contribution</Display>
          <Text>
            {minContribution} {currency}
          </Text>
        </Item>
        {/* <Item>
          <Display>{TranslateString(999, 'Total raised (% of target)')}</Display>
          <Text>{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
        </Item> */}
      </StyledIfoCardDetails>
      <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
        {TranslateString(412, 'View project site')}
      </LinkExternal>
    </>
  )
}

export default IfoCardDetails
