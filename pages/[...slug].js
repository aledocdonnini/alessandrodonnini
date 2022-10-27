import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { localizedSlugs } from 'lib/utils/pathUtils';
import { Image as DatoImage } from 'react-datocms';
import Link from 'next/link';
import { motion } from "framer-motion";

import Layout from 'components/Layout'


export default function Work({ work }) {
  const {title, text, introImage} = work
  return (
    <Layout>
      <motion.div layoutId={`image-${work.id}`}>
        <div className="h-80">
          <DatoImage
            className="dato-image-cover"
            data={introImage?.responsiveImage}
            alt={introImage?.responsiveImage.alt}
            title={introImage?.responsiveImage.title}
          />
        </div>
      </motion.div>
      <motion.p
        layoutId={`title-${work.id}`}
        transition={{ delay: 0.2 }}
      >
        <p className="text-6xl font-bold tracking-tighter mt-2 text-left">
          {title}
        </p>
      </motion.p>
      <p className="mt-4 text-lg">
        {text}
      </p>
      <p className="mt-4 text-lg">
        <Link href="/works">
          <a title="back">
            back
          </a>
        </Link>
      </p>
    </Layout>
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