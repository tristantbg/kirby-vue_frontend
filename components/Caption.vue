<template>
  <div
    :style="{color: layouts[activeSlide].color}"
    class="caption"
  >
    <transition-group name="fadefast">
      <template v-if="$route.name === 'index'">
        <template v-for="(layout, index) in layouts">
          <span
            v-if="index === activeSlide"
            :key="index"
          >
            {{ layout.caption }}
          </span>
        </template>
      </template>
      <span
        v-else
        key="close"
        class="info__close"
      >
        <nuxt-link
          to="/"
        >
          Close
        </nuxt-link>
      </span>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Caption',
  props: {
    layouts: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    activeSlide () {
      return this.$store.state.activeSlide
    }
  }
}
</script>

<style lang="sass" scoped>
  .info__close
    color: $black!important
    @include tap()
    @include pointer()
  .caption
    pointer-events: auto
    flex-grow: 1
    text-align: right
    @include color-transition()
    @include fs-m()
    span
      top: 30px
      right: $mp-d

  @media (max-width: $tablet-ls)
    .caption
      span
        top: 26px

  @media (max-width: $phone-ls)
    .caption
      flex-grow: 0
      margin-top: auto
      span
        top: auto
        bottom: 20px
        right: auto
        &.info__close
          display: none

</style>
