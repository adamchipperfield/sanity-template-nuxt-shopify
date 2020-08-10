/**
 * Scripts / Utils / Transform GraphQL
 * ------------------------------------------------------------------------------
 * Transform helpers for GraphQL responses.
 *
 */

/**
 * Flattens the edges array in a node.
 * @param {object} node - Node item.
 * @returns {array}
 */
export const transformEdges = ({ edges }) => {
  return edges.map(({ node }) => node)
}

/**
 * Flattens all of the edge nodes in a product.
 * @param {object} product - Product node item.
 * @returns {object}
 */
export const transformProduct = ({ images, variants, presentmentPriceRanges, ...rest }) => {
  return {
    variants: variants ? variants.edges.map(({ node }) => transformVariant(node)) : [],
    presentmentPriceRanges: presentmentPriceRanges ? transformEdges(presentmentPriceRanges) : [],
    images: transformEdges(images),
    ...rest
  }
}

/**
 * Flattens all of the edge nodes in a variant.
 * @param {object} variant - Variant node item.
 * @returns {object}
 */
export const transformVariant = ({ presentmentPrices, ...rest }) => {
  return {
    presentmentPrices: transformEdges(presentmentPrices),
    ...rest
  }
}

/**
 * Flattens all of the edge nodes in a collection.
 * @param {object} collection - Collection node item.
 * @returns {object}
 */
export const transformCollection = ({ products, ...rest }) => {
  return {
    products: {
      pageInfo: products && products.pageInfo ? products.pageInfo: {},
      edges: products.edges.map(({ node, ...rest }) => {
        return {
          node: transformProduct(node),
          ...rest
        }
      })
    },
    ...rest
  }
}
