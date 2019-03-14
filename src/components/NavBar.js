import React, { Component } from 'react'
import styled, { css } from 'styled-components';
import { AppContext } from '../AppProvider';

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

function ControlButton({ name }) { //name allows us to create our own attribute with specific value. In this case we are creating the key "name" and in the render function, returning the values "dashboard" and "settings"
  return (
    <AppContext.Consumer>
      {({ page, setPage }) => ( //passing in page and active  state from AppProvider component. This allows us to change the state of  "page" to watever equals "name"
        <ControlButtonElement
          active={page === name}
          onClick={() => setPage(name)} //setting state to clicked name/value in nav bar to place highlight on
        > 
          {toProperCase(name)}
        </ControlButtonElement>
      )}
    </AppContext.Consumer>
  )
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