<template>
  <div class="product-form">
    <h1 class="product-form__title">{{ product.title }}</h1>

    <h4 class="product-form__price">
      {{ price.amount | formatMoney(price.currencyCode) }}
    </h4>

    <quantity-selector v-model="quantity" />

    <div
      v-for="(option, index) in product.options"
      :key="`option-${index}`"
      class="product-form__option"
    >
      <swatch-grid
        v-show="option.values.length >= 2"
        :title="option.name"
        :items="option.values"
        v-model="form.options[option.name]"
      />
    </div>

    <btn
      :label="addToCartLabel"
      @click.native="handleAddToCartEvent"
      block
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Btn from '~/components/Button'
import SwatchGrid from '~/components/SwatchGrid'
import QuantitySelector from '~/components/QuantitySelector'

export default {
  components: {
    Btn,
    SwatchGrid,
    QuantitySelector
  },

  props: {
    product: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  data() {
    return {
      isAdding: false,
      quantity: 1,
      form: {
        options: {}
      }
    }
  },

  computed: {
    /**
     * Returns the dynamic add to cart label.
     * @returns {string}
     */
    addToCartLabel() {
      return this.isAdding
        ? this.$t('products.form.adding_to_cart')
        : this.$t('products.form.add_to_cart')
    },

    /**
     * Returns the product price object.
     * - Amount: The price value in a string.
     * - Currency: The code for the currency.
     * @returns {object}
     */
    price() {
      return this.currentVariant.presentmentPrices[0].price
    },

    /**
     * Returns the default selected options.
     * @returns {object}
     */
    defaultOptions() {
      return this.product.options.reduce((result, item, index) => {
        result[item.name] = this.product.variants[0].selectedOptions[
          index
        ].value
        return result
      }, {})
    },

    /**
     * Calculates the current variant.
     * - Based on the current options.
     * - Matches variants with equal option values.
     * @returns {object}
     */
    currentVariant() {
      const variant = this.product.variants.find((variant) => {
        let satisfied = 0

        variant.selectedOptions.forEach(({ name, value }) => {
          if (this.form.options[name] === value) {
            satisfied++
          }
        })

        return satisfied === this.product.options.length
      })

      return variant ? variant : this.product.variants[0]
    }
  },

  beforeMount() {
    this.form.options = this.defaultOptions
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addToCart: 'cart/addLineItem',
      openDrawer: 'drawers/openDrawer'
    }),

    /**
     * Handles the add to cart event.
     */
    handleAddToCartEvent() {
      this.isAdding = true

      this.addToCart({
        variantId: this.currentVariant.id,
        quantity: this.quantity
      })
        .then(() => {
          this.isAdding = false
          this.openDrawer('cart')
        })
    }
  }
}
</script>

<style lang="scss">
.product-form {
  &__title {
    margin: $SPACING_L 0 $SPACING_S 0;
  }

  &__price {
    margin: 0 0 $SPACING_L 0;
  }
}
</style>
