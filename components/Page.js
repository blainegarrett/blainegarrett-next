import React from 'react';
import Root from '../containers/root';
import MainAppBar from '../components/layout/MainAppBar';
import Footer from './layout/footer';
export default class Component extends React.Component {
  render() {
    var { children } = this.props;
    return (
      <Root>
        <MainAppBar />

        <div className="page">{ children }</div>

        <Footer />
      </Root>
    );
  }
}