<template>
  <div class="layout">
    <window-overlay />
    <app-header />
    <nuxt class="layout__main" />
    <app-footer />

    <menu-drawer />
    <cart-drawer />
  </div>
</template>

<script>
import AppFooter from '~/globals/AppFooter'
import AppHeader from '~/globals/AppHeader'
import CartDrawer from '~/globals/CartDrawer'
import MenuDrawer from '~/globals/MenuDrawer'
import WindowOverlay from '~/globals/WindowOverlay'

export default {
  components: {
    AppFooter,
    AppHeader,
    CartDrawer,
    MenuDrawer,
    WindowOverlay
  },

  mounted() {
    /**
     * Enable keyboard tabbing.
     */
    document.addEventListener('keydown', ({ keyCode }) => {
      if (event.keyCode !== 9) {
        return
      }

      document.body.classList.add('is-tabbable')
    })
  }
}
</script>

<style lang="scss">
@import '@/styles/app';
</style>
