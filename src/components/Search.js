import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../styles/Styles';
import { AppContext } from '../AppProvider';
import _ from 'lodash';
import fuzzy from 'fuzzy'; //fuzzy search library

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left; 
`
//_.debounce part of lodash library: Creates a debounced function that delays inovking function until after "wait" milliseconds have elapsed since the last time the debounced function was invoked
const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  // Get all the coin symbols
  let coinSymbols = Object.keys(coinList);
  //GET all the oin names, map symbol to name
  let coinNames = coinSymbols.map(sym => coinList[sym].CoinName)
  let allStringsToSearch = coinSymbols.concat(coinNames);
  let fuzzyResults = fuzzy
    .filter(inputValue, allStringsToSearch, {})
    .map(result => result.string);

  let filteredCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName;
    return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
  });
  setFilterCoins(filteredCoins);
}, 500); //half a second myst pass before fireing this function

//responsible for grabbing user input as inputValue
function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
  console.log(inputValue);
}

export default function() {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList}) =>
      <SearchGrid>
        <h2>Search All Coins</h2>
        <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
      </SearchGrid>
    }
    </AppContext.Consumer>
  )
}