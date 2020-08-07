import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Grid } from './grid';
import MainAppBar from './MainAppBar';

import MenuDialog from './MenuDialog';
import { AppContext } from '~/contexts/AppContext';

export default function PageLayoutContainer(props) {
  let { children, activePage, isFluid } = props;
  const appCtx = useContext(AppContext);
  const { menuActive, setMenuActive } = appCtx;

  function handleClick(force) {
    // Currently a toggle...
    if (force == undefined) {
      force = !menuActive;
    }
    setMenuActive(force);
  }

  const onMenuToggle = (force) => {
    // Optional force param should be bool
    let newMenuOpen = !appCtx.menuActive;
    if (force != undefined) {
      newMenuOpen = force;
    }
    appCtx.setMenuActive(newMenuOpen);
  };

  if (!activePage) {
    activePage = 'blog';
  }

  return (
    <React.Fragment>
      <MainAppBar activePage={activePage} onMenuToggle={onMenuToggle} />
      <Grid fluid={isFluid}>{children}</Grid>
      <MenuDialog activePage={activePage} open={appCtx.menuActive} onMenuToggle={handleClick} />
    </React.Fragment>
  );
}

PageLayoutContainer.propTypes = {
  activePage: PropTypes.string,
  isFluid: PropTypes.bool,
  children: PropTypes.node,
};
