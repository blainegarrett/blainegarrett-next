import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'clsx';
import Link from 'next/link';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const styles = {
  menuBackground: {
    root: {
      backgroundColor: '#000',
      color: '#fff',
    },
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 8,
  },
  listItemText: {
    '&.active span': {
      borderBottom: 'solid 2px #72c02c',
      color: '#72c02c',
    },
    '& span': {
      color: '#687074',
      lineHeight: 1.6,
      fontSize: '15px',
      fontWeight: '400',
      padding: '9px 20px',
      textTransform: 'uppercase',
      borderBottom: 'solid 2px transparent',
      '&:hover': {
        borderBottom: 'solid 2px #72c02c',
        color: '#72c02c',
      },
    },
  },

  title: {
    '& h2': {
      color: '#72c02c',
    },
  },
};

const MenuOption = ({ classes, active, href, as, children, ...props }) => {
  return (
    <Link href={href} as={as}>
      <ListItem divider button component="a" className={classnames(classes.listItem)} href={as} {...props}>
        <ListItemText className={classnames(classes.listItemText, active && 'active')} primary={children} />
      </ListItem>
    </Link>
  );
};

MenuOption.propTypes = {
  classes: PropTypes.object,
  active: PropTypes.bool,
  href: PropTypes.string,
  as: PropTypes.string,
  children: PropTypes.node,
};

class SimpleDialog extends React.Component {
  handleClose = () => {
    this.props.onMenuToggle(false);
  };

  render() {
    const { classes, activePage, open } = this.props;

    return (
      <Dialog
        keepMounted={false}
        onClose={this.handleClose}
        open={open}
        PaperProps={{
          style: { backgroundColor: '#000', color: '#fff', width: '100%' },
        }}
      >
        <DialogTitle className={classes.title} id="simple-dialog-title">
          Navigation
        </DialogTitle>

        <List>
          <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/"
            as="/"
            active={activePage == 'home'}
          >
            Home
          </MenuOption>
          <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/about"
            as="/about"
            active={activePage == 'about'}
          >
            About
          </MenuOption>
          <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/blog"
            as="/blog"
            active={activePage == 'blog'}
          >
            Blog
          </MenuOption>
          <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/blog/category?slug=art"
            as="/art"
            active={activePage == 'art'}
          >
            Art
          </MenuOption>
          <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/blog/category?slug=programming"
            as="/programming"
            active={activePage == 'programming'}
          >
            Programming
          </MenuOption>
          {/*
            <MenuOption
            onClick={() => this.handleClose()}
            classes={classes}
            href="/links"
            as="/links"
            active={activePage == 'links'}
          >
            Links
          </MenuOption>
          */}
        </List>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onMenuToggle: PropTypes.func,
  open: PropTypes.bool,
  activePage: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);
