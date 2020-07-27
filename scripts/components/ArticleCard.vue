<template>
  <div class="article-card">
    <n-link :to="articleUrl" class="article-card__thumbnail">
      <responsive-image
        v-if="article.image"
        class="article-card__image"
        :url="article.image.originalSrc"
        :alt="article.image.title"
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
    background-color: $COLOR_BACKGROUND_LIGHT;
    display: block;
    overflow: hidden;
    padding-top: 70%;
    position: relative;
    width: 100%;
  }

  &__image {
    height: 100%;
    object-fit: cover;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
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
