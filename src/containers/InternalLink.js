import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { AppContext } from '../contexts/AppContext';
import analytics from '../../src/analytics';

export default function InternalLink(props) {
  const appCtx = useContext(AppContext);
  const { setMenuActive } = appCtx;

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
    const { href, as, prefetch, children, ...rest } = this.props;
    return (
      <NextLink {...{ href, as, prefetch }}>
        <linkComponent {...rest}>{children}</linkComponent>
      </NextLink>
    );
  }
}

XInternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};

InternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
};
