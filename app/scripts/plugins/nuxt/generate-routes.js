/**
 * Plugins / Nuxt / Generate Routes
 * ------------------------------------------------------------------------------
 * Generates the paths for all page routes for static generation.
 * - Makes a query to the APIs for entry handles.
 * - Outputs an array of paths for `nuxt.config.js` to use.
 *
 * @namespace generateRoutes
 */
const { GraphQLClient, gql } = require('graphql-request')

const { httpEndpoint, httpLinkOptions } = require('../shopify/client')()

const query = gql`
  {
    products(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
    collections(first: 250) {
      edges {
        node {
          handle
        }
      }
    }
  }
`

const client = new GraphQLClient(httpEndpoint, {
  headers: httpLinkOptions.headers
})

module.exports = async () => {
  return await client.request(query).then(({ products, collections }) => {
    return [
      ...products.edges
        .map(({ node }) => `/products/${node.handle}`),

      ...collections.edges
        .map(({ node }) => `/collections/${node.handle}`)
    ]
  })
}
