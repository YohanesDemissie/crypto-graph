import React from 'react';
import HighchartsConfig from './HighchartsConfig';
import { Tile } from '../../styles/Tile';
import { AppContext } from '../../AppProvider';
import ReactHighCharts from 'react-highcharts';
import HighchartsTheme from './HighchartsTheme.js';

ReactHighCharts.Highcharts.setOptions(HighchartsTheme); //ReactHighcharts (to activate livrary) .Highcharts to get root highchart object. .setOptions(highchartstheme) to apply the custome theme
export default function() {
  return (
    <AppContext.Consumer>
      {({historical}) => 
      <Tile>
        {historical ?
          <ReactHighCharts config={HighchartsConfig(historical)} /> : 
          'Loading Historical Data'  
          // <div>Loading Historical Data</div>
        }
      </Tile>
      }
    </AppContext.Consumer>
  )
}

