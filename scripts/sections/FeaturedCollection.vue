<template>
  <div class="featured-collection">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="featured-carousel__header">
            <h2 class="featured-carousel__title">
              {{ collection.title }}
            </h2>

            <btn
              label="View All"
              :url="`/collections/${collection.handle}`"
              as-text
              with-arrow
            />
          </div>
        </div>
      </div>
    </div>

    <product-carousel :products="collection.products" />
  </div>
</template>

<script>
import Btn from '~/components/Button'
import ProductCarousel from '~/components/ProductCarousel'

export default {
  components: {
    Btn,
    ProductCarousel
  },

  props: {
    collection: {
      type: Object,
      required: true,
      default: () => {
        return {
          title: '',
          handle: '',
          products: []
        }
      }
    }
  }
}
</script>

<style lang="scss">
.featured-carousel {
  &__header {
    align-items: baseline;
    display: flex;
    justify-content: space-between;
  }
}
</style>
