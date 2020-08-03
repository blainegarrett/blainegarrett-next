// Simple Routing Wrapper Suitable for Passing to Material Components.

import React, { useContext } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import AppContext from '~/contexts/AppContext';
import analytics from '~/analytics';

type InternalLinkProps = React.HTMLAttributes<HTMLAnchorElement> & NextLinkProps;

// eslint-disable-next-line react/display-name
const InternalLink = React.forwardRef<HTMLAnchorElement, InternalLinkProps>((props, ref) => {
  // Peel off the onClick handler if given and the next props...
  // eslint-disable-next-line prefer-const
  let { href, as, prefetch, onClick, ...rest } = props;

  //const appCtx = useContext(AppContext);
  //const { setMenuActive } = appCtx;

  const wrappedOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e);
    }

    // Attempt to record analytic
    if (e && e.currentTarget) {
      analytics.logClickEvent(e.currentTarget);
    }

    // Close Menu - if check is due to typescript and cxt initialization...
    //if (setMenuActive) setMenuActive(false);
  };

  // TODO: This is to save bandwidth for now. If prefetch is undefined, explicitly set to false
  if (!prefetch) {
    prefetch = false;
  }

  return (
    <NextLink {...{ href, as, prefetch }}>
      <a ref={ref} {...rest} onClick={wrappedOnClick} />
    </NextLink>
  );
});

export default InternalLink;

/*
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { AppContext } from '../contexts/AppContext';
import analytics from '../analytics';

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
*/
