export type LandscapePhoto = {
  src: string;
  alt: string;
  credit: string;
};

export const landscapePhotos: LandscapePhoto[] = [
  {
    src: '/img/carousel/IMG_4833.jpeg',
    alt: 'Le plan d\'eau de Collorec et ses pommiers.',
    credit: '',
  },
  {
    src: '/img/carousel/IMG_4834.jpeg',
    alt: 'Le plan d\'eau de Collorec et ses pommiers.',
    credit: '',
  },
  {
    src: '/img/carousel/IMG_6082.jpeg',
    alt: 'Vue depuis un point haut de Collorec.',
    credit: '',
  },
  {
    src: '/img/carousel/IMG_6670.jpeg',
    alt: 'Vallée et vue sur les éoliennes à Collorec.',
    credit: '',
  },
  {
    src: '/img/carousel/IMG_6671.jpeg',
    alt: 'Vue depuis un point haut de Collorec.',
    credit: '',
  },
];

export const municipalBulletin: {title: string; file: string} | null = {
  title: 'Bulletin municipal — 3e trimestre',
  file: '/260909_BM_3emetrimestre.pdf',
};
