import * as queries from 'api/queries';
import fetchData from 'api/dato';

export default function Home({ homepage }) {
  return (
    <div className="">

      <main className="">
        <h1 className="">
          {homepage.title}
        </h1>
      </main>
    </div>
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