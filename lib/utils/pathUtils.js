export const subPaths = {
  company: {
    it: 'azienda',
    en: 'company',
    pl: 'firma',
  },
  products: {
    it: 'prodotti',
    en: 'products',
    pl: 'produkty',
  },
  services: {
    it: 'servizi',
    en: 'services',
    pl: 'uslugi',
  },
  solutions: {
    it: 'soluzioni',
    en: 'solutions',
    pl: 'rozwiazania',
  },
  workWithUs: {
    it: 'lavora-con-noi',
    en: 'work-with-us',
    pl: 'pracuj-z-nami',
  },
};

export const resolveInternalLink = ({
  locale,
  __typename,
  slug,
  parent = null,
}) => {
  const subPath = parent ? `${parent.slug}/${slug}` : `${slug}`;
  // const mainLanguage = locale == 'it' ? '' : '/en'
  let l;
  if (locale == 'it') {
    l = '';
  } else if (locale == 'en') {
    l = '/en';
  } else if (locale == 'pl') {
    l = '/pl';
  } else {
    l = 'it';
  }

  switch (__typename) {
    case 'CompanyRecord':
      return `${l}/${subPaths.company[locale]}`;
    case 'ProductRecord':
      return `${l}/${subPaths.products[locale]}/${slug}`;
    case 'WorkWithUsIndexRecord':
      return `${l}/${subPaths.workWithUs[locale]}`;
    case 'WorkWithUsPageRecord':
      return `${l}/${subPaths.workWithUs[locale]}/${slug}`;
    case 'ServiceRecord':
      return `${l}/${subPaths.services[locale]}/${slug}`;
    case 'SolutionRecord':
      return `${l}/${subPaths.solutions[locale]}/${subPath}`;
    default:
      return '';
  }
};

const parentSlugs = (element, slugLocale, locale) => {
  if (element.parent) {
    const { _allSlugLocales } = element.parent;
    const newSlugLocale = _allSlugLocales.find((e) => e.locale == locale);

    return parentSlugs(element.parent, newSlugLocale, locale).concat([
      slugLocale.value,
    ]);
  }

  return slugLocale?.value ? [slugLocale.value ] : [];
};

export const localizedSlugs = (
  { collection, type = 'array' },
  currentLocale = 'it'
) => {
  const flatten = collection.flatMap((element) => {
    const parent = element.parent;

    return element?._allSlugLocales.map((slugLocale) => {
      const { locale, value } = slugLocale;
      let slugs =
        type === 'array'
          ? parentSlugs(element, slugLocale, locale)
          : slugLocale.value;

      return { params: { slug: slugs }, locale };
      // return { params: { slug: slugs } };
    });
  });
  const filtered = flatten
    .filter((i) => i.locale === currentLocale)
    .map((i) => {
      const { params } = i;
      return { params };
    });

  return filtered;
};
