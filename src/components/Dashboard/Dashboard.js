import React from 'react';
import styled from 'styled-components';
import Page from '../Page';
import PriceGrid from './PriceGrid';
import CoinSpotLight from './CoinSpotlight';

const ChartGrid = styled.div`
  display: grid;
  margin-top: 20px;
  grid-gap: 15px;
  grid-template-columns: 1fr 3fr;
`

export default function () {
  return (
    <Page name="dashboard">
      <PriceGrid />
      <ChartGrid>
        <CoinSpotLight />
        <dvi>Chart Goes Here </dvi>
      </ChartGrid>
    </Page>
  )
}