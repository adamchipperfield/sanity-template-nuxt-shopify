<template>
  <div class="product-carousel">
    <div class="container">
      <div class="row no-margin-bottom">
        <div class="col xs12">
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
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper'

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

  watch: {
    products(value) {
      if (value.length > 1) {
        setTimeout(() => {
          this.constructCarousel()
        }, 0)
      }
    }
  },

  mounted() {
    if (this.products.length > 1) {
      this.constructCarousel()
    }
  },

  methods: {
    /**
     * Constructs a new carousel instance.
     */
    constructCarousel() {
      this.carousel = new Swiper(this.$refs.carousel, {
        centeredSlides: true,
        slidesPerView: 1.5,
        spaceBetween: 24,
        loop: true,
        breakpoints: {
          768: {
            slidesPerView: 3
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/swiper';

.product-carousel {
  overflow: hidden;

  .swiper-container {
    overflow: visible;
  }
}
</style>
