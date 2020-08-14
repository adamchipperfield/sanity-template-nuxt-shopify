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
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'For admin purposes only'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string',
      description: 'Overrides the Shopify product title'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
      inputComponent: ShopifyProduct,
      validation: (rule) => rule.required()
    },
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [
        { type: 'block' },
      ],
      description: 'Overrides the Shopify product description'
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [
        { type: 'images' }
      ],
      description: 'Overrides the Shopify product images'
    }
  ]
}
