export default {
  name: 'contactMessage',
  title: 'Contact Messages',
  type: 'document',
  readOnly: false,
  fields: [
    {
      name: 'email',
      title: 'Sender Email',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'message',
      title: 'Message Content',
      type: 'text',
      readOnly: true,
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Read', value: 'read' },
          { title: 'Replied', value: 'replied' }
        ],
        layout: 'radio'
      },
      initialValue: 'new'
    },
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'subject',
      subtitle: 'email',
      status: 'status'
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title || 'No Subject',
        subtitle: `${subtitle} | Status: ${status}`
      }
    }
  }
}
