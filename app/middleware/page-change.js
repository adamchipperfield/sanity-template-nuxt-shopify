/**
 * Middleware / Page Change
 * ------------------------------------------------------------------------------
 * Handles the page change event.
 *
 */
export default function({ store }) {
  store.dispatch('drawers/closeAllDrawers')
}
