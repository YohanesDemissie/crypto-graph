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

function getCoinsToDisplay(coinList, topSection) {
  return Object.keys(coinList).slice(0, topSection ? 10 : 100); //gives us top 100 coins to save loading time 
}

export default function({ topSection}) {
  return (
    <AppContext.Consumer>
      {({ coinList}) => <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection).map(coinKey => //take in array of keys of coinList, mapping that key to its own div
          <CoinTile topSection={topSection} coinKey={coinKey} />
        )}
      </CoinGridStyled> }
    </AppContext.Consumer>
  )
}