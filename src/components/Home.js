import React, { Component } from 'react';
import AppLayout from '../styles/AppLayout'
import NavBar from './NavBar';
import { AppProvider } from '../AppProvider';
import Settings from './Settings';


class Home extends Component {
  render() {
    return(
      <AppLayout>
        <AppProvider>
          <NavBar />
          <Settings />
        </AppProvider>
      </AppLayout>
    )
  }
}

export default Home