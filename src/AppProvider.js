// APP STATE PROVIDER/CONSUMER COMPONENT
import React from 'react';

export const AppContext = React.createContext(); //we woll use the "consumers" for the child components

export class AppProvider extends React.Component { //AppProvider will be used to warp everything to provide state as the parent component
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard'
    }
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
