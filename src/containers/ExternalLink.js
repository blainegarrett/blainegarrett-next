import React from 'react';
import PropTypes from 'prop-types';

export default class ExternalLink extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    return <a {...rest}>{children}</a>;
  }
}

ExternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
};
