import React, { Component } from 'react';
import styled from 'styled-components';
import {Tile} from '../../styles/Tile';
import { AppContext } from '../../AppProvider';
import CoinImage from '../CoinImage';

const SpotLightName = styled.h2`
  text-align: center;
`

class CoinSpotLight extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {({currentFavorite, coinList}) =>
          <Tile>
            <SpotLightName>{coinList[currentFavorite].CoinName} </SpotLightName>
            <CoinImage spotlight coin={coinList[currentFavorite]} />
          </Tile>
        }
      </AppContext.Consumer>
    );
  }
}

export default CoinSpotLight;
