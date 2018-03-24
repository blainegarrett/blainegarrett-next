import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import {Grid, Row, Col} from '../../components/layout/grid';
import classnames from 'classnames';
import Link from 'next/link';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#000', // TODO: Make theme variable?
  },
  toolbar: {
    paddingLeft:0
  },
  flex: {
    flex: 1,
  },

  titleImage: {
    marginLeft: '-20px', // Note this is due to my goofy logo having padding
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  menuLink: {
    color: '#687074',
    lineHeight: 1.6,
    fontSize: '15px',
    fontWeight: '400',
    padding: '9px 20px',
    textTransform: 'uppercase',
    borderBottom: 'solid 2px transparent',
    '&.active': {
      borderBottom: 'solid 2px #72c02c',
      color: '#72c02c',
    },
    '&:hover': {
      borderBottom: 'solid 2px #72c02c',
      color: '#72c02c',
    }
  }
};


class _MyLink extends React.Component {
  render() {
    const { style, href, hrefAs, children, prefetch } = this.props
    return (
        <Link href={href} as={hrefAs} prefetch={prefetch}>
          <a>
            {children}
          </a>
        </Link>
    )
  }
}

//const MyLink = withStyles(styles)(_MyLink);
//const MyLink = ({children, ...props}) => <Link href="/open-collective"><a>{children}</a></Link>

//const MyLink = ({children, ...props}) => <a>{children}</a>

//const MyLink = props => <span {...props} />

const MyLink = ({children, ...props}) => <Link href="/open-collective" {...props}><a>{children}</a></Link>

/*
function _MenuOption({classes, active, children, ...props}) {

  // <MyLink {...props}>{children}</MyLink>
  //console.log(...props)
  //   //     <Button className={classnames(classes.menuLink, active && 'active')} color="inherit">{children}</Button>
  return (
    <Link href="/open-collective">
      <Button
      //component={() =>(<MyLink {...props}>{children}</MyLink>)}
      component='a'
      className={classnames(classes.menuLink, active && 'active')}
      color="inherit" />
    <Link>
  );
}

const MenuOption = withStyles(styles)(_MenuOption);

*/

const MenuOption = ({classes, active, href, as, ...props}) => {
                return <Link href={href} as={as}>
                <Button
                  //component={MyLink}
                  component='a'
                  //component={(props) =>{console.log(props); return (<MyLink href="/cheese" as="/cheese" { ...props}/>)}}
                  className={classnames(classes.menuLink, active && 'active')}
                  href={as}
                  {...props}
                  color="inherit" />
                </Link>
}




function ButtonAppBar(props) {
  const { classes, activePage } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Grid>
          <Toolbar className={classes.toolbar}>
            <Row>
              <Col xs={4}>
                <div className={classes.flex}>
                  <Link href="/index" as="/"><a title="Home"><img src="http://www.blainegarrett.com/static/themes/v2/assets/logo.png" alt="Blaine Garrett Logo" className={classes.titleImage} /></a></Link>
                </div>
              </Col>
              <Col xs={8} style={{marginTop:'12px', textAlign:'right'}}>

                <MenuOption classes={classes} href="/about" as="/about" active={activePage == 'about'}>About</MenuOption>
                <MenuOption classes={classes} href="/blog" as="/blog" active={activePage == 'blog'}>Blog</MenuOption>
                <MenuOption classes={classes} href="/blog/category?slug=exhibition-reviews" as="/exhibition-reviews" active={activePage == 'art'}>Art</MenuOption>
                <MenuOption classes={classes} href="/blog/category?slug=programming" as="/programming" active={activePage == 'programming'}>Programming</MenuOption>
                <MenuOption classes={classes} href="/links" as="/link" active={activePage == 'links'}>Links</MenuOption>

              </Col>
            </Row>
          </Toolbar>
        </Grid>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  activePage: PropTypes.string
};

export default withStyles(styles)(ButtonAppBar);