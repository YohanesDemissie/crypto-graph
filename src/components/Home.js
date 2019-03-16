import React, { Component } from 'react';
import AppLayout from '../styles/AppLayout'
import NavBar from './NavBar';
import { AppProvider } from '../AppProvider';
import Settings from './Settings';
import Content from './Content';
import Dashboard from './Dashboard/Dashboard';


class Home extends Component {
  render() {
    return(
      <AppLayout>
        <AppProvider>
          <NavBar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
        </AppProvider>
      </AppLayout>
    )
  }
}

export default Home