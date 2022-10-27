import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { Image as DatoImage } from 'react-datocms';
import Link from 'next/link';
import Layout from 'components/Layout'

export default function Works({ worksIndex, allWorks }) {
  return (
    <Layout {...worksIndex}>
      <div className="flex gap-4 mt-10">
        {allWorks.map(w=>{
          const { title, text, introImage } = w;
          return (
            <div className="w-1/3" key={w.id}>
              <div className="h-48">
                <Link href={w.slug}>
                  <a className="underline hover:no-underline">
                    <DatoImage
                      className="dato-image-cover"
                      data={introImage?.responsiveImage}
                      alt={introImage?.responsiveImage.alt}
                      title={introImage?.responsiveImage.title}
                    />
                  </a>
                </Link>
                <p className="text-xl font-bold">
                  {title}
                </p>
              </div>
            </div>
          )
        })
        }
      </div>
    </Layout>
  )
}

export async function getStaticProps({ locale = 'it', preview }) {
  const responseIndex = await fetchData(queries.worksIndex, { locale }, preview);
  const responseAllWorks = await fetchData(queries.allWorks, { locale }, preview);
  const { site } = await fetchData(queries.site, { locale });
  const { worksIndex } = responseIndex;
  const { allWorks } = responseAllWorks;

  return {
    props: {
      site,
      worksIndex,
      allWorks,
      locale,
    },
  };
}