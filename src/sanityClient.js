import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'g7rfa2u7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

export const writeClient = createClient({
  projectId: 'g7rfa2u7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
