<template>
  <div class="gallery__wrapper">
    <div :style="{background: $store.state.colors[0]}" class="gallery__bg"/>
    <transition name="fade">
      <template v-for="(layout, index) in layouts">
        <div
          v-if="index === activeSlide"
          :key="index"
          class="gallery__slide"
        >
          <div
            v-if="layout.images"
            :class="[imageCount(layout.images), layout.sizing]"
            :style="{background: layout.background}"
            class="gallery__grid"
          >
            <template v-for="(image, index) in layout.images">
              <img
                v-if="image.type === 'image'"
                :key="index"
                :src="image.url"
              >
              <video
                v-else-if="image.type === 'video'"
                id="video"
                ref="video"
                :key="index"
                :poster="image.poster"
                autoplay
                muted
                loop
                playsinline
                preload="auto"
                class="gallery__video"
              >
                <source :src="image.url" type="video/mp4">
              </video>
            </template>
          </div>
        </div>
      </template>
    </transition>
    <div v-touch:swipe.left="next" v-touch:swipe.right="prev" v-touch:tap="prev" class="gallery__prev"/>
    <div v-touch:swipe.left="next" v-touch:swipe.right="prev" v-touch:tap="next" class="gallery__next"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Slideshow",
  data () {
    return {
      timer: null
    }
  },
  computed: {
    layouts () {
      return this.$store.state.home.layouts
    },
    activeSlide () {
      return this.$store.state.activeSlide
    },
    nextImages () {
      if (this.activeSlide < this.layouts.length - 1) {
        return this.layouts[this.activeSlide + 1].images
      } else {
        return this.layouts[0].images
      }
    },
    prevImages () {
      if (this.activeSlide > 0) {
        return this.layouts[this.activeSlide - 1].images
      } else {
        return this.layouts[this.layouts.length - 1].images
      }
    }
  },
  mounted () {
    window.addEventListener('keyup', this.keyListener)
    this.preloadImages(this.nextImages.concat(this.prevImages))
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.keyListener)
  },
  methods: {
    ...mapMutations(['setSlide', 'nextColor', 'prevColor']),
    imageCount (images) {
      const amount = images.length
      if (amount > 1) {
        return 'images-' + amount
      } else {
        return 'solo'
      }
    },
    preloadImages (images) {
      const newImages = []
      images.forEach((image, index) => {
        newImages[index] = new Image()
        newImages[index].src = image.url
      })
    },
    async next () {
      this.nextColor()
      if(this.activeSlide < this.layouts.length - 1) {
        this.setSlide(this.activeSlide + 1)
      } else {
        this.setSlide(0)
      }
      this.preloadImages(this.nextImages)
    },
    async prev () {
      this.prevColor()
      if(this.activeSlide === 0) {
        this.setSlide(this.layouts.length - 1)
      } else {
        this.setSlide(this.activeSlide - 1)
      }
      this.preloadImages(this.prevImages)
    },
    keyListener (evt) {
      if (evt.keyCode === 37) {
        this.prev()
      } else if (evt.keyCode === 39) {
        this.next()
      }
    },
  }
}
</script>

<style lang="sass">
  .gallery
    &__next
      width: 50%
      height: 100%
      position: fixed
      top: 0
      right: 0
      z-index: 50
      @include pointer()
      @include tap()
    &__prev
      width: 50%
      height: 100%
      position: fixed
      top: 0
      left: 0
      z-index: 50
      @include pointer()
      @include tap()
    &__slide
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
    &__bg
      width: 100%
      height: 100%
      position: fixed
      top: 0
      left: 0
      z-index: -1
      @include bg-transition()
    &__grid
      width: 100%
      height: 100%
      display: flex
      img, video
        height: 100%
        width: 100%
        object-fit: cover
        object-position: 50% 40%
      video
        -webkit-border-radius: 1px
      &.cover
        img, video
          object-fit: cover
          object-position: 50% 40%
      &.contain
        img, video
          object-fit: contain
          object-position: 50% 50%
      &.images-2
        img, video
          width: 50%
          &:first-child
            object-position: 66.66% 50%
          &:last-child
            object-position: 33.33% 50%

  @media (max-width: $tablet-ls)
    .gallery
      &__grid
        flex-direction: column
        &.contain
          img, video
            object-fit: cover
            object-position: 50% 40%
        &.images-2
          img, video
            width: 100%
            height: 50%
            &:first-child
              object-position: 50% 100%
            &:last-child
              object-position: 50% 0%
          &.contain
            img, video
              &:first-child
                object-fit: contain
                padding-bottom: $mp-c/2
              &:last-child
                object-fit: contain
                padding-top: $mp-c/2

</style>

