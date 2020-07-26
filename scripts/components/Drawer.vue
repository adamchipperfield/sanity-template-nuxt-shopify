<template>
  <div class="drawer" :class="classes">
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    namespace: {
      type: String,
      required: true,
      default: ''
    }
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      getDrawerByNamespace: 'drawers/getDrawerByNamespace'
    }),

    /**
     * Returns if the current drawer is active.
     * @returns {boolean}
     */
    isActive() {
      return this.getDrawerByNamespace(this.namespace)
        .isActive
    },

    /**
     * Returns the classes for the drawer.
     * @returns {object}
     */
    classes() {
      return {
        'is-active': this.isActive
      }
    }
  },

  watch: {
    isActive(value) {
      if (value) {
        this.$emit('open')
      }
    }
  }
}
</script>

<style lang="scss">
.drawer {
  background-color: $COLOR_BACKGROUND_WHITE;
  height: 100%;
  max-width: 450px;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  width: 100%;
  z-index: 12;

  &.is-active {
    transform: translateX(0);
  }
}
</style>
