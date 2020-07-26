export const state = () => ({
  hydrated: false
})

export const getters = {
  /**
   * Returns if the app has hydrated.
   * @param {object} state - The module state.
   * @returns {boolean}
   */
  isHydrated({ hydrated }) {
    return hydrated
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
  storeHydrated({ commit, dispatch }) {
    commit('SET_HYDRATED')
    dispatch('checkout/initCheckout')
  }
}
