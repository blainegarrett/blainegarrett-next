import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
    clear: 'both',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    '& *': {
      zIndex: 500,
    },
  },

  profilePicWrapper: {
    width: '200px',
    [theme.breakpoints.down('md')]: {
      //marginTop: '-80px',
      alignSelf: 'center',
    },
  },
  profilePic: {
    borderRadius: theme.spacing(4),
    width: '100%',
  },
  greetingWrapper: {
    padding: 16,
    flex: 1,
    //border: '1px solid green',
  },

  topLine: {
    display: 'block',
    fontFamily: '"Open Sans"',
    textAlign: 'center',
    color: '#ffffff',
    [theme.breakpoints.down('md')]: {
      fontSize: 30,
    },
  },
}));

const Heading: React.FC<{}> = (props) => {
  let classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.profilePicWrapper}>
        <img
          className={classes.profilePic}
          src="https://avatars2.githubusercontent.com/u/196183?s=400&u=6b71147233ca9fc4c0590ff52ec97aa116bfe8ea&v=4"
        />
      </div>
      <div className={classes.greetingWrapper}>
        <Typography paragraph variant="h3" className={classes.topLine}>
          Hello, I'm Blaine
        </Typography>
        <Typography
          paragraph
          variant="h6"
          style={{
            display: 'block',
            color: '#ffffff',
            fontFamily: '"Open Sans"',
            textAlign: 'center',
            //border: '1px solid red',
          }}
        >
          I'm a Minneapolis-based Product Engineer &amp; Artist
        </Typography>

        <Button
          color="primary"
          variant="outlined"
          style={{ width: '45%', borderWidth: '2px', fontWeight: 'bolder', backdropFilter: 'blur(3px)' }}
          href="https://storage.googleapis.com/blaine-garrett/resume/blaine-garrett-resume-2020-02-05-no-phone.pdf"
        >
          Resume
        </Button>
        <Button
          color="primary"
          variant="outlined"
          style={{
            width: '45%',
            float: 'right',
            borderWidth: '2px',
            fontWeight: 'bolder',
            backdropFilter: 'blur(3px)',
          }}
          href="https://www.linkedin.com/in/blainegarrett/"
        >
          LinkedIn
        </Button>
      </div>
    </div>
  );
};

export default Heading;
