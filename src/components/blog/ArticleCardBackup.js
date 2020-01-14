import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const NextLink = React.forwardRef((props, ref) => {
  const { href, as, prefetch, passHref, ...rest } = props;
  return (
    <Link href={href} as={as} prefetch={prefetch} passHref={passHref} ref={ref}>
      <props.linkComponent {...rest} />
    </Link>
  );
});
NextLink.displayName = 'NextLink';

NextLink.propTypes = {
  href: PropTypes.string,
  as: PropTypes.string,
  prefetch: PropTypes.bool,
  passHref: PropTypes.bool,
  linkComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

const useStyles = makeStyles(theme => {
  return {
    card: {
      float: 'left',
      width: '100%',
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
    actionButton: {
      padding: theme.spacing(2),
      display: 'flex',
      'justify-content': 'flex-end',
    },
  };
});

export default function ArticleCard(props) {
  const { resource } = props;
  const classes = useStyles();

  let image_url = 'https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg';
  if (resource.legacy_image_resource) {
    image_url =
      'https://commondatastorage.googleapis.com/blaine-garrett/' + resource.legacy_image_resource.gcs_filename;
  }

  const slug_prefix = moment(resource.published_date).format('YYYY/MM/DD');

  //return (
  //  <li><Link href={`/blog/article?slug=${resource.slug}`} as={`${slug_prefix}/${resource.slug}`}><a title={resource.slug} className="permalink">{ resource.title }</a></Link></li>
  //);

  return (
    <Card className={classes.card}>
      <CardActionArea
        component={NextLink}
        linkComponent={'button'}
        href={`/blog/article?slug=${resource.slug}`}
        as={`${slug_prefix}/${resource.slug}`}
      >
        <CardMedia
          component="img"
          alt={resource.title}
          className={classes.media}
          height="140"
          image={image_url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {resource.title}
          </Typography>
          <Typography component="p">{resource.summary}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actionButton}>
        <Button
          size="small"
          variant="contained"
          color="primary"
          component={NextLink}
          linkComponent={'button'}
          href={`/blog/article?slug=${resource.slug}`}
          as={`${slug_prefix}/${resource.slug}`}
        >
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}

ArticleCard.propTypes = {
  resource: PropTypes.object,
};
