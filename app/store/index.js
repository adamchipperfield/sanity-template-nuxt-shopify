export const state = () => ({
  hydrated: false,
  menuItems: [
    {
      label: 'Collections',
      url: '/'
    },
    {
      label: 'Blog',
      url: '/blogs/news'
    }
  ]
})

export const getters = {
  /**
   * Returns if the app has hydrated.
   * @param {object} state - The module state.
   * @returns {boolean}
   */
  isHydrated({ hydrated }) {
    return hydrated
  },

  /**
   * Returns the global menu items.
   * @param {object} state - The module state.
   * @returns {array}
   */
  getMenuItems({ menuItems }) {
    return menuItems
  }
}

export const mutations = {
  /**
   * Sets the hydrated state.
   * @param {object} state - The module state.
   */
  SET_HYDRATED(state) {
    state.hydrated = true
  }
}

export const actions = {
  /**
   * Handles the rehydrated store state.
   * @param {object} store - The module store.
   */
  async storeHydrated({ commit, dispatch }) {
    await dispatch('checkout/initCheckout')
    await dispatch('shop/fetchShop')
    
    commit('SET_HYDRATED')
  }
}
