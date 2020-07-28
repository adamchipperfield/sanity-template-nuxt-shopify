<template>
  <div class="product-gallery">
    <div ref="carousel" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="swiper-slide"
        >
          <responsive-image
            :url="image.originalSrc"
            :alt="image.altText"
            :max-height="740"
            :max-width="740"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper'

import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

  props: {
    images: {
      type: Array,
      require: true,
      default: () => []
    }
  },

  mounted() {
    this.constructCarousel()
  },

  methods: {
    /**
     * Constructs the carousel instance.
     */
    constructCarousel() {
      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/swiper';
</style>
