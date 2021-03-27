<template>
  <component
    class="button"
    :class="classes"
    :is="element"
    :href="href"
    :to="to"
  >
    {{ label }}

    <span
      v-if="withArrow"
      class="button__arrow"
    >
      <icon-arrow-right />
    </span>
  </component>
</template>

<script>
import IconArrowRight from '@/assets/icons/direction-arrow-right.svg?inline'

export default {
  components: {
    IconArrowRight
  },

  props: {
    url: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    block: {
      type: Boolean,
      default: false
    },
    withArrow: {
      type: Boolean,
      default: false
    },
    asText: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * Returns the element condition.
     * - Based on link existence + link type.
     * @returns {string}
     */
    element() {
      if (this.url) {
        if (!this.isExternalLink(this.url)) {
          return 'n-link'
        }

        return 'a'
      }

      return 'button'
    },

    /**
     * Returns the `to` attribute value.
     * - Only returns if element is `n-link`.
     */
    to() {
      return this.element === 'n-link' ? this.url : false
    },

    /**
     * Returns the `href` attribute value.
     * - Only returns if element is `a`.
     */
    href() {
      return this.element === 'a' ? this.url : false
    },

    /**
     * Returns the classes.
     * @returns {object}
     */
    classes() {
      return {
        'button--block': this.block,
        'button--outlined': this.outlined,
        'button--as-text': this.asText,
        'button--with-arrow': this.withArrow
      }
    }
  },

  methods: {
    /**
     * Returns if the link is external.
     * @param {string} link - The link to test.
     * @returns {boolean}
     */
    isExternalLink(link) {
      const regex = /(mailto:|tel:|http(s):)/g
      return regex.test(link)
    }
  }
}
</script>

<style lang="scss">
.button {
  $parent: &;
  @include button-reset;
  align-items: center;
  cursor: pointer;
  background-color: $COLOR_BACKGROUND_DARK;
  border: 1px solid $COLOR_BACKGROUND_DARK;
  border-radius: 5px;
  color: $COLOR_TEXT_INVERSE;
  display: inline-flex;
  padding: $SPACING_M $SPACING_L;
  justify-content: center;
  transition: all 0.2s ease-out;

  &__arrow {
    align-items: center;
    display: flex;
    margin-left: $SPACING_S;
    transition: transform 0.2s ease-out;

    .icon {
      height: 20px;
      width: 20px;
    }
  }

  &#{&}--block {
    display: flex;
    width: 100%;
  }

  &#{&}--outlined {
    background-color: transparent;
    color: $COLOR_BACKGROUND_DARK;
  }

  &#{&}--with-arrow {
    justify-content: space-between;
  }

  &#{&}--as-text {
    color: $COLOR_TEXT_PRIMARY;
    border: 0;
    background-color: transparent;
    padding: 0;

    &:hover {
      #{$parent}__arrow {
        transform: translateX(25%);
      }
    }
  }

  &:hover {
    &:not(#{$parent}--as-text) {
      background-color: lighten($COLOR_BACKGROUND_DARK, 10%);

      &#{$parent}--outlined {
        background-color: $COLOR_BACKGROUND_DARK;
        color: $COLOR_TEXT_INVERSE;
      }
    }
  }
}
</style>
