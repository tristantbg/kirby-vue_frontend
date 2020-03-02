<template>
  <div class="wrapper">
    <div
      :style="{position: $route.name === 'index' ? 'fixed' : 'absolute'}"
      class="header"
    >
      <Menu
        :color="layouts[activeSlide].color"
      />
      <Caption
        :layouts="layouts"
      />
    </div>
    <nuxt/>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue'
import Caption from '../components/Caption.vue'

export default {
  name: 'Default',
  components: {
    Menu,
    Caption
  },
  computed: {
    layouts () {
      return this.$store.state.home.layouts
    },
    activeSlide () {
      return this.$store.state.activeSlide
    },
    tags () {
      const keywords = this.$store.state.meta.tags
      const tags = []
      keywords.forEach((keyword, index) => {
        tags.push(keyword.value)
      })
      return tags.join(', ')
    }
  },
  head() {
    return {
      title: this.$store.state.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.$store.state.meta.metadescription },
        { hid: 'keywords', name: 'keywords', content: this.tags }
      ]
    }
  }
}
</script>

<style lang="sass">
  .header
    position: absolute
    top: 0
    padding: $mp-b $mp-d
    width: 100%;
    display: flex
    align-items: baseline
    z-index: 90
    pointer-events: none
    div:first-child
      pointer-events: auto
      margin-right: $mp-c * 2

  @media (max-width: $phone-ls)
    .header
      height: 100%
      padding-right: $mp-b
      padding-left: $mp-b
      flex-direction: column
      align-items: flex-start

</style>

