<template>
  <div class="product-gallery">
    <div
      ref="carousel"
      class="product-gallery__carousel swiper-container"
    >
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

      <div
        ref="pagination"
        class="product-gallery__pagination"
      />
    </div>
  </div>
</template>

<script>
import { Swiper, Pagination } from 'swiper'

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
    this.initializeSwiper()
    this.constructCarousel()
  },

  methods: {
    /**
     * Initializes the Swiper module.
     * - Adds the components to be used.
     */
    initializeSwiper() {
      Swiper.use(Pagination)
    },

    /**
     * Constructs the carousel instance.
     */
    constructCarousel() {
      this.carousel = new Swiper(this.$refs.carousel, {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        pagination: {
          el: this.$refs.pagination,
          clickable: true
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '~swiper/swiper';

.product-gallery {
  &__carousel {
    position: relative;
  }

  &__pagination {
    bottom: $SPACING_L;
    display: flex;
    left: $SPACING_L;
    position: absolute;
    z-index: 1;
  }

  .swiper-pagination-bullet {
    background-color: lighten($COLOR_TEXT_LIGHT, 50%);
    border-radius: 50%;
    cursor: pointer;
    display: block;
    height: 8px;
    margin-right: $SPACING_XS;
    transition: background-color 0.2s ease-out;
    width: 8px;
  }

  .swiper-pagination-bullet-active {
    background-color: $COLOR_TEXT_LIGHT;
  }

  @include mq($from: large) {
    &__pagination {
      bottom: $SPACING_2XL;
      left: $SPACING_2XL;
    }
  }
}
</style>
