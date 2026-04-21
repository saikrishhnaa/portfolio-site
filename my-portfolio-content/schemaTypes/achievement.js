export default {
  name: 'achievement',
  title: 'Achievement & Certification',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string', // e.g. "Smart India Hackathon 2019"
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text', // e.g. "Participated in the Grand Finale..."
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'url',
      description: 'Optional link to certificate or project (leave blank if none)',
    },
    {
      name: 'order',
      title: 'Sorting Order',
      type: 'number',
      description: 'Used to sort the achievements list (e.g. 1 for top)',
    }
  ],
  orderings: [
    {
      title: 'Custom Order',
      name: 'customOrder',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    }
  ]
}
