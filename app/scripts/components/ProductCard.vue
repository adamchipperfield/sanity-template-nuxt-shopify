<template>
  <div class="product-card">
    <n-link :to="productUrl" class="product-card__thumbnail">
      <responsive-image
        v-if="product.images[0]"
        :alt="product.title"
        :url="product.images[0].originalSrc"
        :max-height="492"
        :max-width="410"
      />
    </n-link>

    <n-link :to="productUrl" class="product-card__title">
      {{ product.title }}
    </n-link>

    <p class="product-card__price meta">{{ productPrice }}</p>
  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

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
  $parent: &;

  &__thumbnail {
    display: block;
    margin-bottom: $SPACING_M;

    &:empty {
      max-height: 492px;
      max-width: 410px;

      &::before {
        background-color: $COLOR_BACKGROUND_LIGHT;
        content: '';
        display: block;
        padding-top: 120%;
        width: 100%;
      }
    }
  }

  &__price {
    margin-top: $SPACING_XS;
  }
}
</style>
