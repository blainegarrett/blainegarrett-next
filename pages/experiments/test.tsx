// Links Page
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import clsx from 'clsx';
import { Row, Col } from '~/components/layout/grid';
import ContentWrapper from '~/components/layout/ContentWrapper';

const LinksPage: NextPage<{}> = () => {
  const meta = {
    title: 'Links',
    description: 'Some links to my other projects and things I think you should check out',
    url: 'https://www.blainegarrett.com/links',
  };

  let resources = [
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
    { title: 'asdsdsdf sdf dsf dsf' },
  ];

  return (
    <Page isFluid title="Links" activePage="experiments" meta={meta}>
      <style>{`

      #hexGrid {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        overflow: hidden;
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        list-style-type: none;
        padding: 0;
      }
      .hex {
        position: relative;
        visibility:hidden;
        outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
      }
      .hex.small {
        transform: scale3d(.5, .5, .5); 
        drop
      }
      .hex.med{
        transform: scale3d(.75, .75, .5); 
        filter: drop-shadow(2px 4px 6px black);      
      }
      .hex.med:hover {
        transition: transform .5s;
        transform: scale3d(1, 1, .5);
        filter: drop-shadow(2px 4px 10px black);      
      }


      .hex::after{
        content:'';
        display:block;
        padding-bottom: 86.602%;  /* =  100 / tan(60) * 1.5 */
      }

      .hexIn{
        position: absolute;
        width:96%;
        padding-bottom: 110.851%; /* =  width / sin(60) */
        margin:0 2%;
        overflow: hidden;
        visibility: hidden;
        outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */
        -webkit-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
            -ms-transform: rotate3d(0,0,1,-60deg) skewY(30deg);
                transform: rotate3d(0,0,1,-60deg) skewY(30deg);
      }
      .hexIn * {
        position: absolute;
        visibility: visible;
        outline:1px solid transparent; /* fix for jagged edges in FF on hover transition */

      }
      .hexLink {
          display:block;
          width: 100%;
          height: 100%;
          text-align: center;
          color: #fff;
          overflow: hidden;
          -webkit-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
              -ms-transform: skewY(-30deg) rotate3d(0,0,1,60deg);
                  transform: skewY(-30deg) rotate3d(0,0,1,60deg);
      }
      
      /*** HEX CONTENT **********************************************************************/
      .hex img {
        left: -100%;
        right: -100%;
        width: auto;
        height: 100%;
        margin: 0 auto;
        -webkit-transform: rotate3d(0,0,0,0deg);
            -ms-transform: rotate3d(0,0,0,0deg);
                transform: rotate3d(0,0,0,0deg);
      }
      
      .hex h1, .hex p {
        width: 100%;
        padding: 5%;
        box-sizing:border-box;
        background-color: rgba(0, 128, 128, 0.8);
        font-weight: 300;
        -webkit-transition:  -webkit-transform .2s ease-out, opacity .3s ease-out;
                transition:          transform .2s ease-out, opacity .3s ease-out;
      }
      .hex h1 {
        bottom: 50%;
        padding-top:50%;
        font-size: 1.5em;
        z-index: 1;
        -webkit-transform:translate3d(0,-100%,0);
            -ms-transform:translate3d(0,-100%,0);
                transform:translate3d(0,-100%,0);
      }
      .hex h1::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 45%;
        width: 10%;
        text-align: center;
        border-bottom: 1px solid #fff;
      }
      .hex p {
        top: 50%;
        padding-bottom:50%;
        -webkit-transform:translate3d(0,100%,0);
            -ms-transform:translate3d(0,100%,0);
                transform:translate3d(0,100%,0);
      }
      
      
      /*** HOVER EFFECT  **********************************************************************/
      .hexLink:hover h1, .hexLink:focus h1,
      .hexLink:hover p, .hexLink:focus p{
        -webkit-transform:translate3d(0,0,0);
            -ms-transform:translate3d(0,0,0);
                transform:translate3d(0,0,0);
      }
      
      /*** HEXAGON SIZING AND EVEN ROW INDENTATION *****************************************************************/
      @media (min-width:1201px) { /* <- 5-4  hexagons per row */
        #hexGrid{
          padding-bottom: 4.4%;
          margin: -12.5%
        }
        .hex {
          width: 20%; /* = 100 / 5 */
        }
        .hex:nth-child(9n+6){ /* first hexagon of even rows */
          margin-left:10%;  /* = width of .hex / 2  to indent even rows */
        }
      }
      
      @media (max-width: 1200px) and (min-width:901px) { /* <- 4-3  hexagons per row */
        #hexGrid{
          padding-bottom: 5.5%;
          margin:-16.5%
        }
        .hex {
          width: 25%; /* = 100 / 4 */
        }
        .hex:nth-child(7n+5){ /* first hexagon of even rows */
          margin-left:12.5%;  /* = width of .hex / 2  to indent even rows */
        }
      }
      
      @media (max-width: 900px) and (min-width:601px) { /* <- 3-2  hexagons per row */
        #hexGrid{
          padding-bottom: 7.4%;
          margin: -24.5%;
        }
        .hex {
          width: 33.333%; /* = 100 / 3 */
        }
        .hex:nth-child(5n+4){ /* first hexagon of even rows */
          margin-left:16.666%;  /* = width of .hex / 2  to indent even rows */
        }
      }
      
      @media (max-width: 600px) { /* <- 2-1  hexagons per row */
        #hexGrid{
          padding-bottom: 11.2%
        }
        .hex {
          width: 50%; /* = 100 / 3 */
        }
        .hex:nth-child(3n+3){ /* first hexagon of even rows */
          margin-left:25%;  /* = width of .hex / 2  to indent even rows */
        }
      }
      
      @media (max-width: 400px) {
          #hexGrid {
              font-size: 13px;
          }
      }
      .container {
        overflow: hidden;
      }
      `}</style>
      <div className="container">
        <ul id="hexGrid">
          {resources.map((r, i) => {
            return (
              <li key={i} className={clsx({ hex: true, small: i == 5, med: i == 9 })}>
                <div className="hexIn">
                  <a className="hexLink" href="#">
                    <img src="https://farm9.staticflickr.com/8461/8048823381_0fbc2d8efb.jpg" alt="" />
                    <h1>This is a title</h1>
                    <p>Some sample text about the article this hexagon leads to</p>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Page>
  );
};
export default LinksPage;
