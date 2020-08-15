// A Semantic Wrapper for Material-UI's Grid Component
import React from 'react';
import MuiGrid, { GridProps } from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';
import classnames from 'clsx';

const useGridStyles = makeStyles((theme: Theme) => ({
  fluidContainer: {
    width: '100%',
    flexGrow: 1,
  },
  legacyContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%', // xs,sm
    flexGrow: 1,
    paddingRight: theme.spacing(2) / 2,
    paddingLeft: theme.spacing(2) / 2,

    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.only('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.only('md')]: {
      width: theme.breakpoints.width('md'),
    },
    [theme.breakpoints.only('lg')]: {
      width: theme.breakpoints.width('lg'),
    },
    [theme.breakpoints.only('xl')]: {
      // force width of lg
      width: theme.breakpoints.width('lg'),
    },
  },
  alignRight: { marginRight: 0 },
  alignLeft: { marginLeft: 0 },
}));

///////////////////////////////////////////////////////////////////////////////
// Grid Container
///////////////////////////////////////////////////////////////////////////////
export interface GridPropsX {
  fluid?: boolean;
  className?: string;
  align?: 'left' | 'right' | 'center'; // Default left
}

const Grid: React.FC<GridPropsX> = ({ className, fluid, children, align, ...rest }) => {
  let gridClasses = useGridStyles();
  let collectedClasses = [className];

  // Fluid Container
  if (fluid) {
    collectedClasses.push(gridClasses.fluidContainer);
  } else {
    collectedClasses.push(gridClasses.legacyContainer);
  }

  // Alignment
  if (align === 'right') {
    collectedClasses.push(gridClasses.alignRight);
  } else if (align === 'left') {
    collectedClasses.push(gridClasses.alignLeft);
  } // Default 'center'

  return (
    <div className={classnames(collectedClasses)} {...rest}>
      {children}
    </div>
  );
};

///////////////////////////////////////////////////////////////////////////////
// Grid Row
///////////////////////////////////////////////////////////////////////////////
export interface RowProps extends GridProps {
  className?: string;
}

const Row: React.FC<RowProps> = ({ children, ...rest }) => {
  return (
    <MuiGrid {...rest} spacing={4} container={true}>
      {children}
    </MuiGrid>
  );
};

///////////////////////////////////////////////////////////////////////////////
// Grid Cell/Col
///////////////////////////////////////////////////////////////////////////////
export interface ColProps extends GridProps {
  className?: string;
}

const Col: React.FC<ColProps> = ({ children, ...rest }) => {
  return (
    <MuiGrid {...rest} item={true} container={false}>
      {children}
    </MuiGrid>
  );
};

export { Grid, Row, Col };
