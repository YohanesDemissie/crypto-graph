import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import '../styles/AppLayout';
import ConfirmButton from './ConfirmButton';
import Page from './Page';
import CoinGrid from './CoinGrid';
import Search from './Search';

export default function() {
  return(
    <Page name="settings">
      <WelcomeMessage />
      <CoinGrid topSection />
      <ConfirmButton />
      <Search />
      <CoinGrid />
    </Page>
  )
}