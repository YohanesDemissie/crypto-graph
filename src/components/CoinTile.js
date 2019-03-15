import React from 'react';
import { AppContext } from '../AppProvider';
import { SelectableTile, DeletableTile, DisabledTile } from '../styles/Tile';
import CoinHeaderGrid from './CoinHeaderGrid';
import CoinImage from './CoinImage';

function clickCoinHandler(topSection, coinKey, addCoin, removeCoin){
  return topSection ? () => {
    removeCoin(coinKey)
  } : () => {
    addCoin(coinKey)
  }
}

export default function({ coinKey, topSection }){
  return (
    <AppContext.Consumer>
      {({coinList, addCoin, removeCoin}) => {
        let coin = coinList[coinKey];

        let TileClass = SelectableTile;
        if (topSection) {
          TileClass = DeletableTile;
        }
        return <TileClass
          onClick={clickCoinHandler(topSection, coinKey, addCoin, removeCoin)}
        >

          {/* <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
          <CoinImage coin={coin} /> */}
          <CoinHeaderGrid topSection={topSection} />
          <CoinImage coin={coin} />
        </TileClass>
      }}
    </AppContext.Consumer>
  )
}