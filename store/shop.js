import ShopQuery from '@/graphql/shopify/queries/shopQuery'

export const state = () => ({
  paymentSettings: {
    acceptedCardBrands: []
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
  }
}

export const actions = {
  async fetchShop({ commit }) {
    const client = this.app.apolloProvider.clients.shopify
    const shopQuery = await client.query({ query: ShopQuery })
    const shop = shopQuery.data.shop

    console.log(shop)

    if (shop.paymentSettings.acceptedCardBrands) {
      commit(
        'SET_ACCEPTED_CARD_BRANDS',
        shop.paymentSettings.acceptedCardBrands
      )
    }
  }
}
