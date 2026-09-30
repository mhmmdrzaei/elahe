import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  groups: [
    { name: 'site', title: 'Site', default: true },
    { name: 'menu', title: 'Menu' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string', group: 'site' }),
    defineField({ name: 'siteSubheading', title: 'Site Subheading', type: 'string', group: 'site' }),
    defineField({
      name: 'siteLogo',
      title: 'Site Logo',
      type: 'image',
      group: 'site',
      description: 'If set, shown in the header in place of the site name.',
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      group: 'menu',
      of: [
        defineArrayMember({
          name: 'menuItem',
          title: 'Menu Item',
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Link Label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'url',
              title: 'Link URL',
              type: 'string',
              description: 'e.g. /about, /contact, or a full https:// link',
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (fallback)',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'Used when a page or project has no SEO description of its own.',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image (fallback)',
      type: 'image',
      group: 'seo',
      description: 'Used when a page or project has no SEO image of its own. Ideal size 1200×630.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Settings' }) },
})
