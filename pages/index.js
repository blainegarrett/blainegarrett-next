import React from 'react';
import { connect } from 'react-redux';
import Page from '../src/components/Page';
import { Grid, Row, Col } from './../src/components/layout/grid';
import HomepageHeader from './../src/components/HomepageHeader';

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

class IndexPage extends React.Component {
  static async getInitialProps({}) {
    return {};
  }

  render() {
    let meta = {
      title: 'Welcome'
      //description: 'My Homepage'
    };

    return (
      <Page isFluid activePage="home" meta={meta}>
        <Row>
          <Col xs={12}>
            <HomepageHeader />

            <Grid>
              <Row>
                <Col xs={12} lg={12}>
                  <div>
                    Returning soon. I'm rebuilding the site from the ground up
                    to be be more 2019 friendly:
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
            </Grid>
          </Col>
        </Row>
      </Page>
    );
  }
}
IndexPage.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
