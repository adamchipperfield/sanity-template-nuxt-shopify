<template>
  <div class="loading-screen" :class="classes"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      isHydrated: 'isHydrated'
    }),

    /**
     * Returns the dynamic classes.
     * @returns {object}
     */
    classes() {
      return {
        'is-active': !this.isHydrated
      }
    }
  }
}
</script>

<style lang="scss">
.loading-screen {
  background-color: $COLOR_BACKGROUND_WHITE;
  height: 100%;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.4s ease-out;
  pointer-events: none;
  width: 100%;
  z-index: 12;

  &.is-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
