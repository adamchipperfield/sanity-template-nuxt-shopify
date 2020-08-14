/**
 * Schemas / Schema
 * ------------------------------------------------------------------------------
 * Defines all of the schema types used in the Studio.
 * - Import documents and objects.
 * - Concatenate with the `schemaTypes` array.
 *
 */
import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Images from './objects/images'

import Collection from './documents/collection'
import Product from './documents/product'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    Collection,
    Images,
    Product
  ])
})
