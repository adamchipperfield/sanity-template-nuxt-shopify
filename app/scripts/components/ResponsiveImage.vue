<template>
  <picture
    class="responsive-image"
    :style="{ maxWidth: `${maxWidth}px` }"
  >
    <span
      :style="{
        display: 'block', paddingTop: `${(maxHeight / maxWidth) * 100}%`
      }"
      aria-hidden="true"
    />

    <img
      v-if="url"
      class="responsive-image__image lazyload"
      :alt="alt"
      data-sizes="auto"
      :data-src="imageSrc"
      :style="{
        maxHeight: `${maxHeight}px`,
        maxWidth: `${maxWidth}px`
      }"
    />
  </picture>
</template>

<script>
import { getSizedImageUrl } from '@shopify/theme-images'

export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: Number,
      required: true,
      default: 0
    },
    maxWidth: {
      type: Number,
      required: true,
      default: 0
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
  background-color: $COLOR_BACKGROUND_LIGHT;
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;

  &__image {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
