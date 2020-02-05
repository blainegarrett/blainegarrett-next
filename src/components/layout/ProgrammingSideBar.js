import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedIn from '@material-ui/icons/LinkedIn';
import Hashnode from '../Hashnode';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const ProgrammingSidebar = () => (
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
    </List>

    <ListItem button component="a" href="https://hashnode.blainegarrett.com/" target="_blank" rel="noopener">
      <ListItemIcon>
        <Hashnode />
      </ListItemIcon>
      <ListItemText primary="Hashnode" />
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
  </div>
);

export default ProgrammingSidebar;
