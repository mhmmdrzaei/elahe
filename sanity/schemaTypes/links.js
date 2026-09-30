import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'links',
  title: 'Links',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', initialValue: 'Links' }),
    defineField({
      name: 'content',
      title: 'Press & Mentions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Large', value: 'h2' },
            { title: 'Medium', value: 'h3' },
            { title: 'Small', value: 'small' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              defineArrayMember({
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (r) => r.uri({ scheme: ['http', 'https', 'mailto'], allowRelative: true }),
                  }),
                ],
              }),
            ],
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Links' }) },
})
