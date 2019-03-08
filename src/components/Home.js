import React, { Component } from 'react';
import styled from 'styled-components'

const Title = styled.h1`
  text-align: center;
`
class Home extends Component {
  render() {
    return(
      <div>
        <Title>Welcome to Crypto Graph</Title>
      </div>
    )
  }
}

export default Home