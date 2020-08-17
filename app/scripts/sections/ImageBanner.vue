<template>
  <div class="image-banner">
    <div class="image-banner__overlay">
      <div class="container">
        <div class="row no-margin-bottom">
          <div class="col xs12 l6 push-l3">
            <h2 v-if="section.heading" class="image-banner__heading d3">
              {{ section.heading }}
            </h2>

            <btn
              v-if="section.button"
              :label="section.button.label"
              :url="section.button.url"
            />
          </div>
        </div>
      </div>
    </div>

    <responsive-image
      v-if="section.image"
      class="image-banner__image"
      :url="section.image.asset.url"
      :alt="section.image.alt"
    />
  </div>
</template>

<script>
import Btn from '~/components/Button'
import ResponsiveImage from '~/components/ResponsiveImage'

export default {
  components: {
    Btn,
    ResponsiveImage
  },

  props: {
    section: {
      type: Object,
      default: () => ({
        heading: '',
        image: {
          alt: '',
          asset: {
            url: ''
          }
        },
        button: {
          label: '',
          url: ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
.image-banner {
  align-items: center;
  background-color: $COLOR_BACKGROUND_LIGHT;
  display: flex;
  height: 60vh;
  overflow: hidden;
  padding: $LAYOUT_S 0;
  position: relative;

  &__overlay {
    position: relative;
    text-align: center;
    width: 100%;
    z-index: 2;
  }

  &__heading {
    color: $COLOR_TEXT_INVERSE;
  }

  &__image {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }

  @include mq($from: large) {
    height: 80vh;
  }
}
</style>
