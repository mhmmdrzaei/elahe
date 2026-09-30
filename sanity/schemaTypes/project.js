import { defineArrayMember, defineField, defineType } from 'sanity'

const YOUTUBE = /^https?:\/\/(www\.)?(youtube\.com|youtu\.be|m\.youtube\.com)\//i

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  orderings: [
    { title: 'Manual order', name: 'orderAsc', by: [{ field: 'orderRank', direction: 'asc' }] },
    { title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Newest first', name: 'createdDesc', by: [{ field: '_createdAt', direction: 'desc' }] },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'content',
      validation: (r) => r.integer().min(1900).max(2100),
    }),
    defineField({
      name: 'categories',
      title: 'Category Tags',
      type: 'array',
      group: 'content',
      description: 'e.g. Stage Design. Shown next to the title and links to all projects with that tag.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      group: 'content',
      description: 'Lower numbers show first on the home page. Leave empty to sort by year, newest first.',
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 8, group: 'content' }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      group: 'content',
      description: 'The first image is used as the thumbnail on the home page.',
      options: { layout: 'grid' },
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube Video Link',
      type: 'url',
      group: 'content',
      validation: (r) =>
        r.custom((value) => !value || YOUTUBE.test(value) || 'Must be a YouTube link'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Falls back to the SEO description in Settings if empty.',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image',
      type: 'image',
      group: 'seo',
      description: 'Falls back to the SEO image in Settings if empty.',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'images.0', category: 'categories.0.title', year: 'year' },
    prepare: ({ title, media, category, year }) => ({
      title,
      media,
      subtitle: [year, category].filter(Boolean).join(' · '),
    }),
  },
})
