// Links Page
import React from 'react';
import Head from 'next/head';
import Page from '../src/components/Page';
import { withStyles } from '@material-ui/core/styles';
import {Row, Col} from './../src/components/layout/grid';



const Hexagon = () => {
  return (<li className="hex">
    <div className="hexIn">
      <a className="hexLink" href="#">
        <div className='img' style={{'background-image':'url(https://images.unsplash.com/photo-1417436026361-a033044d901f?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;w=1080&amp;fit=max&amp;s=faa4e192f33e0d6b7ce0e54f15140e42)'}}></div>

        <h1 id="demo1">This is a title</h1>
        <p id="demo2">Some sample text about the article this hexagon leads to</p>
      </a>
    </div>
  </li>);
}






const styles = {};
class LinksPage extends React.Component {
  render () {
    let meta = {
      title: 'Links',
      description: 'Some links to my other projects and things I think you should check out'
    };
    return (
      <Page title="Links" activePage="links" meta={meta} isFluid={true}>
        <Row>
          <Col xs={12}>
            <p>Having a links page is so 2001, but so am I. Here are links to my other projects and assorted other things of interest.</p>


            <div className="article">
              <p>Pellentesque habitant morbi tristique senectus et
              netus et malesuada fames ac turpis egestas. Vestibulum tortor quam,
              feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu
              libero sit amet quam egestas semper. Aenean ultricies mi vitae est.
              Mauris placerat eleifend leo.</p>
            </div>



            <div className="content-main">
              <div className="content-box">
                <h2>Ripped Paper Effect</h2>
                <p>Enthusiastically leverage others effective users via client-centric portals. Energistically promote principle-centered portals vis-a-vis virtual strategic theme areas. Assertively streamline premium alignments through focused total linkage.</p>
              </div>
            </div>

            <div className="grid">
              <ul id="hexGrid">
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
                <Hexagon />
              </ul>
            </div>
          </Col>
        </Row>
      </Page>
    );
  }
}
LinksPage.propTypes = {};

export default withStyles(styles)(LinksPage);
