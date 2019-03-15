import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppProvider';
import CoinTile from './CoinTile';

//GRID DOCS: css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit 
export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`

function getCoinsToDisplay(coinList, topSection, favorites) {
  return topSection ? favorites : Object.keys(coinList).slice(0, 10); //gives us top 100 coins to save loading time. CHANGED TO 10 TO SAVE API CALLS!!!
}

export default function({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites }) => <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection, favorites).map(coinKey => //take in array of keys of coinList, mapping that key to its own div
          <CoinTile topSection={topSection} coinKey={coinKey} />
        )}
      </CoinGridStyled> }
    </AppContext.Consumer>
  )
}