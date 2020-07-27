<template>
  <drawer namespace="cart" @open="handleDrawerOpen">
    <div class="cart-drawer">
      <div class="cart-drawer__main">
        <div class="cart-drawer__header">
          <h3 class="cart-drawer__title">
            {{ $t('cart.general.title') }}
          </h3>

          <p v-if="cart.lineItems.length <= 0">
            {{ $t('cart.general.empty') }}
          </p>
        </div>

        <div v-if="cart.lineItems.length" class="cart-drawer__body">
          <template v-if="isDrawerLoading">
            <div
              v-for="(item) in getLineItems"
              :key="item.id"
              class="cart-drawer__item"
            >
              <cart-line-item is-loading />
            </div>
          </template>

          <template v-else>
            <div
              v-for="(item) in cart.lineItems"
              :key="item.id"
              class="cart-drawer__item"
            >
              <cart-line-item :line-item="item" />
            </div>
          </template>
        </div>
      </div>

      <div v-if="cart.lineItems.length" class="cart-drawer__footer">
        <div class="cart-drawer__total">
          <p>{{ $t('cart.general.subtotal') }}:</p>
          <p class="cart-drawer__value">{{ cart.subtotal | formatMoney }}</p>
        </div>

        <btn
          :url="checkoutUrl"
          :label="$t('cart.general.checkout')"
          class="cart-drawer__button"
          outlined
          block
        />

        <btn
          url="/cart"
          :label="$t('cart.general.view_cart')"
          class="cart-drawer__button"
          block
        />
      </div>
    </div>
  </drawer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import Btn from '~/components/Button'
import CartLineItem from '~/components/CartLineItem'
import Drawer from '~/components/Drawer'

export default {
  components: {
    Btn,
    CartLineItem,
    Drawer
  },

  data() {
    return {
      cart: {
        lineItems: [],
        subtotal: 0
      }
    }
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      getLineItems: 'cart/getLineItems',
      getDrawerByNamespace: 'drawers/getDrawerByNamespace',
      checkoutUrl: 'checkout/getCheckoutUrl'
    }),

    /**
     * Returns if the drawer is loading.
     * @returns {boolean}
     */
    isDrawerLoading() {
      return (
        !this.cart.lineItems.length ||
        this.cart.lineItems.length !== this.getLineItems.length
      )
    },

    /**
     * Returns the drawer instance.
     * @returns {object}
     */
    drawer() {
      return this.getDrawerByNamespace('cart')
    }
  },

  mounted() {
    if (this.drawer.isActive) {
      this.handleDrawerOpen()
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      fetchCart: 'cart/fetchCart'
    }),

    /**
     * Handles the drawer enter event.
     */
    async handleDrawerOpen() {
      this.cart = await this.fetchCart()
    }
  },

  watch: {
    async getLineItems() {
      this.handleDrawerOpen()
    }
  }
}
</script>

<style lang="scss">
.cart-drawer {
  display: flex;
  height: 100%;
  flex-direction: column;

  &__title {
    margin: 0;
  }

  &__main {
    flex-grow: 1;
    overflow-y: auto;
  }

  &__header {
    padding: $SPACING_3XL $SPACING_4XL;
  }

  &__body {
    padding: 0 $SPACING_4XL;
  }

  &__item {
    margin-bottom: $SPACING_L;
  }

  &__footer {
    padding: $SPACING_XL $SPACING_4XL;
  }

  &__total {
    display: flex;
    justify-content: space-between;
  }

  &__value {
    text-align: right;
  }

  &__button {
    margin-top: $SPACING_S;
  }
}
</style>
