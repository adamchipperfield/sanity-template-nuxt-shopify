/**
 * Schemas / Objects / Link Item
 * ------------------------------------------------------------------------------
 * A link object with a label and target.
 *
 * @namespace linkItem
 */
export default {
  title: 'Link Item',
  name: 'linkItem',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'URL',
      name: 'url',
      type: 'string'
    }
  ]
}
