import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';
import { SelectableTile } from '../styles/Tile';

export const CoinGridStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 15px;
`

export default function() {
  return (
    <AppContext.Consumer>
      {({ coinList}) => <CoinGridStyled>
        {Object.keys(coinList).map(coinKey => //take in array of keys of coinList, mapping that key to its own div
          <SelectableTile>{coinKey}</SelectableTile>
        )}
      </CoinGridStyled> }
    </AppContext.Consumer>
  )
}