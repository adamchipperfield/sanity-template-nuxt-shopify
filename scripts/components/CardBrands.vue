<template>
  <div class="card-brands">
    <div
      v-for="(brand, index) in brands"
      :key="index"
      class="card-brands__item"
    >
      <component :is="brand.icon" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { handleize } from '~/utils/transform-string'

export default {
  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      cardBrands: 'shop/getCardBrands'
    }),

    /**
     * Returns the brand icons.
     * @returns {array}
     */
    brands() {
      return this.cardBrands.map((brand) => {
        const slug = `payment-${handleize(brand)}`

        return {
          icon: () => import(`@/assets/icons/${slug}.svg?inline`)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.card-brands {
  display: flex;

  &__item {
    margin: 0 $SPACING_XS;

    .icon {
      height: 20px;
      width: auto;
    }
  }
}
</style>
