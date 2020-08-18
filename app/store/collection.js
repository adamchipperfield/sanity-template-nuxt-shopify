export const state = () => ({
  sortBy: {
    selected: 'featured',
    options: [
      {
        label: 'Featured',
        value: 'featured'
      },
      {
        label: 'Best Selling',
        value: 'best-selling'
      }
    ]
  }
})

export const getters = {
  /**
   * Returns the sort by options.
   * @param {object} state - The module state.
   * @returns {array}
   */
  getSortByOptions(state) {
    return state.sortBy.options
  },

  /**
   * Returns the sort by selected option.
   * @param {object} state - The module state.
   * @returns {object}
   */
  getSortBySelected(state) {
    return state.sortBy.selected
  }
}

export const mutations = {
  /**
   * Sets the selected sort by value.
   * @param {object} state - The module state.
   * @param {string} value - The value for the option.
   */
  SET_SORT_BY_SELECTED(state, value) {
    state.sortBy.selected = value
  }
}

export const actions = {
  /**
   * Sets the new sort by selected value.
   * @param {object} store - The module store.
   * @param {string} value - The value for the option.
   */
  setSortBySelected({ commit }, value) {
    commit('SET_SORT_BY_SELECTED', value)
  }
}
