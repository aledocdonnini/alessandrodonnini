import * as queries from 'api/queries';
import fetchData from 'api/dato';
import { Image as DatoImage } from 'react-datocms';
import Layout from 'components/Layout';
import { useHorizontalScroll } from 'hooks/useSideScroll';
import data from 'lib/agenda';

export default function Home({ homepage }) {
  const { title, text, introImage } = homepage
  const scrollRef = useHorizontalScroll();

  const widths = [200, 300, 400, 500, 600]


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
      <div className='overflow-auto relative bg-black w-full' ref={scrollRef}>
        {/* <table> */}
          {data.map((loc)=>{
          return(
            <div className='mb-3 before:absolute before:top-0 before:left-0 before:w-[1px] before:bg-black ' key={loc.name}>
              <table className=''>
                <div className='text-white font-bold uppercase inline-block sticky top-0 left-0 p-3'>
                  {loc.name}
                </div>
                <div className='flex flex-nowrap justify-items-start items-stretch'>
                  {/* <tr> */}
                    {loc.events.map((e,i)=>{
                      let w = widths[Math.floor(Math.random() * widths.length)];
                      return(
                        <div style={{ width: w + 'px' }} className={`shrink-0 justify-self-start self-stretch sticky top-0 left-1 relative odd:bg-gray even:bg-grayM min-w-[100px] mr-2 rounded`} key={i}>
                          <div className={`shadow-[-8px_0_0_0_#222]  h-full inline-block align-top  text-white py-2 `} key={i}>
                            <div className='absolute top-0 left-0 bottom-0 w-[5px] bg-[#00aa00] rounded-l'>
                            </div>
                            <div className='px-3'>
                              {e.start_time} - {e.end_time}
                            </div>
                            <div className='px-3 font-bold text-xl'>
                              {e.title}
                            </div>
                            <div className='px-3 text-sm '>
                              {e.description}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  {/* </tr> */}
                </div>
              </table>
            </div>
          )
        })}
        {/* </table> */}

      </div>
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