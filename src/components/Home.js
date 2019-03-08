import React, { Component } from 'react';
import AppLayout from '../styles/AppLayout'
import NavBar from './NavBar';
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
`
class Home extends Component {
  render() {
    return(
      <div>
        <NavBar />
        <h1>Welcome to Crypto Graph</h1>
      </div>
    )
  }
}

export default Home