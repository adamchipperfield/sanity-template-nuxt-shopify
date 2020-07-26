<template>
  <div class="product-gallery">
    <div ref="carousel" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="swiper-slide"
        >
          <img
            class="lazyload"
            :data-src="image.originalSrc"
            :alt="image.altText"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
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
@import '~swiper/css/swiper';
</style>
