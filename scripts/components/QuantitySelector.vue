<template>
  <div class="quantity-selector">
    <input v-model="quantity" type="number" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
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
  }
}
</script>
