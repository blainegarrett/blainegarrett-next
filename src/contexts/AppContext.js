import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const initialState = {
  menuActive: false,
};

export default function AppContextProvider({ children }) {
  const [menuActive, setMenuActive] = useState(initialState.menuActive);

  const value = {
    menuActive,
    setMenuActive,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
AppContextProvider.propTypes = {
  children: PropTypes.node,
};
