import * as queries from 'api/queries';
import fetchData from 'api/dato';
import Layout from 'components/Layout';

export default function Home({ homepage }) {
  return (
    <Layout {...homepage}/>
  )
}

export async function getStaticProps({ locale = 'it', preview }) {
  const response = await fetchData(queries.home, { locale }, preview);
  const { site } = await fetchData(queries.site, { locale });
  const { homepage } = response;

  return {
    props: {
      site,
      homepage,
      locale,
    },
  };
}