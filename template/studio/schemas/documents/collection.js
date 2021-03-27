/**
 * Schemas / Documents / Collection
 * ------------------------------------------------------------------------------
 * A single collection page used to define content sections.
 *
 * @namespace collection
 */
import ShopifyCollection from '../../plugins/shopify-collection'

export default {
  title: 'Collection',
  name: 'collection',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'For admin purposes only'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'localized',
      description: 'Overrides the Shopify collection title',
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      inputComponent: ShopifyCollection,
      validation: (rule) => rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        { type: 'block' },
      ],
      description: 'Overrides the Shopify collection description'
    }
  ]
}
