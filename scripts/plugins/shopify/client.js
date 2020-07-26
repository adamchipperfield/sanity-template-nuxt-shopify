
/**
 * Plugins / Shopify / Client
 * ------------------------------------------------------------------------------
 * Creates the Shopify client and returns the config.
 * - Used by the @nuxtjs/apollo module in `nuxt.config.js`
 *
 */
const {
  IntrospectionFragmentMatcher,
  InMemoryCache
} = require('apollo-cache-inmemory')

const schema = require('./../apollo/schema.json')
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

module.exports = () => {
  return {
    httpEndpoint: `https://headless-shop.myshopify.com/api/2020-07/graphql.json`,
    httpLinkOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': '6741709eefa268b6821ef43741cb88f3'
      }
    },
    cache: new InMemoryCache({ fragmentMatcher })
  }
}
