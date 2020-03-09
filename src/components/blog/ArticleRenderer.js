import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  legacyContainer: {
    padding: '0 16px',
    '& img': {
      width: '100% !important',
    },
  },
}));

export default function ArticleRenderer({ article }) {
  const classes = useStyles();

  // Process Content
  // TODO: Move this to a more unit testable spot
  let content = article.content;
  const youtubeTemplate =
    '<div class="videoWrapper"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/$2" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>';

  //const youtubeTemplate =
  //  '<div class="videoWrapper1">$1</div><div class="videoWrapper2">$2</div><div class="videoWrapper3">$3</div><div class="videoWrapper4">$4</div>';

  content = content.replace(/<pre>/gi, '<pre class="language-javascript">');
  content = content.replace(/(\[youtube:https?:\/\/www\.youtube\.com\/watch\?v=)(.+)(])/gi, youtubeTemplate);

  return (
    <div className={classes.legacyContainer}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

ArticleRenderer.propTypes = {
  classes: PropTypes.object,
  article: PropTypes.object,
};
