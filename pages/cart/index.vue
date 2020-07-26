<template>
  <div class="cart">
    <hero-banner :title="$t('cart.general.title')" />

    <div class="container">
      <div class="row">
        <div class="col xs12 l7">
          <div v-if="hasLineItems" class="cart__table">
            <template v-if="isTableLoading">
              <cart-line-item
                v-for="(item, index) in getLineItems"
                :key="index"
                class="cart__item"
                is-loading
              />
            </template>

            <template v-else>
              <div
                v-for="(item, index) in cart.lineItems"
                :key="index"
                class="cart__item"
              >
                <cart-line-item :line-item="item" />
              </div>
            </template>
          </div>

          <h3 v-else>
            {{ $t('cart.general.empty') }}
          </h3>
        </div>

        <div class="col xs12 l5">
          <aside v-if="hasLineItems" class="cart__summary">
            <div class="cart__total">
              <h3>{{ $t('cart.general.total') }}</h3>
            </div>

            <div class="cart__total">
              <p>{{ $t('cart.general.subtotal') }}:</p>

              <p
                v-if="isTableLoading"
                class="cart__value cart__value--loading"
              />

              <p v-else class="cart__value">
                {{ cart.subtotal | formatMoney }}
              </p>
            </div>

            <div class="cart__total">
              <p>{{ $t('cart.general.shipping') }}:</p>
              <p class="cart__value">{{ $t('cart.general.shipping_taxes') }}</p>
            </div>

            <btn
              :url="checkoutUrl"
              :label="$t('cart.general.checkout')"
              class="cart__checkout"
              block
            />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Cookies from 'js-cookie'

import Btn from '~/components/Button'
import CartLineItem from '~/components/CartLineItem'
import HeroBanner from '~/components/HeroBanner'

export default {
  components: {
    Btn,
    CartLineItem,
    HeroBanner
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      getLineItems: 'cart/getLineItems',
      checkoutUrl: 'checkout/getCheckoutUrl'
    }),

    /**
     * Returns if there is existing line items.
     * @returns {boolean}
     */
    hasLineItems() {
      return (
        this.cart.lineItems.length ||
        Cookies.get('line_items') === 'true'
      )
    },

    /**
     * Returns if the table is loading.
     * @returns {boolean}
     */
    isTableLoading() {
      return (
        !this.cart.lineItems.length ||
        this.cart.lineItems.length !== this.getLineItems.length
      )
    }
  },

  asyncComputed: {
    /**
     * Returns the line items with variants.
     * @returns {array}
     */
    cart: {
      async get() {
        return await this.fetchCart()
      },
      default: () => ({
        lineItems: [],
        subtotal: 0
      })
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      addLineItem: 'cart/addLineItem',
      fetchCart: 'cart/fetchCart'
    })
  }
}
</script>

<style lang="scss">
.cart {
  &__item {
    margin-bottom: $SPACING_3XL;
  }

  &__summary {
    border-top: 1px solid $COLOR_BORDER_LIGHT;
    padding: $SPACING_XL 0;
  }

  &__checkout {
    margin-top: $SPACING_L;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    margin-top: -$SPACING_M;
  }

  &__value {
    font-size: ms(-1);
    max-width: 50%;
    text-align: right;

    &#{&}--loading {
      background-color: $COLOR_BACKGROUND_LIGHT;
      border-radius: 5px;
      color: transparent;
      height: 20px;
      max-width: 100px;
      width: 100%;
    }
  }

  @include mq($from: large) {
    &__summary {
      border-left: 1px solid $COLOR_BORDER_LIGHT;
      border-top: 0;
      padding: 0 $SPACING_5XL;
    }
  }
}
</style>
