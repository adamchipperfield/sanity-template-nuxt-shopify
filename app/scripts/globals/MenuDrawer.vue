<template>
  <drawer namespace="menu" is-left>
    <div class="menu-drawer">
      <ul class="menu-drawer__menu">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-drawer__item"
        >
          <n-link class="menu-drawer__link" :to="item.url">
            {{ item.label }}
          </n-link>
        </li>
      </ul>
    </div>
  </drawer>
</template>

<script>
import { mapGetters } from 'vuex'

import Drawer from '~/components/Drawer'

export default {
  components: {
    Drawer
  },

  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      menuItems: 'getMenuItems'
    })
  }
}
</script>

<style lang="scss">
.menu-drawer {
  &__menu {
    @include list-reset;
    margin-top: $SPACING_3XL;
  }

  &__link {
    display: block;
    font-size: ms(1);
    padding: $SPACING_2XS $SPACING_3XL;
  }
}
</style>
