/**
 * Scripts / Utils / Fetch Collection
 * ------------------------------------------------------------------------------
 * Queries the collection and content.
 *
 * @namespace fetchCollection
 */
import collectionByHandleQuery from '@/graphql/shopify/queries/collectionByHandleQuery'

import { transformCollection } from '~/utils/transform-graphql'

export default async (context) => {
  const page = {}
  const sortByOptions = context.store.getters['collection/getSortByOptions']
  const sortBySelected = context.store.getters['collection/getSortBySelected']
  const sortBy = sortByOptions.find(({ id }) => id === sortBySelected)

  const collection = await context?.app.apolloProvider.clients.shopify.query({
    query: collectionByHandleQuery,
    variables: {
      handle: context?.params.handle,
      sortKey: sortBy?.key,
      reverse: sortBy?.reverse
    }
  })

  if (!collection) {
    return context?.error({
      statusCode: 404,
      message: 'No collection found'
    })
  }

  page.collection = transformCollection(collection.data.collectionByHandle)

  return page
}
