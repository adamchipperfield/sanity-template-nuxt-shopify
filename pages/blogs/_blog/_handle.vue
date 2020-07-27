<template>
  <div class="article">
    <div class="container">
      <div v-if="article.image" class="row">
        <div class="col xs12 l10 push-l1">
          <div class="article__hero">
            <img
              class="article__image"
              :src="article.image.transformedSrc"
              :alt="article.image.title"
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col xs12 l8 push-l2">
          <div class="article__header">
            <h1 class="article__title">{{ article.title }}</h1>
            <p class="meta">{{ articlePublished }}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col xs12 l8 push-l2">
          <div class="article__body">
            <p v-html="article.contentHtml" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleByHandleQuery from '@/graphql/shopify/queries/articleByHandleQuery'

export default {
  async asyncData({ app, params, route }) {
    const client = app.apolloProvider.clients.shopify
    const routeParts = route.path.split('/')
    const blogHandle = routeParts[routeParts.length - 2]

    const article = await client.query({
      query: articleByHandleQuery,
      variables: {
        blogHandle,
        handle: params.handle
      }
    })

    return {
      article: article.data.blogByHandle.articleByHandle
    }
  },

  computed: {
    /**
     * Returns the formatted published date.
     * @returns {string}
     */
    articlePublished() {
      const date = new Date(this.article.publishedAt)
      const dateFormat = new Intl.DateTimeFormat()

      return dateFormat.format(date)
    }
  }
}
</script>

<style lang="scss">
.article {
  margin-top: $LAYOUT_S;

  &__hero {
    background-color: $COLOR_BACKGROUND_LIGHT;
    height: 250px;
    overflow: hidden;
  }

  &__image {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  &__header {
    text-align: center;
  }

  &__title {
    margin-bottom: 0;
  }

  &__body {
    margin-bottom: $LAYOUT_S;
  }

  @include mq($from: large) {
    &__hero {
      height: 500px;
      margin: 0 0 $SPACING_L 0;
    }
  }
}
</style>
