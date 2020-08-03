import React from 'react';
// import analytics from '../analytics';

// TODO: Docstring
// function clickHandler(e: React.MouseEvent): void {
//   // Record Analytics
//   analytics.logClickEvent(e.currentTarget as HTMLElement);
// }

interface ExternalLinkProps extends React.HTMLProps<HTMLAnchorElement> {
  href: string; // Forces href to be required
  children: React.ReactNode; // Forces children to be required
}

// eslint-disable-next-line react/display-name
const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>((props, ref) => {
  // Peel off the onClick handler if given
  const { onClick, ...rest } = props;

  const wrappedOnClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    if (onClick) {
      // If the consumer passed in onClick, call it
      onClick(e);
    }

    // Finally, call our External Handler
    //clickHandler(e);
  };

  return <a ref={ref} data-ga-category="external-link" {...rest} onClick={wrappedOnClick} />;
});

export default ExternalLink;
