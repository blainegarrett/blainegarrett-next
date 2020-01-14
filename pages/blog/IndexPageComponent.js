// Blog Page Index...

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectors as articleSelectors } from '../../src/modules/articles/redux';
import { constants as articleConstants } from '../../src/modules/articles/redux';

import { Row, Col } from './../../src/components/layout/grid';
import ArticleCard from './../../src/components/blog/ArticleCard';
import Button from '@material-ui/core/Button';

function useArticles(paginationKey) {
  const selector = articleSelectors.selectStuff;
  return useSelector(state => selector(state, articleConstants.REDUCER_NAMESPACE, paginationKey, null));
}

export default function IndexPageComponent({loadMoreArticles, paginationKey}) {
  let {resources, more, nextCursor} = useArticles(paginationKey);

  return (
    <Row>
      <Col xs={12}>
        <Row>
          <Col xs={12}>
            {resources.map(resource => {
              return (
                <div key={resource.resource_id}>
                  <ArticleCard resource={resource} />
                </div>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div style={{ padding: 16 }}>
              {more && (
                <Button
                  style={{ width: '100%' }}
                  variant="contained"
                  color="primary"
                  onClick={() => loadMoreArticles(nextCursor)}
                >
                      more articles
                </Button>
              )}
            </div>
          </Col>
        </Row>
        {/* [({more.toString()}, {nextCursor})] */}
      </Col>
    </Row>
  );
}

IndexPageComponent.propTypes = {
  loadMoreArticles: PropTypes.func,
  paginationKey: PropTypes.string
};

