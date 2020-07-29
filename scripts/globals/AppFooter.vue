<template>
  <div class="app-footer">
    <div class="container">
      <div class="row align-center no-margin-bottom">
        <div class="col xs12 l6">
          <p class="app-footer__copy">&copy; {{ shopName }}</p>
        </div>

        <div class="col xs12 l6">
          <div class="app-footer__icons">
            <card-brands />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CardBrands from '~/components/CardBrands'

export default {
  components: {
    CardBrands
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      shopName: 'shop/getName'
    })
  }
}
</script>

<style lang="scss">
.app-footer {
  background-color: $COLOR_BACKGROUND_LIGHT;
  margin-top: $LAYOUT_M;
  padding: $SPACING_XL 0;

  &__icons {
    margin-top: $SPACING_XL;
  }

  &__copy {
    font-size: ms(-1);
    margin: 0;
  }

  @include mq($from: large) {
    &__icons {
      display: flex;
      justify-content: flex-end;
      margin-top: 0;
    }
  }
}
</style>
