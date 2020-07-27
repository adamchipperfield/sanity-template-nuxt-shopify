<template>
  <div class="product-carousel">
    <div ref="carousel" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="swiper-slide"
        >
          <product-card :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'

import ProductCard from '~/components/ProductCard'

export default {
  components: {
    ProductCard
  },

  props: {
    products: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  mounted() {
    this.constructCarousel()
  },

  methods: {
    /**
     * Constructs a new carousel instance.
     */
    constructCarousel() {
      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 3,
        spaceBetween: 24
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/css/swiper';
</style>
