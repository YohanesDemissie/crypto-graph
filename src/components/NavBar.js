import React, { Component } from 'react'
import styled from 'styled-components';
const Bar = styled.div`
  display: grid;
  //grid-template-columns: auto auto auto; //spaces dives out evenly accross browser in responsive design
  grid-template-columns: 180px auto 100px 100px;
`

class NavBar extends Component{
  render() {
    return(
      <Bar>
        <div>CryptoDash</div>
        <div />
        <div>Dashboard</div>
        <div>Settings</div>
      </Bar>
    )
  }
}

export default NavBar