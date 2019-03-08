import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import './App.css';

//make component MyButton as h1 tag with the following style properties
const MyButton = styled.h1`
  color: green;

  //  BELOW renders red text on attribute 'primary'

  ${props => props.primary && css`
    color: red;
  `}
`
// Mutates original style name (MyButton) above, and over rides new style properties as follows.
const TomatoButton = styled(MyButton)`
color: black;
border-color: red
`


class StyledComponentDemo extends Component {
  render() {
    return (
      <div>
        <MyButton>Crypto Graph</MyButton>
        <MyButton primary>Crypto Graph</MyButton>
        <TomatoButton>Crypto Graph</TomatoButton>
      </div>
    );
  }
}

export default StyledComponentDemo;

