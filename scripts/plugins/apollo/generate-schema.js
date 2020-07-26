/**
 * Plugins / Apollo / Generate Schema
 * ------------------------------------------------------------------------------
 * Generates a JSON file of GraphQL schemas.
 * - Allows for the resolution of fragments.
 *
 */
const fetch = require('node-fetch')
const fs = require('fs')
const { httpEndpoint, httpLinkOptions } = require('../shopify/client')()

fetch(
  httpEndpoint,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...httpLinkOptions.headers
    },
    body: JSON.stringify({
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
  }
)
  .then((response) => response.json())
  .then(({ data }) => {
    const filteredData = data.__schema.types.filter(
      (type) => type.possibleTypes !== null
    )
    data.__schema.types = filteredData

    fs.writeFileSync(
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
