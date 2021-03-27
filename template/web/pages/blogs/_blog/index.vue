<template>
  <div class="blog">
    <hero-banner :title="blog.title" />

    <div class="container">
      <div class="row">
        <div class="col xs12">
          <div class="blog__grid">
            <div
              v-for="(article, index) in blog.articles.edges"
              :key="index"
              class="blog__article"
            >
              <article-card :article="article.node" />
            </div>
          </div>

          <div
            v-if="blog.articles.pageInfo.hasNextPage"
            class="blog__pagination"
          >
            <button
              class="blog__paginate"
              @click="handleLoadMoreEvent"
            >
              {{ pagination.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogByHandleQuery from '@/graphql/shopify/queries/blogByHandleQuery'

import ArticleCard from '~/components/ArticleCard'
import HeroBanner from '~/components/HeroBanner'

export default {
  components: {
    ArticleCard,
    HeroBanner
  },

  async asyncData({ app, params }) {
    const client = app.apolloProvider.clients.shopify

    const blog = await client.query({
      query: blogByHandleQuery,
      variables: {
        handle: params.blog
      }
    })

    return {
      blog: blog.data.blogByHandle
    }
  },

  data() {
    return {
      pagination: {
        label: this.$t('blogs.pagination.load_more')
      }
    }
  },

  methods: {
    /**
     * Loads the next page of articles.
     * - Appends to existing article array.
     * - Updates pageInfo once complete.
     */
    async handleLoadMoreEvent() {
      const blogArticles = this.blog.articles.edges
      const { cursor, node } = blogArticles[blogArticles.length - 1]

      this.pagination.label = this.$t('general.states.loading')

      const { data } = await this.$apolloProvider.clients.shopify.query({
        query: blogByHandleQuery,
        variables: {
          handle: this.$route.params.blog,
          cursor
        }
      })

      this.blog.articles = {
        pageInfo: data.blogByHandle.articles.pageInfo,
        edges: this.blog.articles.edges
          .concat(data.blogByHandle.articles.edges)
      }

      this.pagination.label =
        this.$t('blogs.pagination.load_more')
    }
  }
}
</script>

<style lang="scss">
.blog {
  &__grid {
    display: grid;
    grid-gap: $SPACING_L;
    grid-template-columns: repeat(1, 1fr);
    margin-bottom: $LAYOUT_S;
    row-gap: $SPACING_3XL;
  }

  &__pagination {
    display: flex;
    justify-content: center;
  }

  &__paginate {
    @include button-reset;
    cursor: pointer;
  }

  @include mq($from: small) {
    &__grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include mq($from: medium) {
    &__grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include mq($from: large) {
    &__grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
