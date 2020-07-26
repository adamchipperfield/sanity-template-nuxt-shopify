<template>
  <div class="checkout">
    <h1 class="visually-hidden">{{ $t('checkout.general.title') }}</h1>
    
    <div class="container">
      <div class="row">
        <div class="col xs12">
          <h2>{{ $t('checkout.general.redirecting') }}</h2>
        </div>
      </div>
    </div>
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
      checkoutUrl: 'checkout/getCheckoutUrl'
    })
  },

  mounted() {
    this.handleCheckoutRedirect()
  },

  methods: {
    /**
     * Handles the checkout redirect.
     */
    handleCheckoutRedirect() {
      if (this.checkoutUrl) {
        window.location.href = this.checkoutUrl
      }
    }
  },

  watch: {
    checkoutUrl() {
      this.handleCheckoutRedirect()
    }
  }
}
</script>
