import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      storage: {
        getItem: (key) => Cookies.get(key),
        setItem: (key, value) => Cookies.set(key, value),
        removeItem: (key) => Cookies.remove(key)
      },
      reducer(state) {
        const reducer = Object.assign({}, state)
        delete reducer.hydrated
        delete reducer.drawers
        delete reducer.menuItems

        return reducer
      }
    })(store)

    store.dispatch('storeHydrated')
  })
}
