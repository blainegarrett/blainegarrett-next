// Heading
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontFamily: '"Open Sans"',
    display: 'block',
    '&::after': {
      marginTop: '1.07143rem',
      width: '5rem',
      borderTopWidth: '2px',
      content: '" "',
      display: 'block',
      borderTopStyle: 'solid',
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Heading: React.FC<{}> = (props) => {
  let classes = useStyles();
  return (
    <Typography paragraph variant="h5" className={classes.root}>
      {props.children}
    </Typography>
  );
};

export default Heading;
