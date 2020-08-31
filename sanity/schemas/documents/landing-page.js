/**
 * Schemas / Documents / Landing Page
 * ------------------------------------------------------------------------------
 * A page with content sections.
 *
 * @namespace landingPage
 */
export default {
  title: 'Landing Page',
  name: 'landingPage',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'For admin purposes only'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      validation: (rule) => rule.required()
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'imageBanner' },
        { type: 'featuredCollection' }
      ]
    }
  ]
}
