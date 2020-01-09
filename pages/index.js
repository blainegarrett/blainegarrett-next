import React from 'react';
import { connect } from 'react-redux';
import Page from '../src/components/Page';
import { Row, Col } from './../src/components/layout/grid';
import ContentWrapper from './../src/components/layout/ContentWrapper';

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class IndexPage extends React.Component {
  static async getInitialProps({}) {
    return {'taco': 1}; // This is to supress the Next.js warning
  }

  render() {
    let meta = {
      title: 'Welcome'
      //description: 'My Homepage'
    };

    return (
      <Page isFluid activePage="home" meta={meta}>
        <ContentWrapper
          title={'Welcome'}
          image="https://legacy-dot-blaine-garrett.appspot.com/static/drips1.jpg"
          headerLarge
        >
          <Row>
            <Col xs={12}>
              <div style={{ padding: 16 }}>
                Returning soon. I'm rebuilding the site from the ground up to be
                be more 2019 friendly:
                <ul>
                  <li>Material Design</li>
                  <li>React/Redux</li>
                  <li>NextJS</li>
                  <li>REST</li>
                  <li>NodeJS on Google App Engine Standard.</li>
                </ul>
                Stay tuned.
              </div>
            </Col>
          </Row>
        </ContentWrapper>
      </Page>
    );
  }
}
IndexPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
