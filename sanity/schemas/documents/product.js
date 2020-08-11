/**
 * Schemas / Documents / Product
 * ------------------------------------------------------------------------------
 * A single product page used to define content sections.
 *
 * @namespace product
 */
import ShopifyProduct from '../../plugins/shopify-product'

export default {
  title: 'Product',
  name: 'product',
  type: 'document',
  fields: [
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
      inputComponent: ShopifyProduct
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string'
            }
          ]
        }
      ]
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string'
            }
          ]
        }
      ]
    }
  ]
}
