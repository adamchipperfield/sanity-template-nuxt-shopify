/**
 * Schemas / Objects / Image Banner
 * ------------------------------------------------------------------------------
 * An image banner section with text overlays.
 *
 * @namespace imageBanner
 */
export default {
  title: 'Image Banner',
  name: 'imageBanner',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Heading',
      name: 'heading',
      type: 'string'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'images'
    }
  ]
}
