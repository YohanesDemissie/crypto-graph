// APP STATE PROVIDER/CONSUMER COMPONENT
import React from 'react';
import _ from 'lodash';
import moment from 'moment';
const cc = require('cryptocompare')
cc.setApiKey('87655f7ff80780800b1125b68135dc3ecc1a9444174dd12848d9ed29e63da894');

export const AppContext = React.createContext(); //we woll use the "consumers" for the child components

const MAX_FAVORITES = 10;

const TIME_UNITS = 10;

export class AppProvider extends React.Component { //AppProvider will be used to warp everything to provide state as the parent component
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(), //This will take the user to "settings" as opposed to "dashboard" to select coin currency if nothing is in local storage.
      favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
      timeInterval: 'months',
      setPage: this.setPage, //React.Context DOCS: "contains the updater function to be passed down into the context provider"
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      confirmFavorites: this.confirmFavorites,
      setCurrentFavorite: this.setCurrentFavorite,
      setFilteredCoins: this.setFilteredCoins,
      changeChartSelect: this.changeChartSelect,
    }
  }

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical(); //to fetch data on each coin to display in graph
  }

  //waiting for cc promise to return, asyncronously wait for that to come back with "await" we're passing in
  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
  }

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    console.log(prices, 'did this work?');
    this.setState({ prices });
  }

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical(); // which will be historical fetch
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((value, index) => [ //X coordinate is date. Y is the price
          moment().subtract({ [this.state.timeInterval]: TIME_UNITS - index }).valueOf(), // index = 0. so it starts at 10th index and displays descending from 10
          value.USD
        ])
      }
    ]
    this.setState({ historical });
  }

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], 'USD');
        returnData.push(priceData);
      } catch (e) {
        console.warn('Fetch price err; ', e);
      }
    }
    return returnData;
  }

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) { // reads data from 10 days ago to most recent (one day ago)
      promises.push(
        cc.priceHistorical(this.state.currentFavorite,
          ['USD'],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        ) //this is the query  inside the crtyptocompare API
      )
    }
    return Promise.all(promises); //returns only when all promises are fulfilled
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
    this.setState({ favorites: _.pull(favorites, key) }) //lodash pull means pull this value from array and return new array of that value removed
  }

  isInFavorites = key => _.includes(this.state.favorites, key) //makes sure there are no identical keys in the "favorites"

  confirmFavorites = () => { //setting default state on saving favorites before loading "fetchPrices" on favored coins "added to state by user"
    let currentFavorite = this.state.favorites[0]; //here we will grab first index of FAVORITES as TOP FAVORITE
    this.setState({
      firstVisit: false,
      page: 'dashboard',
      currentFavorite,
      prices: null,
      historical: null
    }, () => {
      this.fetchPrices();
      this.fetchHistorical();
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      favorites: this.state.favorites,
      currentFavorite,
    }));
  }

  setCurrentFavorite = (sym) => { //sym = symbol
    this.setState({
      currentFavorite: sym,
      historical: null //default until onlcick event handler loads clicked sym on page between different coins
    }, this.fetchHistorical); //call back fetchHistorical after setting favorite from favorites lists page
    localStorage.setItem('cryptoDash', JSON.stringify({
      ...JSON.parse(localStorage.getItem('cryptoDash')),
      currentFavorite: sym
    }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash')); //part 1. grabs json data from crypto dash
    if (!cryptoDashData) {
      return { page: 'settings', firstVisit: true } //return default state to "settings page" to select crypto currency if there has not been any currency selected and stored in local storage and set a boolean value to it
    }
    let { favorites, currentFavorite } = cryptoDashData;
    return { favorites, currentFavorite };
  }
  setPage = page => this.setState({ page });

  setFilteredCoins = (filteredCoins) => this.setState({ filteredCoins });

  changeChartSelect = (value) => {
    this.setState({ timeInterval: value, historical: null }, this.fetchHistorical);
  }
  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
