<template>
  <div class="page-index">
    <featured-collection
      v-for="(collection, index) in collections"
      :key="index"
      :collection="collection"
    />
  </div>
</template>

<script>
import allCollectionsQuery from '@/graphql/shopify/queries/allCollectionsQuery'

import { transformEdges, transformProduct } from '~/utils/transform-graphql'

import FeaturedCollection from '~/sections/FeaturedCollection'

export default {
  components: {
    FeaturedCollection
  },

  async asyncData({ app }) {
    const client = app.apolloProvider.clients.shopify

    const { data } = await client.query({
      query: allCollectionsQuery
    })

    const transformedCollections = transformEdges(data.collections)
      .map(({ products, ...rest }) => {
        return {
          products: transformEdges(products).map(transformProduct),
          ...rest
        }
      })
    
    return {
      collections: transformedCollections
    }
  }
}
</script>
