<template>
  <div class="product-card">
    <n-link :to="productUrl" class="product-card__thumbnail">
      <img
        v-if="product.images[0]"
        class="product-card__image"
        :src="product.images[0].transformedSrc"
        :alt="product.images[0].altText"
      />
    </n-link>

    <n-link :to="productUrl" class="product-card__title">
      {{ product.title }}
    </n-link>

    <p class="product-card__price meta">{{ productPrice }}</p>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  computed: {
    /**
     * Returns the full product URL.
     * @returns {string}
     */
    productUrl() {
      return `/products/${this.product.handle}`
    },

    /**
     * Returns the product price.
     * @returns {string}
     */
    productPrice() {
      const price = this.product.presentmentPriceRanges[0].minVariantPrice

      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: price.currencyCode
      })
        .format(price.amount)
    }
  }
}
</script>

<style lang="scss">
.product-card {
  &__thumbnail {
    background-color: $COLOR_BACKGROUND_LIGHT;
    display: block;
    margin-bottom: $SPACING_M;
    overflow: hidden;
    padding-top: 120%;
    position: relative;
    width: 100%;
  }

  &__image {
    height: 100%;
    object-fit: cover;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &__price {
    margin-top: $SPACING_XS;
  }
}
</style>
