<template>
  <div class="app-header">
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="app-header__masthead">
            <div class="app-header__nav">
              <button class="app-header__hamburger" @click="openMenuDrawer">
                <span class="visually-hidden">
                  {{ $t('header.a11y.toggle_menu_drawer') }}
                </span>

                <icon-hamburger />
              </button>

              <app-nav class="app-header__navigation" />
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
                <span class="visually-hidden">Cart</span>
                <icon-cart />

                <bubble
                  v-if="cartCount >= 1"
                  class="app-header__bubble"
                  :label="cartCount"
                />
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

import IconCart from '@/assets/icons/misc-cart.svg?inline'
import IconHamburger from '@/assets/icons/misc-hamburger.svg?inline'

import AppLogo from '~/components/AppLogo'
import AppNav from '~/components/AppNav'
import Bubble from '~/components/Bubble'

export default {
  components: {
    AppLogo,
    AppNav,
    Bubble,
    IconCart,
    IconHamburger
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
    },

    /**
     * Handle drawer open event.
     * - Opens the menu drawer.
     */
    openMenuDrawer() {
      this.openDrawer('menu')
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

  &__navigation {
    @include visually-hidden;
  }

  &__hamburger {
    @include button-reset;
    cursor: pointer;
  }

  &__cart-count {
    @include button-reset;
    cursor: pointer;
    position: relative;
  }

  &__bubble {
    position: absolute;
    right: -$SPACING_XS;
    top: -$SPACING_2XS;
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

  @include mq($from: medium) {
    &__navigation {
      @include visually-shown;
    }

    &__hamburger {
      @include visually-hidden;
    }
  }
}
</style>
