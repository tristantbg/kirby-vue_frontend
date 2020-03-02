<template>
  <div class="container info">
    <section class="info__section">
      <div class="info__column">
        <img
          :src="information.portrait[0].url"
          class="info__about-img"
        >
        <div class="info__contact">
          <h3>Contact</h3>
          <p class="info__address">
            <span>{{ information.street }}</span>
            <span>{{ information.postcode }} {{ information.city }}</span>
            <span>{{ information.country }}</span>
          </p>
          <p class="info__communication">
            <span><a :href="'tel:' + information.phone">{{ information.phone }}</a></span>
            <span><a :href="'mailto:' + information.email">{{ information.email }}</a></span>
          </p>
        </div>
      </div>
      <div class="info__about">
        <h3>About</h3>
        <div v-html="wrapParagraphs(information.about)"/>
      </div>
    </section>
    <section class="info__section">
      <h3>Locations</h3>
      <div class="info__locations">
        <div
          v-for="(location, index) in information.locations"
          :key="index"
          class="info__location"
        >
          <h4 class="info__location-title-wrap">
            <span class="info__location-title">
              {{ location.name }}
            </span>
            <span
              v-if="location.new === '1'"
              class="info__location-new"
            >
              &nbsp;NEW!&nbsp;
            </span>
            <span class="info__location-date">{{ getDate(location) }}</span>
          </h4>
          <img
            :src="location.image[0].url"
            class="info__location-img"
          >
          <div
            class="info__location-desc"
            v-html="wrapParagraphs(location.about)"
          />
        </div>
      </div>
    </section>
    <section class="info__section">
      <h3>Selected Clients</h3>
      <div class="info__clients">
        <span
          v-for="(client, index) in information.clients"
          :key="index"
          v-html="client.client"
        />
      </div>
    </section>
    <section class="info__section">
      <h3>Legal Notice</h3>
      <div class="info__footer">
        <p
          class="info__legal"
          v-html="$store.state.meta.legal"
        />
        <p class="info__legal-address">
          <span>{{ information.legaltitle }}</span>
          <span>{{ information.street }}</span>
          <span>{{ information.postcode }} {{ information.city }}</span>
          <span>{{ information.country }}</span>
        </p>
        <p class="info__vat">VAT ID {{ information.ustid }}</p>
        <p
          class="info__credit"
          v-html="$store.state.meta.credit"
        />

      </div>
    </section>
  </div>
</template>

<script>
import Menu from '~/components/Menu.vue'
import snarkdown from 'snarkdown'

export default {
  name: 'Information',
  components: {
    Menu
  },
  computed: {
    information () {
      return this.$store.state.information
    },
    activeSlide () {
      return this.$store.state.activeSlide
    }
  },
  methods: {
    wrapParagraphs (text) {
      text = snarkdown(text)
      const paragraphs = text.split("<br />")
      const html = '<p>' + paragraphs.join('</p><p>') + '</p>';
      return html
    },
    getDate (location) {
      const fromYear =new Date(location.from).getFullYear()
      const untilYear = new Date(location.until).getFullYear()
      let date = fromYear ? fromYear : ''
      date += fromYear && untilYear && untilYear !== fromYear ? '\u200A—\u200A' : ''
      date += untilYear && untilYear !== fromYear ? untilYear : ''
      return date
    }
  }
}
</script>

<style lang="sass">
  .info
    background: $white
    padding: 54px $mp-d 0 $mp-d
    &__section
      display: flex
      flex-wrap: wrap
      justify-content: center
    &__about
      width: 50%
      white-space: pre-line
      padding: $lh-l 0 0 $mp-b
      p
        margin-bottom: $lh-l
      &-img
        width: 100%
        height: auto
        display: block
    &__column
      width: 50%
      padding: $lh-l $mp-b 0 0
    &__contact
      display: flex
      flex-wrap: wrap
      margin-top: $lh-l
      p
        span
          display: block
    &__address
      padding-right: $mp-b * 2
      padding-bottom: $lh-l
    &__communication
      padding-bottom: $lh-l
    &__locations
      display: flex
      margin: 0 $mp-b * -1 $lh-l $mp-b * -1
    &__location
      width: calc(100% / 4)
      padding: 0 $mp-b
      &-new
        color: $red
        @include fs-m()
      &-title-wrap
        display: flex
        align-items: baseline
      &-date
        margin-left: auto
      &-img
        width: 100%
        display: block
        margin-top: $lh-m/4
      &-date
        display: block
        margin-top: $lh-m/4
        @include fs-m()
      &-desc
        margin-top: $lh-m/2
        @include fs-m()
    &__clients
      margin-bottom: $lh-l
      span
        display: inline
        &:after
          content: ", "
        &:last-child:after
          content: ""
    &__footer
      margin-bottom: 25px
    &__legal
       margin-bottom: $lh-m
       @include fs-m()
       width: 66%
       &-address
        @include fs-m()
        margin-bottom: $lh-m
        span
          display: block
    &__credit, &__vat
      @include fs-m()
      margin-bottom: 0

  @media (max-width: $desktop-lg)
    .info
      &__locations
        flex-wrap: wrap
      &__location
        width: calc(100% / 2)
        &:first-child, &:nth-child(2)
          margin-bottom: $lh-l/2

  @media (max-width: $desktop)
    .info
      &__column
        width: 100%
        padding-right: 0
        display: flex
        align-items: flex-start
      &__about
        width: 100%
        padding-left: 0
        padding-right: 0
        &-img
          width: 50%
          padding-right: $mp-c/2
      &__contact
        padding-left: $mp-c/2
        margin-top: 0
        width: 50%
      &__communication
        padding-bottom: 0
      &__locations
        flex-wrap: wrap
      &__location
        width: 100%
        display: flex
        flex-wrap: wrap
        align-items: flex-start
        margin-bottom: $lh-l/2
        &:last-child
          margin-bottom: 0
        &-title-wrap
          width: 100%
        &-date
          margin-right: 50%
          padding-right: $mp-c/2
        &-img
          width: 50%
          padding-right: $mp-c/2
        &-desc
          padding-left: $mp-c/2
          margin-top: 0
          width: 50%
      &__legal
        width: 100%

  @media (max-width: $tablet-ls)
    .info
      padding-top: $lh-l-s
      &__column
        padding-top: 44px
      &__address
        padding-bottom: $lh-l-s
      &__communication
        padding-bottom: $lh-l-s
      &__about
        padding-top: 0
        p
          margin-bottom: $lh-l-s
        &-img
          padding-bottom: $lh-l-s
      &__locations
        margin-bottom: $lh-l-s
      &__location
        margin-bottom: $lh-m-s
      &__clients
        margin-bottom: $lh-l-s

  @media (max-width: $tablet-pt)
    .info
      &__address
        padding-right: $mp-c
      &__column
        flex-direction: column-reverse
        flex-wrap: wrap
      &__contact
        width: 100%
        padding-left: 0
      &__about
        &-img
          width: 100%
          padding-right: 0
      &__location
        &-date
          margin-right: 0
          padding-right: 0
        &-img
          width: 100%
          padding-right: 0
        &-desc
          margin-top: $lh-m-s/2
          padding-left: 0
          width: 100%

    @media (max-width: $phone-ls)
      .info
        padding-right: $mp-b
        padding-left: $mp-b
        &__contact
          @include fs-m()
        &__address
          padding-bottom: $lh-m-s
        &__about
          @include fs-m()
          p:not(:last-child)
            margin-bottom: $lh-m-s



</style>
