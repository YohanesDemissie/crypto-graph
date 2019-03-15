// APP STATE PROVIDER/CONSUMER COMPONENT
import React from 'react';
import _ from 'lodash';

const cc = require('cryptocompare');
//cc.setApiKey('87655f7ff80780800b1125b68135dc3ecc1a9444174dd12848d9ed29e63da894')

export const AppContext = React.createContext(); //we woll use the "consumers" for the child components

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component { //AppProvider will be used to warp everything to provide state as the parent component
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(), //This will take the user to "settings" as opposed to "dashboard" to select coin currency if nothing is in local storage.
      favorites: ['BTC', 'ETH', 'XMR', 'DODGE'],
      setPage: this.setPage, //React.Context DOCS: "contains the updater function to be passed down into the context provider"
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins,
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
  }

  //waiting for cc promise to return, asyncronously wait for that to come back with "await" we're passing in
  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
    // console.log(coinList);
  }

  addCoin = key => { //key will represent each coin and its values
    let favorites = [...this.state.favorites]; //let favorites equal spread operator of all coins
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  }

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key)}) //lodash pull means pull this value from array and return new array of that value removed
  }

  isInFavorites = key => _.includes(this.state.favorites, key) //makes sure there are no identical keys in the "favorites"

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard',
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites
    }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash')); //part 1. grabs json data from crypto dash
    if (!cryptoDashData) {
      return({ page: 'settings', firstVisit: true }) //return default state to "settings page" to select crypto currency if there has not been any currency selected and stored in local storage and set a boolean value to it
    }
    let {favorites} = cryptoDashData;
    return {favorites};
  }
  setPage = page => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins});

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
