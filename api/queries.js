const imgFrag = `
fragment imgFrag on ResponsiveImage {
  width
  webpSrcSet
  title
  srcSet
  src
  sizes
  height
  bgColor
  base64
  aspectRatio
  alt
}`;

const anchorLinkFrag = `
fragment anchorLinkFrag on AnchorLinkRecord {
  __typename
  id
  label
  buttonType
  element
}
`;
const externalLinkFrag = `
fragment externalLinkFrag on ExternalLinkRecord {
  __typename
  id
  label
  buttonType
  url
}
`;

const internalLinkFrag = `
fragment internalLinkFrag on InternalLinkRecord {
  __typename
  id
  label
  buttonType
  element {
    ... on CompanyRecord {
      __typename
      id
      slug
    }
    ... on ProductRecord {
      __typename
      id
      slug
    }
    ... on WorkWithUsIndexRecord {
      __typename
      id
      slug
    }
    ... on WorkWithUsPageRecord {
      __typename
      id
      slug
    }
    ... on ServiceRecord {
      __typename
      id
      slug
    }
    ... on SolutionRecord {
      __typename
      id
      slug
      parent {
        __typename
        id
        slug
      }
    }
  }
}
`;

const textFrag = `
fragment textFrag on TextBlockRecord {
  __typename
  id
  variant
  label
  title
  text
}
`;

const textImageFrag = `
fragment textImageFrag on TextImageBlockRecord {
  __typename
  id
  label
  title
  description
  image {
    responsiveImage(sizes: "(min-width: 768px) 50vw, 100vw", imgixParams: {auto: [format, compress], fit: crop, w: 1000}){
      ...imgFrag
    }
    blurUpThumb
    alt
    title
  }
  link {
    ... on AnchorLinkRecord { ...anchorLinkFrag }
    ... on ExternalLinkRecord { ...externalLinkFrag }
    ... on InternalLinkRecord { ...internalLinkFrag }
  }
}
`;


export const mainNavigation = `
query navigation($locale: SiteLocale) {
  menu: allMainNavigations(locale: $locale) {
    navDescription
    navImage {
      url
    }
    label
    page {
      ... on InternalLinkRecord { ...internalLinkFrag }
      ... on AnchorLinkRecord { ...anchorLinkFrag }
      ... on ExternalLinkRecord { ...externalLinkFrag }
    }
    items {
      id
      label
      link {
        ... on AnchorLinkRecord { ...anchorLinkFrag }
        ... on InternalLinkRecord { ...internalLinkFrag }
        ... on ExternalLinkRecord { ...externalLinkFrag }
      }
    }
  }
}
${anchorLinkFrag}
${internalLinkFrag}
${externalLinkFrag}
`;


export const site = `
query site($locale: SiteLocale) {
  site: _site(locale: $locale) {
    faviconMetaTags {
      tag
      content
      attributes
    }
  }
}
`;


const seoBlock = `
  attributes
  content
  tag
`;

export const home = `
query homepage($locale: SiteLocale) {
  homepage(locale: $locale) {
    _modelApiKey
    id
    title
    seo: _seoMetaTags {
      ${seoBlock}
    }
  }
}
`;

