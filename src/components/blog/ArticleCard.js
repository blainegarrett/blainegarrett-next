import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import InternalLink from '../../containers/InternalLink';

const NextLink = React.forwardRef((props, ref) => {
  const { href, as, prefetch, passHref, linkComponent, ...rest } = props;
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

const useStyles = makeStyles((theme) => {
  return {
    card: {
      //float: 'left',
      borderTop: 0,
      width: '100%',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      boxShadow: 'none',
      borderRadius: 0,
    },
    media: {
      // ⚠️ object-fit is not supported by IE 11.
      objectFit: 'cover',
      maxHeight: 250,
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

  return (
    <Card className={classes.card}>
      <CardActionArea
        component={InternalLink}
        href={`/blog/article?slug=${resource.slug}`}
        as={`/${slug_prefix}/${resource.slug}`}
      >
        <CardMedia
          component="img"
          alt={resource.title}
          className={classes.media}
          image={image_url}
          title={resource.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {resource.title}
          </Typography>
          <Typography component="p">{resource.summary}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ArticleCard.propTypes = {
  resource: PropTypes.object,
};
