export default {
  name: 'render',
  title: 'Render',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'youtubeId',
      title: 'YouTube Video ID',
      type: 'string',
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
  ],
}
