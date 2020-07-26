<template>
  <div class="product">
    <div class="container">
      <div class="row">
        <div class="col xs12 l7">
          <product-gallery :images="product.images" />
        </div>

        <div class="col xs12 l5">
          <div class="product__aside">
            <product-form :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import productByHandleQuery from '@/graphql/shopify/queries/productByHandleQuery'

import { transformProduct } from '~/utils/transform-graphql'

import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'

export default {
  components: {
    ProductForm,
    ProductGallery
  },

  async asyncData({ app, params, error }) {
    const product = await app.apolloProvider.clients.shopify.query({
      query: productByHandleQuery,
      variables: {
        handle: params.handle
      }
    })

    if (!product) {
      return error({
        statusCode: 404,
        message: 'No product found'
      })
    }

    return {
      product: transformProduct(product.data.productByHandle)
    }
  },

  data() {
    return {
      isAdding: false
    }
  },

  computed: {
    /**
     * Returns the dynamic add to cart label.
     * @returns {string}
     */
    addToCartLabel() {
      return this.isAdding
        ? this.$t('products.form.adding_to_cart')
        : this.$t('products.form.add_to_cart') 
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addLineItem: 'cart/addLineItem',
      openDrawer: 'drawers/openDrawer'
    }),

    /**
     * Handles the add to cart event.
     */
    handleAddToCartEvent() {
      this.isAdding = true

      this.addLineItem({
        variantId: this.product.variants[0].id,
        quantity: 1
      })
        .then(() => {
          this.isAdding = false
          this.openDrawer('cart')
        })
    }
  }
}
</script>

<style lang="scss">
.product {
  @include mq($from: large) {
    &__aside {
      padding: 0 $LAYOUT_S;
    }
  }
}
</style>
