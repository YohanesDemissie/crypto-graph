import React, { Component } from 'react';
import AppLayout from '../styles/AppLayout'
import NavBar from './NavBar';
import { AppProvider } from '../AppProvider';


class Home extends Component {
  render() {
    return(
      <AppLayout>
        <AppProvider>
          <NavBar />
          <h1>Welcome to Crypto Graph</h1>
        </AppProvider>
      </AppLayout>
    )
  }
}

export default Home