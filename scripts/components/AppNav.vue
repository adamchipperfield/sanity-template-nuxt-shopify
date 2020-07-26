<template>
  <div class="app-nav">
    <n-link class="app-nav__item" to="/collections/frontpage">
      Mens
    </n-link>

    <n-link class="app-nav__item" to="/collections/new-in">
      New In
    </n-link>

    <n-link class="app-nav__item" to="/blogs/news">
      Blog
    </n-link>
  </div>
</template>

<style lang="scss">
.app-nav {
  &__item {
    margin-right: $SPACING_XL;
  }
}
</style>
