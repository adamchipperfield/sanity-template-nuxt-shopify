<template>
  <div class="collection">
    <hero-banner
      :title="collectionHeading"
      :content="collectionDescription"
    />
    
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="collection__toolbar">
            <collection-sort />
          </div>

          <div class="collection__grid">
            <div
              v-for="(product, index) in collection.products.edges"
              :key="index"
              class="collection__product"
            >
              <product-card :product="product.node" />
            </div>
          </div>

          <div
            v-if="collection.products.pageInfo.hasNextPage"
            class="collection__pagination"
          >
            <button
              class="collection__paginate"
              @click="handleLoadMoreEvent"
            >
              {{ pagination.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import collectionByHandleQuery from '@/graphql/shopify/queries/collectionByHandleQuery'
import collectionContentByHandleQuery from '@/graphql/sanity/queries/collectionContentByHandleQuery'

import { transformCollection, transformProduct } from '~/utils/transform-graphql'
import transformBlocks from '~/plugins/sanity/transform-blocks'

import HeroBanner from '~/components/HeroBanner'
import ProductCard from '~/components/ProductCard'
import CollectionSort from '~/components/CollectionSort'

export default {
  components: {
    CollectionSort,
    HeroBanner,
    ProductCard
  },

  async asyncData({ app, params, error }) {
    const collection = await app.apolloProvider.clients.shopify.query({
      query: collectionByHandleQuery,
      variables: {
        handle: params.handle
      }
    })

    const content = await app.apolloProvider.clients.sanity.query({
      query: collectionContentByHandleQuery,
      variables: {
        handle: params.handle
      }
    })

    if (!collection || !content) {
      return error({
        statusCode: 404,
        message: 'No collection found'
      })
    }

    return {
      collection: transformCollection(collection.data.collectionByHandle),
      content: content.data.allCollection[0]
    }
  },

  data() {
    return {
      pagination: {
        label: this.$t('collections.pagination.load_more')
      }
    }
  },

  computed: {
    /**
     * Returns the dynamic collection heading.
     * - Defaults to the collection title.
     * - Overidden by the content heading.
     * @returns {string}
     */
    collectionHeading() {
      return this.content?.heading
        ? this.content.heading
        : this.collection.title
    },

    /**
     * Returns the dynamic description HTML.
     * - Defaults to the collection description.
     * - Overidden by the content description.
     * @returns {string}
     */
    collectionDescription() {
      return this.content?.description
        ? transformBlocks(this.content.description)
        : this.collection.descriptionHtml
    }
  },

  methods: {
    /**
     * Loads the next page of products.
     * - Appends to existing product array.
     * - Updates pageInfo once complete.
     */
    async handleLoadMoreEvent() {
      const collectionProducts = this.collection.products.edges
      const { cursor } = collectionProducts[collectionProducts.length - 1]

      this.pagination.label = this.$t('general.states.loading')

      const { data } = await this.$apolloProvider.clients.shopify.query({
        query: collectionByHandleQuery,
        variables: {
          handle: this.$route.params.handle,
          cursor
        }
      })

      const products = data.collectionByHandle.products.edges.map(({ node, ...rest }) => {
        return {
          node: transformProduct(node),
          ...rest
        }
      })

      this.collection.products = {
        pageInfo: data.collectionByHandle.products.pageInfo,
        edges: this.collection.products.edges.concat(products)
      }

      this.pagination.label =
        this.$t('collections.pagination.load_more')
    }
  }
}
</script>

<style lang="scss">
.collection {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 0 $SPACING_XL 0;
  }

  &__grid {
    display: grid;
    grid-gap: $SPACING_L;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: $LAYOUT_S;
  }

  &__pagination {
    display: flex;
    justify-content: center;
    margin-bottom: $LAYOUT_S;
  }

  &__paginate {
    @include button-reset;
    cursor: pointer;
  }

  @include mq($from: large) {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
