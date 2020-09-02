// HomePage

import React from 'react';
import {
  NextPage,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsResult,
} from 'next';
import Page from '~/components/Page';
import { Row, Col } from '~/components/layout/grid';
import CoolCard from '~/components/blog/CoolCard';
import CoolCardSmall from '~/components/blog/CoolCardSmall';
import Container from '@material-ui/core/Container';
import { ArticleResource } from '~/types';
import { motion } from 'framer-motion';
import Heading from '~/components/layout/Heading';
import IntroPanel from '~/components/layout/IntroPanel';

interface IndexPageProps {
  articles: ArticleResource[];
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const meta = {
    title: 'Welcome | Blaine Garrett',
    url: 'https://www.blainegarrett.com',
    description: 'Portfolio and Blog of Minneapolis Artist, Software Engineer and Tinkerer Blaine Garrett.',
  };

  return (
    <Page isFluid activePage="home" meta={meta}>
      <div
        style={{
          //height: '400px',
          backgroundColor: '#eeeeee',
          backgroundImage: 'url("/static/drips1.jpg")',
          backgroundAttachment: 'fixed',
          position: 'relative',
          backgroundSize: 'cover',
        }}
      >
        <div
          style={{
            backgroundColor: '#000000',
            opacity: '.5',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            //border: '1px solid red',
          }}
        >
          &nbsp;
        </div>
        <div>
          <motion.div
            //key={router.asPath}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 100,
            }}
            initial={{ y: 400, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
          >
            <Container maxWidth="md">
              <IntroPanel />
            </Container>
          </motion.div>
        </div>
      </div>

      <div style={{ backgroundColor: '#eeeeee', backgroundImage: 'url("/static/21469f9e.png")' }}>
        <Container maxWidth="md">
          <br />
          😃😃😃
          <br />
        </Container>
      </div>

      <Container>
        {/* <ContentWrapper title={' '} image="/static/drips1.jpg" headerLarge subheadingContent={<WelcomeToolbar />}> */}
        <Row>
          <Col xs={12}>
            {/* <div style={{ backgroundColor: '#687074', color: '#ffffff', padding: '16px' }}>
              <img
                src="https://avatars2.githubusercontent.com/u/196183?s=400&u=6b71147233ca9fc4c0590ff52ec97aa116bfe8ea&v=4"
                style={{ borderRadius: 16, width: '150px' }}
              />
              <Typography
                paragraph
                variant="body1"
                style={{
                  display: 'block',
                  color: '#ffffff',
                  fontFamily: '"Open Sans"',
                  border: '1px solid red',
                  width: '70%',
                  float: 'right',
                }}
              >
                I'm a Minneapolis-based Software Engineer, Artist, and Tinkerer
              </Typography>
            </div> */}

            <div style={{ padding: 16 }}>
              <Row>
                <Col xs={12}>
                  <br />
                  <Heading>Writing</Heading>
                  <p style={{ marginBottom: 0, marginTop: 32 }}>
                    I write on a variety of topics. More recently, I have been contributing tech writing to{' '}
                    <a href="https://hashnode.blainegarrett.com/">Hashnode</a>. Below are a few of my more recent
                    articles.
                  </p>
                </Col>
                {props.articles.map((r, i) => {
                  let Component = CoolCard;
                  if (i >= 0) {
                    Component = CoolCardSmall;
                  }

                  return (
                    <Col key={i} xs={12} md={i == 0 ? 4 : 4}>
                      <Component imgUrl={r.imgUrl} title={r.title} summary={r.summary} readMore={r.readMore} />
                    </Col>
                  );
                })}
                <div style={{ textAlign: 'right', width: '100%', marginRight: 16 }}>
                  <a href="https://hashnode.com/@blainegarrrett/joinme">Join Me on Hashnode</a>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

//export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
//export const getServersideProps: GetServerSideProps<IndexPageProps> = async () => {
//export async function getServerSideProps() {

//export async function getServerSideProps(): Promise<GetServerSidePropsResult<IndexPageProps>> {
export async function getServerSideProps(): Promise<GetServerSidePropsResult<IndexPageProps>> {
  return {
    props: {
      articles: [
        {
          title: 'Mapping Linear Scales',
          summary: 'In this installment of my Applied Math series, I demonstrate mapping linear scales.',
          imgUrl:
            'https://cdn.hashnode.com/res/hashnode/image/upload/v1595797754579/zqjuVfFni.jpeg?w=500&h=263&fit=crop&crop=entropy&auto=format&q=60',
          readMore:
            'https://hashnode.blainegarrett.com/mapping-linear-scales-from-one-to-another-ckd3ldz9502qtaws10lsxcwhz',
        },
        {
          title: 'Generating Union Types from a Bijective Map Using Typescript Const Assertion',
          summary:
            'In this post, I explore a handful of TypeScript features to create Union types from a Bijective Map and use them to restrict what value (not just type) the keys can take when sending data object to Google Analytics.',
          imgUrl:
            'https://cdn.hashnode.com/res/hashnode/image/upload/v1580491877685/ZXNUA5uAj.jpeg?w=500&h=263&fit=crop&crop=entropy&auto=format&q=60',
          readMore:
            'https://hashnode.blainegarrett.com/generating-union-types-from-a-bijective-map-using-typescripts-const-assertion-ck62q5d7j02cqkbs1xp2fyhbg',
        },

        {
          title: 'Series: Building a Github Repo Template with Next.js, TypeScript, and More',
          summary: 'sdfsdfdsfs ',
          imgUrl:
            'https://cdn.hashnode.com/res/hashnode/image/upload/v1594836507670/MkQTUZFYB.jpeg?w=500&h=263&fit=crop&crop=entropy&auto=format&q=60',
          readMore:
            'https://hashnode.blainegarrett.com/building-a-github-repo-template-part-1-nextjs-react-and-typescript-ckcnovxex003bjos1632n4g9a',
        },
        // {
        //   title: 'Container-like Deployments To App Engine Standard Using Google Cloud Build',
        //   summary:
        //     'As more build and deploy strategies utilize Docker, we explore using Cloud Build to Deploy to App Engine Standard legacy VMs',
        //   imgUrl: 'https://commondatastorage.googleapis.com/blaine-garrett/juniper/docker-gcb-gae.png',
        //   readMore:
        //     'https://www.blainegarrett.com/2019/10/29/using-google-cloud-build-to-create-a-production-build-and-deploy-to-appengine-standard',
        // },
      ],
    },
  };
}

export default IndexPage;
