export default {
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string', // e.g. "Senior Software Engineer"
    },
    {
      name: 'title',
      title: 'Title',
      type: 'text',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'tags',
      title: 'Tags List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Tag Text', type: 'string' },
            { 
              name: 'colorClass', 
              title: 'Color Class', 
              type: 'string',
              options: {
                list: ['yellow', 'purple', 'blue', 'green', 'pink'],
              }
            },
            { name: 'ribbonClass', title: 'Ribbon Class', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'avatarImage',
      title: 'Avatar Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'avatarCaption',
      title: 'Avatar Caption',
      type: 'string',
    },
  ],
}
