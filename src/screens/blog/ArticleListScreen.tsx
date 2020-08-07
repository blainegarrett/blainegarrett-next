// Article List Screen

import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import { selectors as articleSelectors } from '~/modules/articles/redux';
import { constants as articleConstants } from '~/modules/articles/redux';

import { Row, Col } from '~/components/layout/grid';
import ArticleCard from '~/components/blog/ArticleCard';
import { ArticleResource } from '~/modules/articles/types';

function useArticles(paginationKey: string) {
  const selector = articleSelectors.selectStuff;
  return useSelector((state) => selector(state, articleConstants.REDUCER_NAMESPACE, paginationKey, null));
}

interface ArticleListScreenProps {
  loadMoreArticles: (cursor: string) => void;
  paginationKey: string;
}

export default function ArticleListScreen(props: ArticleListScreenProps): JSX.Element {
  let { paginationKey, loadMoreArticles } = props;
  const { resources, more, nextCursor } = useArticles(paginationKey);

  return (
    <Row>
      <Col xs={12}>
        <Row>
          {resources.map((resource: ArticleResource) => {
            return (
              <Col xs={12} md={6} key={resource.resource_id}>
                <ArticleCard resource={resource} />
              </Col>
            );
          })}
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
      </Col>
    </Row>
  );
}
