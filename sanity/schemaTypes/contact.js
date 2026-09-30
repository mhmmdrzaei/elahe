import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'otherInfo', title: 'Other Information', type: 'text', rows: 6 }),
  ],
  preview: { prepare: () => ({ title: 'Contact' }) },
})
