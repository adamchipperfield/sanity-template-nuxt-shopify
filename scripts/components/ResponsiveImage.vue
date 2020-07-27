<template>
  <picture class="responsive-image">
    <img
      class="responsive-image__image lazyload"
      :alt="alt"
      data-sizes="auto"
      :data-src="imageSrc"
    />
  </picture>
</template>

<script>
import { getSizedImageUrl } from '@shopify/theme-images'

export default {
  props: {
    url: {
      type: String,
      required: true,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    }
  },

  computed: {
    /**
     * Returns the image URL.
     * @returns {string}
     */
    imageSrc() {
      return getSizedImageUrl(this.url, '{width}x')
    }
  }
}
</script>

<style lang="scss">
.responsive-image {
  overflow: hidden;

  &__image {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
}
</style>
