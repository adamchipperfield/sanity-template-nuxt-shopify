<template>
  <div class="swatch-grid">
    <legend v-if="title" class="swatch-grid__title">
      {{ title }}
    </legend>

    <div v-if="items.length" class="swatch-grid__items">
      <div
        v-for="(swatch, index) in items"
        :key="index"
        class="swatch-grid__item"
      >
        <input
          v-model="currentValue"
          :id="`Swatch-${$options.filters.handleize(swatch)}`"
          :value="swatch"
          :name="$options.filters.handleize(swatch)"
          class="swatch-grid__input"
          type="radio"
        />

        <label
          :for="`Swatch-${$options.filters.handleize(swatch)}`"
          class="swatch-grid__label"
        >
          {{ swatch }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      currentValue: this.items[0]
    }
  },

  watch: {
    currentValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
.swatch-grid {
  $parent: &;

  &__title {
    font-size: ms(-1);
    margin-bottom: $SPACING_S;
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: $SPACING_M;
  }

  &__item {
    margin: 0 $SPACING_S $SPACING_S 0;
  }

  &__input {
    @include visually-hidden;

    &:checked + #{$parent}__label {
      border-color: $COLOR_BACKGROUND_DARK;
      outline: 1px solid $COLOR_BACKGROUND_DARK;
    }
  }

  &__label {
    align-items: center;
    border: 1px solid $COLOR_BORDER_DARK;
    cursor: pointer;
    display: flex;
    font-size: ms(-3);
    justify-content: center;
    height: 42px;
    line-height: $LINE_HEIGHT_META;
    padding: $SPACING_XS;
    text-align: center;
    width: 42px;

    &:hover {
      border-color: $COLOR_BACKGROUND_DARK;
    }
  }
}
</style>
