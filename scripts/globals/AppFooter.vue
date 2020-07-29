<template>
  <div class="app-footer">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <card-brands />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardBrands from '~/components/CardBrands'

export default {
  components: {
    CardBrands
  }
}
</script>

<style lang="scss">
.app-footer {
  background-color: $COLOR_BACKGROUND_LIGHT;
  margin-top: $LAYOUT_M;
  padding: $SPACING_XL 0;
}
</style>
