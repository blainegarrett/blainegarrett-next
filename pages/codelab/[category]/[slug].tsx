// HomePage

import React from 'react';
import { NextPage, GetStaticPropsResult, GetStaticPropsContext } from 'next';
import Page from '~/components/Page';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';

interface IndexPageProps {
  slug: string;
  category: string;
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  const CodeLabLoader = dynamic(() => import(`~/screens/codelab/${props.category}/${props.slug}/index.tsx`), {
    loading: () => <p>loading...</p>,
    ssr: false,
  });

  // TODO: Power this off params...
  const meta = {
    title: 'Welcome | Blaine Garrett',
    url: 'https://www.blainegarrett.com',
    description: 'Portfolio and Blog of Minneapolis Artist, Software Engineer and Tinkerer Blaine Garrett.',
  };

  return (
    <Page isFluid activePage="codelab" meta={meta}>
      <CodeLabLoader />
    </Page>
  );
};

interface Derp extends ParsedUrlQuery {
  category: string;
  slug: string;
}
export async function getStaticProps(ctx: GetStaticPropsContext<Derp>): Promise<GetStaticPropsResult<IndexPageProps>> {
  //
  let { category, slug } = ctx.params as Derp;

  return {
    props: { slug: slug, category: category },
  };
}

export async function getStaticPaths(): Promise<{ paths: string[]; fallback: boolean }> {
  // TODO: Index these externally... db?
  return {
    paths: ['/codelab/graphics/asciiimage'],
    fallback: false,
  };
}

export default IndexPage;
