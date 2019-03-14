import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';
import CoinTile from './CoinTile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
  margin-top: 40px;
`

function getCoinsToDisplay(coinList) {
  return Object.keys(coinList).slice(0, 100); //gives us top 100 coins to save loading time 
}

export default function() {
  return (
    <AppContext.Consumer>
      {({ coinList}) => <CoinGridStyled>
        {getCoinsToDisplay(coinList).map(coinKey => //take in array of keys of coinList, mapping that key to its own div
          <CoinTile coinKey={coinKey} />
        )}
      </CoinGridStyled> }
    </AppContext.Consumer>
  )
}