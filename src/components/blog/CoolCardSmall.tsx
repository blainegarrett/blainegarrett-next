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
    minHeight: 300,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: theme.shadows[4],
    position: 'relative',
    overflow: 'initial',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '64%',
      bottom: 0,
      zIndex: 1,
      background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
      borderRadius: theme.spacing(2), // 16px
    },
    '&:hover': {
      boxShadow: theme.shadows[8],
    },
    '&.large': {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(4),
    },

    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(2),
      marginTop: 0,
      '&.small': {
        flexDirection: 'column',
        margin: '0 8px',
      },
    },
  },
  content: {
    padding: 24,
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    width: '100%',
  },
}));

interface CardProps {
  imgUrl: string;
  variant?: 'small' | 'large';
  readMore: string;
  title: string;
  summary: string;
}

export const BlogCardDemo = React.memo(function BlogCard(props: CardProps) {
  const classes = useStyles();
  const { imgUrl, variant, title, summary, readMore } = props;

  return (
    <Card className={cx(classes.root, variant)} style={{ backgroundImage: `url('${imgUrl}')` }}>
      <CardActionArea component={'a'} href={readMore} style={{ position: 'absolute', top: 0, bottom: 0 }}>
        <CardContent className={classes.content}>
          <h2 style={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', fontSize: '14px' }}>{title}</h2>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

export default BlogCardDemo;
