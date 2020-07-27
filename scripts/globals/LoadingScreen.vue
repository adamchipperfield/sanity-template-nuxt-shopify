<template>
  <div class="loading-screen" :class="classes">
    <app-logo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AppLogo from '~/components/AppLogo'

export default {
  components: {
    AppLogo
  },

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
  align-items: center;
  background-color: $COLOR_BACKGROUND_WHITE;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  transition: opacity 0.4s ease-out;
  pointer-events: none;
  width: 100%;
  z-index: 12;

  .app-logo {
    height: 120px;
  }

  &.is-active {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
