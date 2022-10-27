import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { Image as DatoImage } from 'react-datocms';
import Link from 'next/link';
import { motion } from "framer-motion";

import Layout from 'components/Layout'

export default function Works({ worksIndex, allWorks }) {
  const { title, text, introImage } = worksIndex
  return (
    <Layout {...worksIndex}>
      {introImage &&
        <DatoImage
          className="dato-image-cover"
          data={introImage?.responsiveImage}
          alt={introImage?.responsiveImage.alt}
          title={introImage?.responsiveImage.title}
        />
      }

      <h1 className="text-6xl font-bold tracking-tighter mt-2">
        {title}
      </h1>

      <p className="mt-4 text-lg">
        {text}
      </p>

      <div className="flex gap-4 mt-10">
        {allWorks.map(w=>{
          const { title, text, introImage } = w;
          return (
            <div className="w-1/3" key={w.id}>
              <div>
                <Link href={w.slug}>
                  <a className="underline hover:no-underline">
                    <motion.div layoutId={`image-${w.id}`}>
                      <div className="h-32">
                        <DatoImage
                          className="dato-image-cover"
                          data={introImage?.responsiveImage}
                          alt={introImage?.responsiveImage.alt}
                          title={introImage?.responsiveImage.title}
                        />
                      </div>
                    </motion.div>
                  </a>
                </Link>
                <motion.p layoutId={`title-${w.id}`}
                >
                  <p className="text-xl font-bold text-center">
                    {title}
                  </p>
                </motion.p>
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