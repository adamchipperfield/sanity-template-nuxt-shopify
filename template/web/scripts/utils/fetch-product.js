/**
 * Scripts / Utils / Fetch Product
 * ------------------------------------------------------------------------------
 * Queries the product and content.
 *
 * @namespace fetchProduct
 */
import productByHandleQuery from '@/graphql/shopify/queries/productByHandleQuery'
import productContentByHandleQuery from '@/graphql/sanity/queries/productContentByHandleQuery'

import { transformProduct } from '~/utils/transform-graphql'

export default async (context) => {
  const page = {}

  const product = await context.app.apolloProvider.clients.shopify.query({
    query: productByHandleQuery,
    variables: {
      handle: context.params.handle
    }
  })

  const content = await context.app.apolloProvider.clients.sanity.query({
    query: productContentByHandleQuery,
    variables: {
      handle: context.params.handle
    }
  })

  if (!product) {
    return context.error({
      statusCode: 404,
      message: 'No product found'
    })
  }

  page.product = transformProduct(product.data.productByHandle)

  if (content) {
    page.content = content
  }

  return page
}
