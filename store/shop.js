import ShopQuery from '@/graphql/shopify/queries/shopQuery'

export const state = () => ({
  paymentSettings: {
    acceptedCardBrands: [],
    name: ''
  }
})

export const getters = {
  /**
   * Returns the accepted card brands list.
   * @param {object} state - The module state.
   * @returns {array}
   */
  getCardBrands(state) {
    return state.paymentSettings.acceptedCardBrands
  },

  /**
   * Returns the shop name.
   * @param {object} state - The module state.
   * @returns {string}
   */
  getName(state) {
    return state.name
  }
}

export const mutations = {
  /**
   * Sets the accepted card brands array.
   * @param {object} state - The module state.
   * @param {array} payload - The card brands array.
   */
  SET_ACCEPTED_CARD_BRANDS(state, payload) {
    state.paymentSettings.acceptedCardBrands = payload
  },

  /**
   * Sets the shop name.
   * @param {object} state - The module state.
   * @param {string} payload - The shop name.
   */
  SET_NAME(state, payload) {
    state.name = payload
  }
}

export const actions = {
  async fetchShop({ commit }) {
    const client = this.app.apolloProvider.clients.shopify
    const shopQuery = await client.query({ query: ShopQuery })
    const shop = shopQuery.data.shop

    if (shop.paymentSettings.acceptedCardBrands) {
      commit(
        'SET_ACCEPTED_CARD_BRANDS',
        shop.paymentSettings.acceptedCardBrands
      )
    }

    if (shop.name) {
      commit('SET_NAME', shop.name)
    }
  }
}
