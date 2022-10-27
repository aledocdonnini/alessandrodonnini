import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { localizedSlugs } from 'lib/utils/pathUtils';

import { Image as DatoImage } from 'react-datocms';
import Layout from 'components/Layout'


export default function Work({ work }) {
  return (
    <Layout {...work} />
  )
}
export async function getStaticPaths() {
  const locale = 'it';
  const { allWorks } = await fetchData(queries.allWorks, {
    locale,
  });
  let slugs = localizedSlugs({ collection: allWorks }, locale);
  return { paths: slugs, fallback: false };
}

export async function getStaticProps({ params, locale = 'it', preview }) {
  const slug = params.slug[params.slug.length - 1];
  const response = await fetchData(queries.work, { slug, locale }, preview);
  const { site } = await fetchData(queries.site, { locale });
  const { work } = response;

  return {
    props: {
      site,
      work,
      locale,
    },
  };
}