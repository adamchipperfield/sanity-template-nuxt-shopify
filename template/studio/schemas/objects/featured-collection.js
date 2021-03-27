/**
 * Schemas / Objects / Featured Collection
 * ------------------------------------------------------------------------------
 * A carousel of products in a specific collection.
 *
 * @namespace featuredCollection
 */
export default {
  title: 'Featured Collection',
  name: 'featuredCollection',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Collection',
      name: 'collection',
      type: 'reference',
      to: [
        { type: 'collection' }
      ]
    }
  ]
}
