// Links Page
import React from 'react';
import { NextPage } from 'next';

import Page from '~/components/Page';
import clsx from 'clsx';
import HexCard from '~/hexgrid/StandardHex';

const HexGrid: React.FC<HexGridProps> = (props) => {
  return <div>sdfdf</div>;
};

const LinksPage: NextPage<{}> = () => {
  const meta = {
    title: 'Links',
    description: 'Some links to my other projects and things I think you should check out',
    url: 'https://www.blainegarrett.com/links',
  };

  let resources = [
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/95676470_1580048892149892_2706236292067789539_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=lVB9edXQu84AX-7pL9f&oh=9d3bf18c53ad549a22d7ee37eb476718&oe=5F585992',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96584733_175803350368642_8873785449959104370_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tiuyehRXf7AAX-x-cQD&oh=6ea46723623de5f59ee51e36f7aec11c&oe=5F58874D',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/98419098_235529747876771_7533347195466274637_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=I7IffHIoIIgAX-ljTrl&oh=d355fc801c02b155fae046ac9241b326&oe=5F5A584B',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/95676470_1580048892149892_2706236292067789539_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=lVB9edXQu84AX-7pL9f&oh=9d3bf18c53ad549a22d7ee37eb476718&oe=5F585992',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/100102529_304657547197488_7503533924658296256_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Ec5i5SGNCZsAX-GMe6i&oh=e376d73d017daa1882c3607c0a084b46&oe=5F573E4A',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96584733_175803350368642_8873785449959104370_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tiuyehRXf7AAX-x-cQD&oh=6ea46723623de5f59ee51e36f7aec11c&oe=5F58874D',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/98419098_235529747876771_7533347195466274637_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=I7IffHIoIIgAX-ljTrl&oh=d355fc801c02b155fae046ac9241b326&oe=5F5A584B',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96584733_175803350368642_8873785449959104370_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tiuyehRXf7AAX-x-cQD&oh=6ea46723623de5f59ee51e36f7aec11c&oe=5F58874D',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/98419098_235529747876771_7533347195466274637_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=I7IffHIoIIgAX-ljTrl&oh=d355fc801c02b155fae046ac9241b326&oe=5F5A584B',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/95676470_1580048892149892_2706236292067789539_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=lVB9edXQu84AX-7pL9f&oh=9d3bf18c53ad549a22d7ee37eb476718&oe=5F585992',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/100102529_304657547197488_7503533924658296256_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=100&_nc_ohc=Ec5i5SGNCZsAX-GMe6i&oh=e376d73d017daa1882c3607c0a084b46&oe=5F573E4A',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96220359_283788382802430_1422629719239626197_n.jpg?_nc_ht=instagram.ffcm1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=z2fjt9lKXAYAX9-HkUQ&oh=4a83c5c65ee76902e4b1bf33d41bc204&oe=5F5930C6',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96584733_175803350368642_8873785449959104370_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tiuyehRXf7AAX-x-cQD&oh=6ea46723623de5f59ee51e36f7aec11c&oe=5F58874D',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/98419098_235529747876771_7533347195466274637_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=I7IffHIoIIgAX-ljTrl&oh=d355fc801c02b155fae046ac9241b326&oe=5F5A584B',
      description: 'What it is yo',
    },
    {
      title: 'asdsdsdf sdf dsf dsf',
      imgSrc:
        'https://instagram.ffcm1-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/96584733_175803350368642_8873785449959104370_n.jpg?_nc_ht=instagram.ffcm1-1.fna.fbcdn.net&_nc_cat=110&_nc_ohc=tiuyehRXf7AAX-x-cQD&oh=6ea46723623de5f59ee51e36f7aec11c&oe=5F58874D',
      description: 'What it is yo',
    },
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
        background-color: #000000;
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

      
      /*** HEX CONTENT **********************************************************************/
      
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
              <li key={i} className={clsx({ hex: true, small: i == 500, med: i == 900 })}>
                <HexCard {...r} />
              </li>
            );
          })}
        </ul>
      </div>
    </Page>
  );
};
export default LinksPage;
