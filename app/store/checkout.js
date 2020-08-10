import checkoutCreateMutation from '@/graphql/shopify/mutations/checkoutCreateMutation'
import checkoutLineItemsReplaceMutation from '@/graphql/shopify/mutations/checkoutLineItemsReplaceMutation'

export const state = () => ({
  node: {
    id: null,
    webUrl: null
  }
})

export const getters = {
  /**
   * Returns the checkout instance.
   * @param {object} state - The module state.
   * @returns {object}
   */
  getCheckoutUrl({ node }) {
    return node.webUrl
  }
}

export const mutations = {
  /**
   * Sets the checkout state.
   * @param {object} state - The module state.
   * @param {object} payload - The checkout payload.
   */
  SET_CHECKOUT(state, payload) {
    state.node = payload
  }
}

export const actions = {
  /**
   * Initiates the checkout.
   */
  initCheckout({ dispatch }) {
    setTimeout(() => {
      dispatch('createCheckout', this.getters['cart/getLineItems'] || [])
    }, 250)
  },

  /**
   * Creates a checkout instance.
   * @param {object} store - The module store.
   * @param {array} lineItems - The existing line items.
   */
  async createCheckout({ commit }, lineItems) {
    const client = this.app.apolloProvider.clients.shopify

    return client.mutate({
      mutation: checkoutCreateMutation,
      variables: {
        input: {
          lineItems: lineItems ? lineItems : []
        }
      }
    })
      .then(({ data }) => {
        commit('SET_CHECKOUT', data.checkoutCreate.checkout)
      })
  },

  /**
   * Updates the checkout line items.
   * @param {object} store - The module store.
   */
  async updateLineItems({ commit, state }, lineItems) {
    const client = this.app.apolloProvider.clients.shopify

    return new Promise((resolve) => {
      client.mutate({
        mutation: checkoutLineItemsReplaceMutation,
        variables: {
          lineItems,
          checkoutId: state.node.id
        }
      })
        .then(({ data }) => {
          commit('SET_CHECKOUT', data.checkoutLineItemsReplace.checkout)
          resolve()
        })
    })
  }
}
