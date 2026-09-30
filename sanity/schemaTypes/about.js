import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 10 }),
    defineField({
      name: 'cv',
      title: 'CV Upload',
      type: 'file',
      options: { accept: '.pdf,.doc,.docx' },
    }),
  ],
  preview: { prepare: () => ({ title: 'About' }) },
})
