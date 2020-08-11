/**
 * Plugins / Sanity / Client
 * ------------------------------------------------------------------------------
 * Creates the Sanity client and returns the config.
 * - Used by the @nuxtjs/apollo module in `nuxt.config.js`
 *
 */
require('dotenv').config()

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
    httpEndpoint:
      `https://egy0f7e4.apicdn.sanity.io/v1/graphql/production/default`,
    httpLinkOptions: {
      headers: {
        Authorization: `Bearer sk6xmmPjoAcozJ6IvJPZqfOHFvAKH8OI7o26GDVPpvZxacsAd8RRjO5U0R7wlJMil22wNwRXn7MCFzOhcbwIhQ2pFAzPanXuU3VqFfNOSWGbZlE63kkxUDF4v1Ox4mAq5vQfwVnO4JR6I1etNO19i0e5toX8FL90tTM6soL800fqgmqnXq8G`
      }
    },
    cache: new InMemoryCache({ fragmentMatcher })
  }
}
