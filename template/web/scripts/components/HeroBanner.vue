<template>
  <div class="hero-banner">
    <div class="container">
      <div class="row">
        <div class="col xs12 l8">
          <h1 v-if="title" class="hero-banner__title">
            {{ title }}
          </h1>

          <p
            v-if="content"
            class="hero-banner__content"
            v-html="content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.hero-banner {
  margin-top: $LAYOUT_S;

  &__content {
    margin-bottom: $SPACING_4XL;
  }

  @include mq($from: large) {
    margin-top: $LAYOUT_M;
  }
}
</style>
