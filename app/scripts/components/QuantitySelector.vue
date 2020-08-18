<template>
  <div class="quantity-selector">
    <button
      class="quantity-selector__control"
      @click="decreaseQuantity"
    >
      <span class="visually-hidden">
        {{ $t('general.a11y.decrement') }}
      </span>

      <icon-minus />
    </button>

    <input
      v-model="quantity"
      type="number"
      class="quantity-selector__input"
      :id="namespace"
    />

    <button
      class="quantity-selector__control"
      @click="increaseQuantity"
    >
      <span class="visually-hidden">
        {{ $t('general.a11y.increment') }}
      </span>

      <icon-plus />
    </button>
  </div>
</template>

<script>
import IconMinus from '@/assets/icons/misc-minus.svg?inline'
import IconPlus from '@/assets/icons/misc-plus.svg?inline'

export default {
  components: {
    IconMinus,
    IconPlus
  },

  props: {
    value: {
      type: Number,
      default: 1
    },

    maximum: {
      type: Number,
      default: null
    },

    namespace: {
      type: String,
      default: 'Quantity'
    }
  },

  data() {
    return {
      quantity: this.value
    }
  },

  watch: {
    /**
     * Emits the v-model value on change.
     * - Listens for quantity changes.
     */
    quantity(value) {
      this.$emit('input', Number(value))
    }
  },

  methods: {
    /**
     * Decreases the quantity value.
     * - Will not go below 1.
     */
    decreaseQuantity() {
      if (this.quantity >= 2) { 
        this.quantity--
      }
    },

    /**
     * Increases the quantity value.
     * - Will not go above the maximum if set.
     */
    increaseQuantity() {
      if (this.maximum) {
        if (this.quantity <= this.maximum - 1) {
          this.quantity++
        }

        return
      }

      this.quantity++
    }
  }
}
</script>

<style lang="scss">
.quantity-selector {
  align-items: center;
  border: 1px solid $COLOR_BORDER_DARK;
  border-radius: 5px;
  display: inline-flex;

  &__control {
    @include button-reset;
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 42px;
    justify-content: center;
    width: 42px;

    .icon {
      height: 14px;
      width: 14px;
    }
  }

  &__input {
    appearance: textfield;
    border: 0;
    font-size: ms(-1);
    max-width: 20px;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      appearance: none;
      margin: 0;
    }
  }
}
</style>
