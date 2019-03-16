import React from 'react';
import HighchartsConfig from './HighchartsConfig';
import { Tile } from '../../styles/Tile';
import { AppContext } from '../../AppProvider';
import ReactHighCharts from 'react-highcharts';

export default function() {
  return (
    <AppContext.Consumer>
      {({}) => 
      <Tile>
        <ReactHighCharts config={HighchartsConfig()} />
      </Tile>
      }
    </AppContext.Consumer>
  )
}

