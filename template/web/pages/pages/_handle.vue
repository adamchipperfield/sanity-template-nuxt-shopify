<template>
  <div class="page">
    <h1>{{ page.title }}</h1>
    <p v-html="page.body" />
  </div>
</template>

<script>
import pageByHandleQuery from '@/graphql/shopify/queries/pageByHandleQuery'

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.clients.shopify

    const page = await client.query({
      query: pageByHandleQuery,
      variables: {
        handle: params.handle
      }
    })

    return {
      page: page.data.pageByHandle
    }
  }
}
</script>
