import { Image as DatoImage } from 'react-datocms';

export default function Card({ content }) {
  const { title, text, introImage, slug } = content;

  return (
    <DatoImage
      className="dato-image-cover h-full"
      data={introImage?.responsiveImage}
      alt={introImage?.responsiveImage.alt}
      title={introImage?.responsiveImage.title}
    />
  )
}
