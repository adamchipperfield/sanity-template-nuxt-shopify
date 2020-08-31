/**
 * Schemas / Documents / Blog
 * ------------------------------------------------------------------------------
 * Defines a parent blog for landing pages.
 *
 * @namespace blog
 */
export default {
  title: 'Blog',
  name: 'blog',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      validation: (rule) => rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        { type: 'block' },
      ]
    }
  ]
}
