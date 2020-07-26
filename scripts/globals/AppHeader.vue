<template>
  <div class="app-header">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="app-header__masthead">
            <div class="app-header__nav">
              <app-nav />
            </div>

            <div class="app-header__logo">
              <n-link to="/">
                <app-logo />
              </n-link>
            </div>

            <div class="app-header__misc">
              <button
                class="app-header__cart-count"
                @click.prevent="openCartDrawer"
              >
                Cart ({{ cartCount }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import AppLogo from '~/components/AppLogo'
import AppNav from '~/components/AppNav'

export default {
  components: {
    AppLogo,
    AppNav
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      cartCount: 'cart/getCartCount'
    })
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      openDrawer: 'drawers/openDrawer'
    }),

    /**
     * Handle drawer open event.
     * - Opens the cart drawer.
     */
    openCartDrawer() {
      if (this.$route.name !== 'cart') {
        this.openDrawer('cart')
      }
    }
  }
}
</script>

<style lang="scss">
.app-header {
  padding: $SPACING_S 0 0;

  &__masthead {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__cart-count {
    @include button-reset;
    cursor: pointer;
  }

  &__nav,
  &__misc {
    flex: 0 0 25%;
  }

  &__misc {
    text-align: right;
  }

  &__logo {
    flex-grow: 1;
    text-align: center;

    .app-logo {
      height: 80px;
    }
  }
}
</style>
