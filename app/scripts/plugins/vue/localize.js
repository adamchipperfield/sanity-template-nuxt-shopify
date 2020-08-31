/**
 * Plugins / Vue / Localize
 * ------------------------------------------------------------------------------
 * Returns the localized version of a localized object.
 *
 * @namespace localize
 */
export default ({}, inject) => {
  inject('localize', (object, locale) => {
    return object[
      locale.toLowerCase().replace('-', '')
    ]
  })
}
