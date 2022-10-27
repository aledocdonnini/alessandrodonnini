import { Image as DatoImage } from 'react-datocms';
import Link from 'next/link';

export default function Layout({ title, text, introImage= null, children }) {
  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center mb-10 py-4">
        <div className="text-2xl uppercase font-extrabold tracking-tight">
          Logo
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/">
                <a className="uppercase font-bold">home</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className="uppercase font-bold">about</a>
              </Link>
            </li>
            <li>
              <Link href="/works">
                <a className="uppercase font-bold">works</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>

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
        <p className="mt-4 text-lg">{text}</p>
        {children}
      </main>
    </div>
  )
}
