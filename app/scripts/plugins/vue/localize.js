/**
 * Plugins / Vue / Localize
 * ------------------------------------------------------------------------------
 * Returns the localized version of a localized object.
 *
 * @namespace localize
 */
export default ({ app }, inject) => {
  inject('localize', (object, locale = app.i18n.locale) => {
    return object[
      locale.toLowerCase().replace('-', '')
    ]
  })
}
