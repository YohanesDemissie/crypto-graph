import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import '../styles/AppLayout';
import ConfirmButton from './ConfirmButton';
import Page from './Page';
import CoinGrid from './CoinGrid'

export default function() {
  return(
    <Page name="settings">
      <WelcomeMessage />
      <ConfirmButton />
      <CoinGrid />
    </Page>
  )
}