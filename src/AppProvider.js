// APP STATE PROVIDER/CONSUMER COMPONENT
import React from 'react';

export const AppContext = React.createContext(); //we woll use the "consumers" for the child components

export class AppProvider extends React.Component { //AppProvider will be used to warp everything to provide state as the parent component
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      ...this.savedSettings(), //This will take the user to "settings" as opposed to "dashboard" to select coin currency if nothing is in local storage.
      setPage: this.setPage, //React.Context DOCS: "contains the updater function to be passed down into the context provider"
      confirmFavorites: this.confirmFavorites
    }
  }

  confirmFavorites = () => {
    this.setState({
      firstVisit: false,
      page: 'dashboard',
    })
    localStorage.setItem('cryptoDash', JSON.stringify({
      test: 'hello favorites state!'
    }))
  }

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash')); //part 1. grabs json data from crypto dash
    if (!cryptoDashData) {
      return({ page: 'settings', firstVisit: true }) //return default state to "settings page" to select crypto currency if there has not been any currency selected and stored in local storage and set a boolean value to it
    }
    return {};
  }
  setPage = page => this.setState({ page });

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}
