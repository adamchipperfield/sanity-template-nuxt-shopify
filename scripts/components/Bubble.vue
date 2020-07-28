<template>
  <div class="bubble">
    <span class="bubble__label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.bubble {
  background-color: $COLOR_BACKGROUND_DARK;
  border-radius: 10px;
  color: $COLOR_TEXT_INVERSE;
  font-size: ms(-3);
  line-height: 10px;
  min-height: 16px;
  min-width: 16px;
  padding: $SPACING_3XS $SPACING_2XS;

  &__label {
    left: 0.5px;
    position: relative;
  }
}
</style>
