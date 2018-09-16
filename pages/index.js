import React from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Page from '../src/components/Page';
import {Row, Col} from './../src/components/layout/grid';

const styles = {};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
};

class IndexPage extends React.Component {
  static async getInitialProps ({}) {
    return {};
  }

  render () {
    let meta = {
      title: 'Welcome',
      description: 'My Homepage'
    };
    return (
      <Page title="Welcome" activePage="home" meta={meta}>
        <Row>
          <Col xs={12}>
            <div>Returning soon. I'm rebuilding my site from the ground up to be be more 2018 friendly:

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
      </Page>
    );
  }
}
IndexPage.propTypes = {};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(IndexPage));
