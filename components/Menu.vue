<template>
  <div>
    <nuxt-link
      v-if="$route.name === 'index'"
      :style="{color: color}"
      to="/information"
      class="title"
    >
      {{ $store.state.meta.title }}
    </nuxt-link>
    <nuxt-link
      v-else
      to="/"
      class="title"
    >
      {{ $store.state.meta.title }}
    </nuxt-link>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Menu',
  props: {
    color: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    ...mapMutations(['isActive'])
  }
}
</script>

<style lang="sass">
  .title
    @include page-transition()
    @include tap()
    @include pointer()
</style>


