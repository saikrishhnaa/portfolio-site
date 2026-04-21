export default {
  name: 'techStackCategory',
  title: 'Tech Stack Category',
  type: 'document',
  fields: [
    {
      name: 'categoryName',
      title: 'Category Name',
      type: 'string', // e.g. "Languages" or "Frontend"
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used to sort the categories (lower numbers appear first)',
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Technology Name',
              type: 'string', // e.g. "React"
            },
            {
              name: 'icon',
              title: 'Icon / Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }
          ]
        }
      ]
    }
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}
