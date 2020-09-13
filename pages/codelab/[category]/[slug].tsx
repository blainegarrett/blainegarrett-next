// HomePage

import React from 'react';
import { NextPage, GetStaticPropsResult, GetStaticPropsContext } from 'next';
import Page from '~/components/Page';
import dynamic from 'next/dynamic';
import { ParsedUrlQuery } from 'querystring';
import codeLabResources, { CodeLabResource } from '~/screens/codelab/index';

interface IndexPageProps {
  //slug: string;
  //category: string;
  resource?: CodeLabResource;
}

const IndexPage: NextPage<IndexPageProps> = (props) => {
  let { resource } = props;

  if (!resource) {
    return <b>not found...</b>;
  }

  const CodeLabLoader = dynamic(() => import(`~/screens/codelab/${resource!.category}/${resource!.slug}/index.tsx`), {
    loading: () => <p>loading...</p>,
    ssr: false,
  });

  // TODO: Power this off params...
  const meta = {
    title: `${resource.title} | Blaine Garrett CodeLab`,
    url: `https://www.blainegarrett.com/codelab/${resource.category}/${resource.slug}`,
    description: resource.description,
  };

  return (
    <Page isFluid activePage="codelab" meta={meta}>
      <CodeLabLoader />
    </Page>
  );
};

interface CodeLabDetailParams extends ParsedUrlQuery {
  category: string;
  slug: string;
}
export async function getStaticProps(
  ctx: GetStaticPropsContext<CodeLabDetailParams>
): Promise<GetStaticPropsResult<IndexPageProps>> {
  let { category, slug } = ctx.params as CodeLabDetailParams;

  let resource: CodeLabResource;

  let idx = codeLabResources.findIndex((r) => {
    return r.slug == slug && r.category == category;
  });

  resource = codeLabResources[idx];

  // TODO: Ensure that this combo exists...
  return {
    props: { resource: resource || null },
  };
}

export async function getStaticPaths(): Promise<{ paths: string[]; fallback: boolean }> {
  return {
    paths: codeLabResources.map((r) => `/codelab/${r.category}/${r.slug}`),
    fallback: false,
  };
}

export default IndexPage;
