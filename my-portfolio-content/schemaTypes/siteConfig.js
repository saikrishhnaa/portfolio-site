export default {
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    {
      name: 'githubUrl',
      title: 'GitHub Profile URL',
      type: 'url',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: 'application/pdf'
      }
    },
  ],
}
