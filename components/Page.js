import React from 'react';
//import Root from '../containers/root';
import MainAppBar from '../components/layout/MainAppBar';
import Footer from './layout/footer';
import Breadcrumbs from './layout/breadcrumbs';
import {Grid, Row, Col} from './layout/grid';

export default class Component extends React.Component {
  render() {
    var { children, activePage, title } = this.props;

    if (!activePage) {
      activePage = 'blog';
    }
    return (
      <div>
        <MainAppBar activePage={activePage} />
        {title && (<Breadcrumbs>{title}</Breadcrumbs>)}
        <Grid>
            <Row>{ children }</Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}