import * as queries from 'api/queries';
import fetchData from 'api/dato';
import Layout from 'components/Layout';

export default function Home({ homepage }) {
  const { title, text, introImage } = homepage
  return (
    <Layout {...homepage}>
      {introImage &&
        <div>
          <DatoImage
            className="dato-image-cover"
            data={introImage?.responsiveImage}
            alt={introImage?.responsiveImage.alt}
            title={introImage?.responsiveImage.title}
          />
        </div>
      }
      <h1 className="text-6xl font-bold tracking-tighter mt-2">
        {title}
      </h1>
      <p className="mt-4 text-lg">
        {text}
      </p>
    </Layout>
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