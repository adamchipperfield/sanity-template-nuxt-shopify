/**
 * Plugins / Apollo / Generate Schema
 * ------------------------------------------------------------------------------
 * Generates a JSON file of GraphQL schemas.
 * - Allows for the resolution of fragments.
 *
 */
const fetch = require('node-fetch')
const fs = require('fs')

const shopifyClient = require('../shopify/client')()
const sanityClient = require('../sanity/client')()

const query = JSON.stringify({
  query: `
    {
      __schema {
        types {
          kind
          name
          possibleTypes {
            name
          }
        }
      }
    }
  `
})

const fetchFragments = ({ endpoint, headers }) => {
  return fetch(
    endpoint,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: query
    }
  )
    .then((response) => response.json())
}

Promise.all([
  /**
   * Shopify fragment query.
   */
  fetchFragments({
    endpoint: shopifyClient.httpEndpoint,
    headers: shopifyClient.httpLinkOptions.headers
  }),

  /**
   * Sanity fragment query.
   */
  fetchFragments({
    endpoint: sanityClient.httpEndpoint,
    headers: sanityClient.httpLinkOptions.headers
  })
])
  .then((responses) => {
    const data = {
      __schema: {}
    }

    responses.forEach((item) => {
      Object.assign(
        data.__schema,
        {
          types: item.data.__schema.types
            .filter((type) => type.possibleTypes !== null)
        }
      )
    })

    fs.writeFile(
      './scripts/plugins/apollo/schema.json',
      JSON.stringify(data),
      (error) => {
        if (error) {
          console.error('Error writing fragmentTypes file', error)
        } else {
          console.log('Fragment types successfully extracted!')
        }
      }
    )
  })
