import React from 'react';
import styled, { css } from 'styled-components';
import { SelectableTile } from '../../styles/Tile';
import { fontSize3, fontSizeBig, greenBoxShadow } from '../../styles/Styles';
import { CoinHeaderGridStyled } from '../CoinHeaderGrid';
import { AppContext } from '../../AppProvider';

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
  ${props => props.currentFavorite && css`
    ${greenBoxShadow}
    pointer-events: none;
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

function PriceTile({sym, data, currentFavorite}) { //top 5/10 coins in favorites to render bigger text for user preference
  return (
    <PriceTileStyled currentFavorite={currentFavorite}>
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

function PriceTileCompact({sym, data, currentFavorite}) { // last 5/10 in favorites with smaller text
  return (
    <PriceTileStyled compact currentFavorite={currentFavorite}>
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
    <AppContext.Consumer>
      {({currentFavorite}) =>
        <TileClass sym={sym} data={data} currentFavorite={currentFavorite  === sym} />
      }
    </AppContext.Consumer>
  )
}