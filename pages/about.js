import * as queries from 'api/queries';
import fetchData from 'api/dato';
import Layout from 'components/Layout'


export default function About({ about }) {

  return (
    <Layout {...about} />
  )
}

export async function getStaticProps({ locale = 'it', preview }) {
  const response = await fetchData(queries.about, { locale }, preview);
  const { site } = await fetchData(queries.site, { locale });
  const { about } = response;

  return {
    props: {
      site,
      about,
      locale,
    },
  };
}