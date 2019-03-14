import React, { Component } from 'react'
import styled, { css } from 'styled-components';

const Logo = styled.div`
  font-size: 1.5em;

`

const Bar = styled.div`
  display: grid;
  margin-bottom: 40px;
  //grid-template-columns: auto auto auto; //spaces dives out evenly accross browser in responsive design
  grid-template-columns: 180px auto 100px 100px;
`

const ControlButtonElement = styled.div`
  cursor: pointer;
  ${props => props.active && css`
    text-shadow: 0px 0px 60px #03ff03;
  `}
`

function toProperCase(lower){
  return lower.charAt(0).toUpperCase() + lower.substr(1); // passing in "lower", .charAt(0) takes first letter, takes first character, capitalizes it, then adds the rest of the strings in.
}

function ControlButton({ name, active }) { //name allows us to create our own attribute with specific value. In this case we are creating the key "name" and in the render function, returning the values "dashboard" and "settings"
  return (
    <ControlButtonElement active={active}>
      {toProperCase(name)}
    </ControlButtonElement>)
}

class NavBar extends Component{
  render() {
    return(
      <Bar>
        <div>CryptoDash</div>
        <div />
        <ControlButton active name="dashboard" />
        <ControlButton name="settings" />
      </Bar>
    )
  }
}

export default NavBar