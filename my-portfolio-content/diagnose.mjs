import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'g7rfa2u7',
  dataset: 'production',
  apiVersion: '2023-05-03',
  token: 'sker2I3OOkKlpd8lf6ZzJ9rff2ssTZyWj2uUHcUZQkiBlBrsvbd18CwCLqLuq3WHMhnWF3EC1rLAd2oF7ygO8Je2Nq7W6GeifYTfN8EgUwtBQiM7cxTRVsluJ4Dp5rW27iCt0IHOd6MUnDTEciMnj3epN1PZE14TvByVzwA2my9qAwtbCQ7D',
  useCdn: false,
});

async function diagnose() {
  const types = ['project', 'trajectory', 'render', 'siteConfig', 'hero', 'techStackCategory'];
  for (const type of types) {
    const data = await client.fetch(`*[_type == "${type}"]`);
    console.log(`${type}: ${data.length ?? '?'} record(s)`);
    if (data.length > 0) console.log('  ↳', JSON.stringify(data[0]).slice(0, 120));
  }
}

diagnose();
