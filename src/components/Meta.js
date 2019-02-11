import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';


let defaultMeta = {
  title: 'Blaine Garrett',
  description: 'Art, Tech, and more from Blaine Garrett',
  keywords: 'minneapolis, art, tech, minnesota, react, python, google app engine',
  //image: DEFAULT_META.CARD_IMAGE,
  //imageHeight: DEFAULT_META.CARD_HEIGHT,
  //imageWidth: DEFAULT_META.CARD_WIDTH,
  //type: PAGE_TYPES.WEBSITE
};


const shapeMeta = (rawdata) => {
  let meta = Object.assign({}, defaultMeta, rawdata);

  // Setup Meta Tags ....
  let metaData = {title: null, meta: []};

  // Title
  metaData['title'] = meta.title;
  metaData['meta'].push({'property': 'og:title', 'content': meta.title});
  metaData['meta'].push({'itemProp': 'name', 'content': meta.title});

  // Description
  metaData['meta'].push({'name': 'description', 'content': meta.description});
  metaData['meta'].push({'property': 'og:description', 'content': meta.description});
  metaData['meta'].push({'itemProp': 'description', 'content': meta.description});

  // Images
  metaData['meta'].push({'name': 'image', 'content': meta.image});
  metaData['meta'].push({'property': 'og:image', 'content': meta.image});
  metaData['meta'].push({'property': 'og:image:height', 'content': meta.imageHeight});
  metaData['meta'].push({'property': 'og:image:width', 'content': meta.imageWidth});

  //Keywords - TODO: Not currently dynamic
  metaData['meta'].push({'name': 'keywords', 'content': meta.keywords});

  // Twitter Specific - Note: Twitter summary card with large image must be at least 280x150px
  metaData['meta'].push({'name': 'twitter:card', 'content': 'summary_large_image'});
  metaData['meta'].push({'name': 'twitter:site', 'content': '@blainegarrett'});
  metaData['meta'].push({'name': 'twitter:title', 'content': meta.title});
  metaData['meta'].push({'name': 'twitter:description', 'content': meta.description});
  metaData['meta'].push({'name': 'twitter:creator', 'content': '@blainegarrett'});
  metaData['meta'].push({'name': 'twitter:image:src', 'content': meta.image});

  // Facebook/OpenGraph specific
  //metaData['meta'].push({'property': 'fb:app_id', 'content': '160730564113215'});
  metaData['meta'].push({'property': 'og:type', 'content': meta.type});
  metaData['meta'].push({'property': 'og:site_name', 'content': 'BlaineGarrett.com'});
  metaData['meta'].push({'property': 'og:locale', 'content': 'en_US'});

  if (metaData.author) {
    metaData['meta'].push({'name': 'author', 'content': meta.author});
    metaData['meta'].push({'property': 'author', 'content': meta.author});
  }

  return metaData;


  /*
   <!-- Open Graph data -->
   <meta property="og:title" content="Title Here" />
         <meta property="og:type" content="article" />
      <meta property="og:url" content="http://www.example.com/" />
      <meta property="og:image" content="http://example.com/image.jpg" />
      <meta property="og:description" content="Description Here" />
      <meta property="og:site_name" content="Site Name, i.e. Moz" />
      <meta property="article:published_time" content="2013-09-17T05:59:00+01:00"  />
      <meta property="article:modified_time" content="2013-09-16T19:08:47+01:00"  />
      <meta property="article:section" content="Article Section"  />
      <meta property="article:tag" content="Article Tag"  />
      <meta property="fb:admins" content="Facebook numberic ID"  />
      */
};


const Meta = ({meta}) => {
  let preppedMetaData = shapeMeta(meta);

  // Convert prepped data to actual tags required for next/Head
  // Render the tags
  let renderedTags = preppedMetaData.meta.map((data, i)=>{
    return <meta key={i} {...data} />;
  });

  //Attach any non <meta /> tags
  renderedTags.push(<title key={'title'}>{preppedMetaData.title}</title>);

  return (
    <Head>{renderedTags}</Head>
  );
};
Meta.propTypes = {
  meta: PropTypes.object
};
export default Meta;
