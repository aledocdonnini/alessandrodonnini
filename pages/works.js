import { useRef, useEffect, useState, createRef } from "react";
import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { Image as DatoImage } from 'react-datocms';
import { useRouter } from 'next/router'

import { gsap } from "gsap";

import Layout from 'components/Layout'
import useWindowSize from 'hooks/useWindowSize'


export default function Works({ worksIndex, allWorks }) {
  const { title, text, introImage } = worksIndex
  const size = useWindowSize();
  const targetRef = useRef([]);
  targetRef.current = allWorks.map((element, i) => targetRef.current[i] ?? createRef());
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleClick = (i,slug) => {
    setLoading(true);
    if (targetRef.current[i]) {
      setDimensions({
        width: targetRef.current[i].current.offsetWidth,
        height: targetRef.current[i].current.offsetHeight
      });
      const style = {
        x: - targetRef.current[i].current.offsetLeft,
        y: - targetRef.current[i].current.offsetTop,
        width: size.width,
        height: size.height,
        autoRound: false,
        duration: .75,
        ease: "circ.inOut",
        position: "absolute",
        zIndex: 5
        // onComplete: onComplete
      };

      gsap.to(targetRef.current[i].current, style);
    }
    setTimeout(() => {
      router.push(slug);
    }, 1000);
  }

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
      <div className="container mx-auto">
        <h1 className="text-6xl font-bold tracking-tighter mt-2">
          {title}
        </h1>

        <p className="mt-4 text-lg">
          {text}
        </p>
      </div>

      <div className="container mx-auto mt-10 grid grid-cols-4 gap-4">
        {allWorks.map((w,i)=>{
          return (
            <div
              id={w.id}
              key={w.id}
              className={`cursor-pointer h-[200px] ${w.slug}`}
              onClick={() => !loading && handleClick(i, w.slug,)}
            >
              <DatoImage
                ref={targetRef.current[i]}
                className="dato-image-cover h-full z-2"
                data={w.introImage?.responsiveImage}
                alt={w.introImage?.responsiveImage.alt}
                title={w.introImage?.responsiveImage.title}
              />
              <p className="text-4xl font-bold">
                {w.title}
              </p>
              <p className="text-xl">
                {w.text}
              </p>
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