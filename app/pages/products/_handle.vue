<template>
  <div class="product">
    <div class="container">
      <div class="row">
        <div class="col xs12 l7">
          <product-gallery :images="product.images" />
        </div>

        <div class="col xs12 l5">
          <div class="product__aside">
            <product-form
              :product="product"
              :heading="content.heading"
            />

            <div
              v-if="product.descriptionHtml"
              class="product__description"
            >
              <p class="subtitle-2">
                {{ $t('products.general.description') }}
              </p>

              <p v-html="product.descriptionHtml" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import productByHandleQuery from '@/graphql/shopify/queries/productByHandleQuery'
import productContentByHandleQuery from '@/graphql/sanity/queries/productContentByHandleQuery'

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

    const content = await app.apolloProvider.clients.sanity.query({
      query: productContentByHandleQuery,
      variables: {
        handle: params.handle
      }
    })

    if (!product || !content) {
      return error({
        statusCode: 404,
        message: 'No product found'
      })
    }

    return {
      product: transformProduct(product.data.productByHandle),
      content: content.data.allProduct[0]
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
  &__description {
    margin-top: $SPACING_2XL;

    p {
      font-size: ms(-1);
    }
  }

  @include mq($from: large) {
    &__aside {
      padding: 0 $LAYOUT_S;
    }
  }
}
</style>
