<template>
  <div class="app-nav">
    <ul class="app-nav__menu">
      <li
        v-for="(item, index) in items"
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
export default {
  data() {
    return {
      items: [
        {
          label: 'Collections',
          url: '/'
        },
        {
          label: 'Blog',
          url: '/blogs/news'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.app-nav {
  &__menu {
    @include list-reset;
    display: flex;
  }

  &__item {
    position: relative;
  }

  &__link {
    margin-right: $SPACING_XL;
  }
}
</style>
