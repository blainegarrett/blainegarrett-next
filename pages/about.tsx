// About Page
import React from 'react';
import { NextPage } from 'next';

import Page from '../src/components/Page';
import { Row, Col } from '../src/components/layout/grid';
import ContentWrapper from '../src/components/layout/ContentWrapper';
import SideBar from '../src/components/layout/SideBar';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedIn from '@material-ui/icons/LinkedIn';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';

const AboutPage: NextPage<{}> = () => {
  const meta = {
    title: 'About Blaine Garrett',
    description: 'Minneapolis Based Artist, Software Engineer, and Tinkerer',
    url: 'https://www.blainegarrett.com/about',
  };

  const sideBarContent = (
    <div style={{ color: '#000000' }}>
      <List component="nav" aria-label="otherstuff">
        <ListItem button component="a" href="https://github.com/blainegarrett" target="_blank" rel="noopener">
          <ListItemIcon>
            <GitHubIcon />
          </ListItemIcon>
          <ListItemText primary="Github" />
        </ListItem>

        <ListItem button component="a" href="https://www.linkedin.com/in/blainegarrett/" target="_blank" rel="noopener">
          <ListItemIcon>
            <LinkedIn />
          </ListItemIcon>
          <ListItemText primary="LinkedIn" />
        </ListItem>
        <ListItem
          button
          component="a"
          href="https://storage.googleapis.com/blaine-garrett/resume/blaine-garrett-resume-2020-02-05-no-phone.pdf"
          target="_blank"
          rel="noopener"
        >
          <ListItemIcon>
            <FormatListBulleted />
          </ListItemIcon>
          <ListItemText primary="Resume" />
        </ListItem>
        <Divider />

        <ListItem button component="a" href="https://www.instagram.com/blaine.garrett/" target="_blank" rel="noopener">
          <ListItemIcon>
            <InstagramIcon />
          </ListItemIcon>
          <ListItemText primary="Instagram" />
        </ListItem>

        <ListItem button component="a" href="https://twitter.com/blainegarrett" target="_blank" rel="noopener">
          <ListItemIcon>
            <TwitterIcon />
          </ListItemIcon>
          <ListItemText primary="Twitter" />
        </ListItem>

        <ListItem button component="a" href="mailto:blaine@blainegarrett.com">
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Page isFluid title="About Me" activePage="about" meta={meta}>
      <ContentWrapper
        title={meta.title}
        image="https://commondatastorage.googleapis.com/blaine-garrett/juniper/antistar_spaceskull_100dpi.jpg"
        sideBarContent={sideBarContent}
      >
        <Row>
          <Col xs={12} lg={12}>
            <Row>
              <Col xs={12} md={6}>
                <div style={{ padding: 16 }}>
                  <p>Hi, I am Blaine: a Minneapolis based artist, software engineer, and tinkerer.</p>

                  <p>
                    I am married to a wonderful human being named Katie (
                    <a href="http://www.usuallypolite.com">@UsuallyPolite</a>) who happens to be brilliant. We make
                    together.
                    <br />
                    <br />
                    Things I am involved with
                  </p>
                  <ul>
                    <li>
                      <a href="https://www.mplsart.com">MPLSART.COM</a> -- Twin Cities visual arts calendar I co-run
                      with my wife Katie.
                    </li>
                    <li>
                      <a href="http://www.dimmedia.com">Dim Media</a> - Twin Cities Artist Collaborative
                    </li>
                    <li>
                      <a href="https://www.localm.org">Local Music Online</a> -- Archive of the NW Wisconsin Music
                      1998-2003 (returning soon - maybe?)
                    </li>
                  </ul>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <img
                  style={{ width: '100%' }}
                  className="img-responsive"
                  src="https://storage.googleapis.com/blaine-garrett/theme/v2/about_wedding.jpg"
                  alt="#party"
                />
              </Col>
            </Row>
          </Col>

          <Col xs={3}>
            <SideBar />
          </Col>
        </Row>
      </ContentWrapper>
    </Page>
  );
};
export default AboutPage;
