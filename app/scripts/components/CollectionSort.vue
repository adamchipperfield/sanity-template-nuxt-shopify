<template>
  <div class="collection-sort">
    <select @change="handleChangeEvent">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        :selected="option.value === selected"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    /**
     * Maps the Vuex getters.
     */
    ...mapGetters({
      options: 'collection/getSortByOptions',
      selected: 'collection/getSortBySelected'
    })
  },

  methods: {
    /**
     * Maps the Vuex actions.
     */
    ...mapActions({
      setSelected: 'collection/setSortBySelected'
    }),

    /**
     * Handles the selected change event.
     * - Updates the collection state.
     */
    handleChangeEvent(event) {
      this.setSelected(event.target.value)
    }
  }
}
</script>
