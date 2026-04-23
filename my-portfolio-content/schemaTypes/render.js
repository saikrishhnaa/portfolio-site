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
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order cards appear (lower = first). e.g. 1, 2, 3...',
    },
  ],
  orderings: [
    {
      title: 'Custom Order',
      name: 'customOrder',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
}
