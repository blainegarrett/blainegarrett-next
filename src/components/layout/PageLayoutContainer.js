import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Meta from '../Meta';
import { Grid } from './grid';
import MainAppBar from './MainAppBar';

import MenuDialog from './MenuDialog';
import { AppContext } from '../../contexts/AppContext';

export default function PageLayoutContainer({
  children,
  activePage,
  title,
  meta,
  isFluid
}) {
  let appCtx = useContext(AppContext);
  let { menuActive, setMenuActive } = appCtx;

  function handleClick(force) {
    // Currently a toggle...
    if (force == undefined) {
      force = !menuActive;
    }
    setMenuActive(force);
  }

  const onMenuToggle = force => {
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

  // Account for meta not populated - default to page title if we have one
  if (!meta && title) {
    meta = { title: title };
  }

  return (
    <React.Fragment>
      <Meta meta={meta} />
      <MainAppBar activePage={activePage} onMenuToggle={onMenuToggle} />
      <Grid fluid={isFluid}>{children}</Grid>
      <MenuDialog
        activePage={activePage}
        open={appCtx.menuActive}
        onMenuToggle={handleClick}
      />
    </React.Fragment>
  );
}

PageLayoutContainer.propTypes = {
  activePage: PropTypes.string,
  title: PropTypes.string,
  meta: PropTypes.object,
  isFluid: PropTypes.bool,
  children: PropTypes.node
};
