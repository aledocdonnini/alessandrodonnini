import { useRef, useLayoutEffect, useEffect } from 'react';
import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { localizedSlugs } from 'lib/utils/pathUtils';
// import { Image as DatoImage } from 'react-datocms';
import Image from 'next/image'
import Link from 'next/link';

import Layout from 'components/Layout'
import useWindowSize from 'hooks/useWindowSize'
import { gsap } from "gsap";


export default function Work({ work }) {
  const {title, text, introImage} = work
  const targetRef = useRef();
  const size = useWindowSize();

  useLayoutEffect(()=>{
    const style = {
      x: - targetRef.current.offsetLeft,
      y: - targetRef.current.offsetTop,
      width: size.width,
      height: size.height,
      delay: .1,
      // autoRound: false,
      duration: 1,
      ease: "circ.inOut",
      // position: "absolute",
      zIndex: 5
      // onComplete: onComplete
    };

    if (size.height) {
      gsap.from(targetRef.current, style);
    }
  }, [size, targetRef])

  return (
    <Layout>

      {/* <DatoImage
        ref={targetRef}
        className="js-image dato-image-cover"
        data={introImage?.responsiveImage}
        alt={introImage?.responsiveImage.alt}
        title={introImage?.responsiveImage.title}
      /> */}
      <Image
        ref={targetRef}
        className="dato-image-cover"
        src={introImage?.src}
        width="500"
        height="500"
        alt={introImage?.alt}
        // title={introImage?.responsiveImage.title}
      />

      <div className="container mx-auto">
          <p className="text-6xl font-bold tracking-tighter mt-2 text-left">
            {title}
          </p>
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
      </div>
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