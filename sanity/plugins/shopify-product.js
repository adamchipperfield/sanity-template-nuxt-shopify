/**
 * Plugins / Shopify Product
 * ------------------------------------------------------------------------------
 * Allows search through a Shopify store catalog.
 *
 * @namespace shopifyProduct
 */
import React from 'react'
import Shopify from 'shopify-buy'
import PatchEvent, { set } from 'part:@sanity/form-builder/patch-event'
import DefaultFormField from 'part:@sanity/components/formfields/default'
import SearchableSelect from 'part:@sanity/components/selects/searchable'

const client = Shopify.buildClient({
  domain: 'headless-shop.myshopify.com',
  storefrontAccessToken: '6741709eefa268b6821ef43741cb88f3'
})

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set({ _type: 'slug', current: value }))

export default class ShopifyProduct extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [],
      results: []
    }
  }

  async componentDidMount() {
    const products = await client.product.fetchAll()
    const transformed = products.map(({ handle, title }) => {
      return { title, key: handle }
    })

    this.setState({
      products: transformed,
      results: transformed
    })
  }

  /**
   * Handles the search query.
   * - Filters the search results.
   * @param {string} query - The search query.
   */
  handleSearch(query) {
    const products = [...this.state.products]
 
    this.setState({
      results: products.filter(({ title }) => {
        return title.toLowerCase()
          .includes(query.toLowerCase())
      })
    })
  }

  /**
   * Handles the value change event.
   * - Tells Sanity about the change via a patch.
   * @param {object} value - The selected value.
   */
  handleChange(value) {
    this.props.onChange(
      createPatchFrom(value.key)
    )
  }

  /**
   * Renders a list item.
   * @param {object} item - The item to render.
   */
  renderItem(item) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {item.title}
        <small>{item.key}</small>
      </div>
    )
  }

  render() {
    const { type, value } = this.props
    const selected = this.state.results
      .find(({ key }) => key === value) || { key: value }

    return (
      <DefaultFormField
        label={type.title}
        description={type.description}
      >
        <SearchableSelect
          items={this.state.results}
          onSearch={this.handleSearch.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={selected}
          inputValue={selected.key?.current}
          renderItem={this.renderItem}
        />
      </DefaultFormField>
    )
  }
}
