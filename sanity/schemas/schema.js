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

import FeaturedCollection from './objects/featured-collection'
import ImageBanner from './objects/image-banner'
import Images from './objects/images'
import LinkItem from './objects/link-item'

import Article from './documents/Article'
import Blog from './documents/blog'
import Collection from './documents/collection'
import LandingPage from './documents/landing-page'
import Product from './documents/product'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    Article,
    Blog,
    Collection,
    FeaturedCollection,
    ImageBanner,
    Images,
    LandingPage,
    LinkItem,
    Product
  ])
})
