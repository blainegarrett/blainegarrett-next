// Standard Hex Card
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    visibility: 'hidden',
    outline: '1px solid transparent' /* fix for jagged edges in FF on hover transition */,
  },
  wrap: {
    backgroundColor: 'red',
    position: 'absolute',
    width: '96%',
    paddingBottom: '110.851%' /* =  width / sin(60) */,
    margin: '0 2%',
    overflow: 'hidden',
    visibility: 'hidden',
    outline: '1px solid transparent' /* fix for jagged edges in FF on hover transition */,
    transform: 'rotate3d(0,0,1,-60deg) skewY(30deg)',
    '& *': {
      position: 'absolute',
      visibility: 'visible',
      outline: '1px solid transparent' /* fix for jagged edges in FF on hover transition */,
    },
  },
  linkContainer: {
    display: 'block',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    color: '#fff',
    overflow: 'hidden',
    transform: 'skewY(-30deg) rotate3d(0,0,1,60deg)',
  },
  img: {
    left: '-100%',
    right: '-100%',
    width: 'auto',
    height: '100%',
    margin: '0 auto',
    transform: 'rotate3d(0,0,0,0deg)',
    backgroundPosition: '50%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  },
}));

interface HexCardProps {
  size?: 'small' | 'medium' | 'default';
  title: string;
  imgSrc: string;
  description: string;
}

const HexCard: React.FC<HexCardProps> = (props) => {
  const classes = useStyles();
  return (
    <li className={classes.root}>
      <div className={classes.wrap}>
        <a className={classes.linkContainer} href="#">
          <div className={classes.img} style={{ backgroundImage: `url('${props.imgSrc}'` }} />
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </a>
      </div>
    </li>
  );
};

export default HexCard;
