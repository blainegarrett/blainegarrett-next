import React from 'react';
import Page from '../src/components/Page';
import PropTypes from 'prop-types';

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <Page>
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </Page>
    );
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
};
