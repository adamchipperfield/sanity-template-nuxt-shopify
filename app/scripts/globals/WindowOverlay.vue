<template>
  <div
    class="window-overlay"
    :class="classes"
    @click="handleClickEvent"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      isActive: this.hasActiveDrawer
    }
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      getAllDrawers: 'drawers/getAllDrawers'
    }),

    /**
     * Returns if a drawer is open.
     * @returns {boolean}
     */
    hasActiveDrawer() {
      return this.getAllDrawers.find(({ isActive }) => isActive)
    },

    /**
     * Returns the dynamic classes.
     * @returns {object}
     */
    classes() {
      return {
        'is-active': this.isActive
      }
    }
  },

  watch: {
    hasActiveDrawer(value) {
      const timeout = value ? 0 : 50

      setTimeout(() => {
        this.isActive = value
      }, timeout)
    }
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeAllDrawers: 'drawers/closeAllDrawers'
    }),

    /**
     * Handles the overlay click event.
     */
    handleClickEvent() {
      this.closeAllDrawers()
    }
  }
}
</script>

<style lang="scss">
.window-overlay {
  background-color: $COLOR_BACKGROUND_DARK;
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  transition: opacity .4s ease-in-out;
  width: 100%;
  z-index: 12;

  &.is-active {
    opacity: 0.5;
    pointer-events: auto;
  }
}
</style>
