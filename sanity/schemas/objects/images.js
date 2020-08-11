
/**
 * Schemas / Object / Images
 * ------------------------------------------------------------------------------
 * A custom image component to allow additional fields.
 *
 * @namespace images
 */
export default {
  title: 'Image',
  name: 'images',
  type: 'image',
  fields: [
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string'
    }
  ]
}
