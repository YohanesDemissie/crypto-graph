import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../AppProvider';
import CoinTile from './CoinTile';
import { filter } from 'fuzzy';

//GRID DOCS: css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit 
export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-gap: 15px;
  margin-top: 40px;
`
function getLowerSectionCoins(coinList, filteredCoins) {
  return (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 10)
}


function getCoinsToDisplay(coinList, topSection, favorites, filterCoins) {
  return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins)
}

export default function({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => <CoinGridStyled>
        {getCoinsToDisplay(coinList, topSection, favorites, filteredCoins).map(coinKey => //take in array of keys of coinList, mapping that key to its own div
          <CoinTile topSection={topSection} coinKey={coinKey} />
        )}
      </CoinGridStyled> }
    </AppContext.Consumer>
  )
}