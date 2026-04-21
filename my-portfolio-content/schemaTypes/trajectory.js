export default {
  name: 'trajectory',
  title: 'Trajectory Experience',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year or Duration',
      type: 'string', // e.g. "Sep 2021 - Present"
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string', // e.g. "Senior Software Engineer @ Lenze"
    },
    {
      name: 'order',
      title: 'Sorting Order',
      type: 'number',
      description: 'Used to order the timeline (e.g. 1 for most recent)',
    },
    {
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{ type: 'text' }]
    },
    {
      name: 'companyLogo',
      title: 'Company Logo Image',
      type: 'image',
    }
  ],
  orderings: [
    {
      title: 'Chronological',
      name: 'chronological',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}
