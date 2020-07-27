<template>
  <div class="home">
    <section
      v-for="(collection, index) in collections"
      :key="index"
      class="home__section"
    >
      <featured-collection :collection="collection" />
    </section>
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

<style lang="scss">
.home {
  @include mq($from: large) {
    &__section {
      &:not(:last-child) {
        margin-bottom: $LAYOUT_S;
      }
    }
  }
}
</style>
