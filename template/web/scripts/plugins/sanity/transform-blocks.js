/**
 * Plugins / Sanity / Transform Blocks
 * ------------------------------------------------------------------------------
 * Transforms block content into HTML.
 *
 * @namespace transformBlocks
 */
const blocksToHtml = require('@sanity/block-content-to-html')

module.exports = (blocks) => {
  return blocksToHtml({
    blocks
  })
}
