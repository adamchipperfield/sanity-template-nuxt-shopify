/**
 * Schemas / Documents / Article
 * ------------------------------------------------------------------------------
 * Defines a single article which belongs to a blog.
 *
 * @namespace article
 */
export default {
  title: 'Article',
  name: 'article',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      validation: (rule) => rule.required()
    },
    {
      title: 'Blog',
      name: 'blog',
      type: 'reference',
      to: [
        { type: 'blog' }
      ],
      validation: (rule) => rule.required()
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        { type: 'block' },
      ]
    }
  ]
}
