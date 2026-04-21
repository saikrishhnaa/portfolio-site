export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'githubRepo',
      title: 'GitHub Repo URL',
      type: 'url',
    },
    {
      name: 'liveLink',
      title: 'Live Demo URL',
      type: 'url',
    },
  ],
}
