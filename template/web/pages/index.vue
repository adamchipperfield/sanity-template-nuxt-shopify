<template>
  <div class="home">
    <content-sections
      v-if="page.sections"
      :sections="page.sections"
    />
  </div>
</template>

<script>
import landingPageByHandleQuery from '@/graphql/sanity/queries/landingPageByHandleQuery'

import ContentSections from '~/components/ContentSections'

export default {
  components: {
    ContentSections
  },

  async asyncData({ app }) {
    const client = app.apolloProvider.clients.sanity

    const page = await client.query({
      query: landingPageByHandleQuery,
      variables: {
        handle: '/'
      }
    })
    
    return {
      page: page.data.allLandingPage[0]
    }
  }
}
</script>

<style lang="scss">
.home {
  @include mq($from: large) {
    &__section {
      &:not(:last-child) {
        margin-bottom: $LAYOUT_S;
      }
    }
  }
}
</style>
