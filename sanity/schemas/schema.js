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

import ImageBanner from './objects/image-banner'
import Images from './objects/images'
import LinkItem from './objects/link-item'

import Collection from './documents/collection'
import Product from './documents/product'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    Collection,
    ImageBanner,
    Images,
    LinkItem,
    Product
  ])
})
