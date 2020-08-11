<template>
  <picture
    class="responsive-image"
    :class="classes"
    :style="{ maxWidth: `${maxWidth}px` }"
  >
    <span
      :style="{
        display: 'block', paddingTop: `${(maxHeight / maxWidth) * 100}%`
      }"
      aria-hidden="true"
    />

    <source :data-srcset="`${url}?w={width}&fm=webp`" type="image/webp" />
    <source :data-srcset="`${url}?w={width}&fm=jpg`" type="image/jpeg" /> 

    <img
      v-if="url"
      class="responsive-image__image lazyload"
      :alt="alt"
      data-sizes="auto"
      :src="`${url}?w=5`"
      :style="{
        maxHeight: `${maxHeight}px`,
        maxWidth: `${maxWidth}px`
      }"
    />
  </picture>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    maxHeight: {
      type: Number,
      required: true,
      default: 0
    },
    maxWidth: {
      type: Number,
      required: true,
      default: 0
    },
    fit: {
      type: String,
      default: 'cover'
    }
  },
  computed: {
    /**
     * Returns the classes of the image.
     * @returns {object}
     */
    classes() {
      return {
        'responsive-image--contain': this.fit === 'contain',
        'responsive-image--fit': this.fit === 'fit',
        'responsive-image--fill': this.fit === 'fill'
      }
    }
  }
}
</script>

<style lang="scss">
.responsive-image {
  $parent: &;
  background-color: $COLOR_BACKGROUND_LIGHT;
  display: block;
  overflow: hidden;
  position: relative;
  width: 100%;
  &__image {
    height: 100%;
    left: 0;
    object-fit: cover;
    position: absolute;
    top: 0;
    width: 100%;
  }
  &#{&}--contain {
    #{$parent}__image {
      object-fit: contain;
    }
  }
  &#{&}--fit {
    #{$parent}__image {
      object-fit: fit;
    }
  }
  &#{&}--fill {
    #{$parent}__image {
      object-fit: fill;
    }
  }
}
</style>
