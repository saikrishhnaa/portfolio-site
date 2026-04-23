import { createClient } from '@sanity/client';
const client = createClient({
  projectId: 'g7rfa2u7',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});
client.fetch('*[_type == "sanity.fileAsset"]').then(console.log).catch(console.error);
