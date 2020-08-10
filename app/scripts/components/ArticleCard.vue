<template>
  <div class="article-card">
    <n-link :to="articleUrl" class="article-card__thumbnail">
      <responsive-image
        v-if="article.image"
        :url="article.image.originalSrc"
        :alt="article.image.title"
        :max-height="213"
        :max-width="305"
      />

      <responsive-image
        v-else
        is-placeholder
        :max-height="213"
        :max-width="305"
      />
    </n-link>

    <div class="article-card__footer">
      <p class="article-card__meta meta">
        {{ articlePublished }}
      </p>

      <n-link :to="articleUrl" class="article-card__title">
        {{ article.title }}
      </n-link>
    </div>
  </div>
</template>

<script>
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    ResponsiveImage
  },

  props: {
    article: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  computed: {
    /**
     * Returns the URL for the article.
     * @returns {string}
     */
    articleUrl() {
      return `/blogs/${this.article.blog.handle}/${this.article.handle}`
    },

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
.article-card {
  &__thumbnail {
    display: block;
  }

  &__footer {
    margin-top: $SPACING_M;
  }

  &__meta {
    color: $COLOR_TEXT_LIGHT;
    margin: 0 0 $SPACING_2XS;
  }

  &__title {
    display: block;
  }
}
</style>
