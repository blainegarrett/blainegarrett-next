import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

let initialState = {
  menuActive: false
};

export default function AppContextProvider({ children }) {
  let [menuActive, setMenuActive] = useState(initialState.menuActive);

  let value = {
    menuActive,
    setMenuActive
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
AppContextProvider.propTypes = {
  children: PropTypes.node
};
