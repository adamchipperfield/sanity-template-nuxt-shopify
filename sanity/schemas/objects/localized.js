/**
 * Schemas / Object / Localized
 * ------------------------------------------------------------------------------
 * Defines a localised string for each locale.
 * - https://en.wikipedia.org/wiki/Language_localisation#Language_tags_and_codes
 *
 * @namespace localised
 */
const locales = [
  {
    iso_code: 'en-GB',
    title: 'British English',
    isDefault: true
  }
]

export default {
  title: 'Localized',
  name: 'localized',
  type: 'object',
  fieldsets: [
    {
      title: 'Translations',
      name: 'translations',
      options: {
        collapsible: true
      }
    }
  ],
  fields: locales.map((locale) => (
    {
      title: locale.title,
      name: locale.iso_code.toLowerCase().replace('-', ''),
      type: 'string',
      fieldset: locale.isDefault ? null : 'translations'
    }
  ))
}
