<template>
  <div class="app-nav">
    <ul class="app-nav__menu">
      <li
        v-for="(item, index) in menuItems"
        :key="index"
        class="app-nav__item"
      >
        <n-link class="app-nav__link" :to="item.url">
          {{ item.label }}
        </n-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
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
.app-nav {
  &__menu {
    @include list-reset;
    display: flex;
  }

  &__link {
    margin-right: $SPACING_XL;
  }
}
</style>
