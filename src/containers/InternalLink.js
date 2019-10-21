import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { AppContext } from '../contexts/AppContext';
import analytics from '../../src/analytics';

export default function InternalLink(props) {
  let appCtx = useContext(AppContext);
  let { setMenuActive } = appCtx;

  return (
    <XInternalLink
      {...props}
      onClick={event => {
        // Record Analytic
        analytics.logClickEvent(event.currentTarget);

        // Close Menu
        setMenuActive(false);
      }}
    >
      {props.children}
    </XInternalLink>
  );
}

class XInternalLink extends React.Component {
  render() {
    let { href, as, prefetch, children, ...rest } = this.props;
    return (
      <NextLink {...{ href, as, prefetch }}>
        <a {...rest}>{children}</a>
      </NextLink>
    );
  }
}

InternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool
};
