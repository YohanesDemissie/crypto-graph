import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../../styles/Tile';
import { fontSize3, fontSizeBig } from '../../styles/Styles';
import { CoinHeaderGridStyled } from '../CoinHeaderGrid';

const JustifyRight = styled.div`
  justify-self: right;
`

const JustifyLeft = styled.div`
  justify-self: left;
`

const TickerPrice = styled.div`
  ${fontSizeBig}
`

const ChangedPercentage = styled.div`
  color: green;
  ${props => props.red && css`
    color: red
  `}
`

const numberFormat = number => {
  return +(number + '').slice(0, 7); //convert number to string, then take the first 7 digits of characters, and return it back to a number with the '+' symbol. Not common practice format/method but interesting new method nonetheless 
}

const PriceTileStyled = styled(SelectableTile)`
  ${props => props.compact && css`
    display: grid;
    ${fontSize3}
    grid-gap: 5px;
    grid-template-columnsL repeat(3, 1fr);
    justify-items: right;
  `}
`

function ChangedPercentageComponent({ data }) {
  return (  
    <JustifyRight>
      <ChangedPercentage red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangedPercentage>
    </JustifyRight>
  )
}

function PriceTile({sym, data}) {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangedPercentageComponent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>
        ${numberFormat(data.PRICE)}
      </TickerPrice>
    </PriceTileStyled>
  )
}

function PriceTileCompact({sym, data}) {
  return (
    <PriceTileStyled compact>
        <JustifyLeft>{sym}</JustifyLeft>
        <ChangedPercentageComponent data={data} />
      <div>
        ${numberFormat(data.PRICE)}
      </div>
    </PriceTileStyled>
  )
}

export default function ({ price, index}){
  let sym = Object.keys(price)[0]; //to recieve symbol
  let data = price[sym]['USD']; //return price in us dollars
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <TileClass sym={sym} data={data} />
  )
}