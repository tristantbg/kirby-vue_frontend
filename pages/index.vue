<template>
  <div class="container">
    <Slideshow/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Slideshow from '~/components/Slideshow.vue'

export default {
  name: "Index",
  components: {
    Slideshow
  },
  mounted () {
    let img = new Image()
    img.src = this.$store.state.information.portrait[0].url
  }
}
</script>

<style lang="sass">

</style>
