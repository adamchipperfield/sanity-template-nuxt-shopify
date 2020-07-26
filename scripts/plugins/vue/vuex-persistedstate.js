import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      storage: window.sessionStorage,
      reducer(state) {
        const reducer = Object.assign({}, state)
        delete reducer.hydrated
        delete reducer.drawers

        return reducer
      }
    })(store)

    store.dispatch('storeHydrated')
  })
}
