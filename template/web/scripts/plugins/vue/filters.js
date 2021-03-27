/**
 * Plugins / Vue / Filter
 * ------------------------------------------------------------------------------
 * String filters for Vue templates.
 *
 */
import Vue from 'vue'

/**
 * Returns the money with a currency symbol.
 * @param {number} value - The money value.
 * @param {string} currency - The currency code.
 * @returns {string}
 */
export const formatMoney = (value, currency = 'GBP') => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency
  })
    .format(value)
}

/**
 * Returns the handelized version of a string.
 * @param {string} string - The string to convert.
 * @returns {string}
 */
export const handleize = (string) => {
  return string
    .replace(/\s/g, '-')
    .replace(/\//g, '')
    .replace(/--/g, '-')
    .replace(/_/g, '-')
    .toLowerCase()
}

const filterGroup = {
  formatMoney,
  handleize
}

export default Object.keys(filterGroup).forEach((key) => {
  Vue.filter(key, filterGroup[key])
})
