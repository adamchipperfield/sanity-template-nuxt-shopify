<template>
  <div ref="drawer" class="drawer" :class="classes">
    <slot />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    namespace: {
      type: String,
      required: true,
      default: ''
    },
    isLeft: {
      type: Boolean,
      default: false
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
        'is-active': this.isActive,
        'drawer--left': this.isLeft
      }
    }
  },

  watch: {
    isActive(value) {
      if (value) {
        this.$emit('open')
      }
    }
  },

  mounted() {
    this.setClickEventListeners()
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      closeDrawer: 'drawers/closeDrawer'
    }),

    /**
     * Sets the event listeners.
     */
    setClickEventListeners() {
      [...this.$refs.drawer.querySelectorAll('a[href]')].forEach((element) => {
        element.addEventListener('click', this.handleAnchorEvent)
      })
    },

    /**
     * Handles the anchor click event.
     * - Closes the drawer.
     */
    handleAnchorEvent() {
      this.closeDrawer(this.namespace)
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
  width: 90%;
  z-index: 12;

  &#{&}--left {
    left: 0;
    right: unset;
    transform: translateX(-100%);
  }

  &.is-active {
    transform: translateX(0);
  }
}
</style>
