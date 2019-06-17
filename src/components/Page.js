import React from 'react';
import { AppContext } from '../AppProvider';

export default function ({ name, children }) {
  return <AppContext.Consumer>
    {({ page }) => {
      if (page !== name) { //if the page does not equal name "ie setting or dashboard", return children which will be a nested component
        return null;
      }
      return <div>{children}</div>
    }}
  </AppContext.Consumer>
}