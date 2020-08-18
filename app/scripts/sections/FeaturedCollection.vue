<template>
  <div class="featured-collection">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="featured-carousel__header">
            <h2 v-if="section.heading" class="featured-carousel__heading">
              {{ section.heading }}
            </h2>

            <btn
              label="View All"
              :url="`/collections/${section.collection.handle.current}`"
              as-text
              with-arrow
            />
          </div>
        </div>
      </div>
    </div>

    <product-carousel :products="products" />
  </div>
</template>

<script>
import featuredCollectionByHandleQuery from '@/graphql/shopify/queries/featuredCollectionByHandleQuery'

import { transformProduct } from '~/utils/transform-graphql'

import Btn from '~/components/Button'
import ProductCarousel from '~/components/ProductCarousel'

export default {
  components: {
    Btn,
    ProductCarousel
  },

  props: {
    section: {
      type: Object,
      required: true,
      default: () => ({
        heading: '',
        collection: {
          handle: {
            current: ''
          }
        }
      })
    }
  },

  asyncComputed: {
    /**
     * Fetches the products from Shopify.
     * @returns {array}
     */
    products: {
      async get() {
        const collection = await this.$apolloProvider.clients.shopify.query({
          query: featuredCollectionByHandleQuery,
          variables: {
            handle: this.section.collection.handle.current
          }
        })

        return collection.data.collectionByHandle
          .products.edges.map(({ node }) => transformProduct(node))
      },
      default() {
        return []
      }
    }
  }
}
</script>

<style lang="scss">
.featured-carousel {
  &__header {
    align-items: baseline;
    display: flex;
    justify-content: space-between;
  }

  &__heading {
    margin-top: 0;
  }
}
</style>
