import Cookies from 'js-cookie'

import productVariantQuery from '@/graphql/shopify/queries/productVariantQuery.gql'
import { transformVariant } from '~/utils/transform-graphql'

export const state = () => ({
  lineItems: []
})

export const getters = {
  /**
   * Returns the cart's line items.
   * @param {object} state - The module state.
   * @returns {array}
   */
  getLineItems({ lineItems }) {
    return lineItems
  },

  /**
   * Returns the line item count.
   * @param {object} state - The module state.
   * @returns {number}
   */
  getCartCount({ lineItems }) {
    if (lineItems.length >= 1) {
      const accumulate = (total, item) => total + item.quantity
      return lineItems.reduce(accumulate, 0)
    }

    return 0
  }
}

export const mutations = {
  /**
   * Adds an item to the line items.
   * @param {object} state - The module state.
   * @param {object} lineItem - The item to add.
   */
  ADD_LINE_ITEM(state, lineItem) {
    state.lineItems = Object.values(
      [...state.lineItems, lineItem].reduce((item, { quantity, ...rest }) => {
        item[rest.variantId] = {
          quantity: (item[rest.variantId] ? item[rest.variantId].quantity : 0) + quantity,
          ...rest
        }
        return item
      }, {})
    )

    Cookies.set(
      'line_items', !!state.lineItems.length
    )
  },

  /**
   * Removes a line item.
   * @param {object} state - The module state.
   * @param {string} variant - The variant ID.
   */
  REMOVE_LINE_ITEM(state, variant) {
    state.lineItems = state.lineItems
      .filter(({ variantId }) => variantId !== variant)

    Cookies.set(
      'line_items', !!state.lineItems.length
    )
  }
}

export const actions = {
  /**
   * Adds an item to the line items.
   * - Must pass an object with variantId and quantity.
   * - Does support just the variantId (assuming quantity is 1)
   * @param {object} store - The module store.
   * @param {object|string} lineItem - The item to add.
   */
  async addLineItem({ commit, dispatch, state }, lineItem) {
    const item = typeof lineItem === 'object'
      ? lineItem : { variantId: lineItem, quantity: 1 }

    return new Promise(async (resolve) => {
      commit('ADD_LINE_ITEM', item)
      resolve()
      dispatch('checkout/updateLineItems', state.lineItems, { root: true })
    })
  },

  /**
   * Removes a line item from the cart.
   * @param {object} store - The module store.
   * @param {object} variant - The variant ID.
   */
  async removeLineItem({ commit, dispatch, state }, variant) {
    return new Promise(async (resolve) => {
      commit('REMOVE_LINE_ITEM', variant)

      await dispatch('checkout/updateLineItems', state.lineItems, { root: true })
        .then(() => {
          resolve()
        })
    })
  },

  /**
   * Returns the asynchronous line item objects array.
   * @param {object} store - The module store.
   * @returns {promise}
   */
  async fetchCart({ state }) {
    const client = this.app.apolloProvider.clients.shopify

    return new Promise(async (resolve) => {
      const lineItems = await Promise.all(
        state.lineItems.map(async ({ variantId, ...rest }) => {
          const { data } = await client.query({
            query: productVariantQuery,
            variables: {
              id: variantId
            }
          })

          return {
            ...transformVariant(data.node),
            ...rest
          }
        })
      )

      const subtotal = lineItems.reduce((accumulator, item) => {
        return accumulator + Number(item.presentmentPrices[0].price.amount) * item.quantity
      }, 0)

      resolve({
        lineItems: lineItems.reverse(),
        subtotal
      })
    })
  }
}
