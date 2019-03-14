import React from 'react';
import { AppContext } from '../AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../styles/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from './CoinImage';

export default function({ coinKey, topSection }){

  return (
    <AppContext.Consumer>
      {({coinList}) => {
        let coin = coinList[coinKey];

        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        }
        return <TileClass>
          <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
          <CoinImage coin={coin} />
        </TileClass>
      }}
    </AppContext.Consumer>
  )
}