import React from 'react';
import cx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ExternalLink from '~/containers/ExternalLink';
import { CardActionArea } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: theme.shadows[4],
    position: 'relative',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(4),
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(2),
      marginTop: 0,
    },
  },

  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    boxShadow: theme.shadows[4],

    [theme.breakpoints.up('md')]: {
      width: '100%',
      marginLeft: theme.spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      //backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: theme.spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
    alignContent: 'center',
  },
  coolbutton: {},
}));

interface CardProps {
  imgUrl: string;
  readMore: string;
  title: string;
  summary: string;
}

export const BlogCardDemo = React.memo(function BlogCard(props: CardProps) {
  const classes = useStyles();
  const { imgUrl, title, summary, readMore } = props;

  return (
    <Card className={cx(classes.root)}>
      <CardMedia className={cx(classes.media)} image={imgUrl} component={'a'} href={readMore}>
        {' '}
      </CardMedia>
      <CardContent>
        <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>{title}</h2>
        {summary}
        <br />
        <Button component={ExternalLink} href={readMore} variant="contained" color="primary" className={classes.cta}>
          Read more
        </Button>
      </CardContent>
    </Card>
  );
});

export default BlogCardDemo;
