<template>
  <div class="featured-collection">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <h2 class="product-carousel__title">
            {{ collection.title }}
          </h2>

          <product-carousel :products="collection.products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCarousel from '~/components/ProductCarousel'

export default {
  components: {
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
