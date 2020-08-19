<template>
  <div class="product">
    <div class="container">
      <div class="row">
        <div class="col xs12 l7">
          <product-gallery :images="productImages" />
        </div>

        <div class="col xs12 l5">
          <div class="product__aside">
            <product-form :product="product" />

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

import fetchProduct from '~/utils/fetch-product'

import ProductForm from '~/components/ProductForm'
import ProductGallery from '~/components/ProductGallery'

export default {
  components: {
    ProductForm,
    ProductGallery
  },

  async asyncData(context) {
    return await fetchProduct(context)
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
    },

    /**
     * Returns the dynamic product images.
     * - Defaults to the product images.
     * - Overidden by the content query.
     * @returns {array}
     */
    productImages() {
      return this.product.images.map((image) => {
        return {
          src: image.originalSrc,
          alt: image.altText ? image.altText : this.product.title
        }
      })
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
