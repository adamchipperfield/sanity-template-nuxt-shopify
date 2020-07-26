export const state = () => ({
  drawers: [
    {
      namespace: 'cart',
      isActive: false
    }
  ]
})

export const getters = {
  /**
   * Returns a drawer instance by namespace.
   * @param {object} state - The module state.
   * @param {string} namespace - The namespace to give.
   * @returns {object}
   */
  getDrawerByNamespace: (state) => (namespace) => {
    return state.drawers.find((drawer) => drawer.namespace === namespace)
  },

  /**
   * Returns all active drawers.
   * @param {object} state - The module state.
   */
  getAllDrawers(state) {
    return state.drawers
  }
}

export const mutations = {
  /**
   * Sets the new active drawer.
   * @param {object} state - The module state.
   * @param {string} namespace - The drawer namespace.
   */
  SET_DRAWER_OPEN(state, namespace) {
    const target = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

    target.isActive = true
  },

  /**
   * Close the given drawer.
   * @param {object} state - The module state.
   * @param {string} namespace - The drawer namespace.
   */
  SET_DRAWER_CLOSE(state, namespace) {
    const target = state.drawers.find(
      (drawer) => drawer.namespace === namespace
    )

    target.isActive = false
  }
}

export const actions = {
  /**
   * Opens a drawer.
   * @param {object} store - The module store.
   * @param {string} namespace - The drawer namespace.
   */
  openDrawer({ commit }, namespace) {
    commit('SET_DRAWER_OPEN', namespace)
  },

  /**
   * Closes a drawer.
   * @param {object} store - The module store.
   * @param {string} namespace - The drawer namespace.
   */
  closeDrawer({ commit }, namespace) {
    commit('SET_DRAWER_CLOSE', namespace)
  },

  /**
   * Closes all existing drawers.
   * @param {object} store - The module store.
   */
  closeAllDrawers({ commit, state }) {
    state.drawers.forEach(({ namespace }) => {
      commit('SET_DRAWER_CLOSE', namespace)
    })
  }
}
