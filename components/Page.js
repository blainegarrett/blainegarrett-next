import React from 'react';
import PropTypes from 'prop-types';
import MainAppBar from '../components/layout/MainAppBar';
import Footer from './layout/footer';
import Breadcrumbs from './layout/breadcrumbs';
import {Grid} from './layout/grid';
import MenuDialog from './layout/MenuDialog';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.onMenuToggle = this.onMenuToggle.bind(this);
    this.state = { menuOpen: false };
  }

  onMenuToggle = (force) => {
    // Optional force param should be bool
    let newMenuOpen = !this.state.menuOpen;
    if (force != undefined) {
      newMenuOpen = force;
    }
    this.setState({menuOpen: newMenuOpen});
  }

  render() {
    var { children, activePage, title } = this.props;

    if (!activePage) {
      activePage = 'blog';
    }

    return (
      <div>
        <MainAppBar activePage={activePage} onMenuToggle={this.onMenuToggle} />
        {title && (<Breadcrumbs>{title}</Breadcrumbs>)}
        <Grid>{ children }</Grid>
        <MenuDialog activePage={activePage}  open={this.state.menuOpen} onMenuToggle={this.onMenuToggle}/>
        {/* <Footer /> */}
      </div>
    );
  }
}

Page.propTypes = {
  activePage: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};