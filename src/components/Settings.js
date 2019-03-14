import React from 'react';
import WelcomeMessage from './WelcomeMessage';
import '../styles/AppLayout';
import ConfirmButton from './ConfirmButton';
import Page from './Page';

export default function() {
  return(
    <Page name="settings">
      <WelcomeMessage />
      <ConfirmButton />
    </Page>
  )
}