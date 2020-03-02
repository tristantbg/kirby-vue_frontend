const webpack = require('webpack')

module.exports = {
  mode: 'universal',
  head: {
    title: 'Site title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'google-site-verification', content: '' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      // { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      // { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' },
      // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
      // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
      // { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#fd5f00' },
      // { rel: 'shortcut icon', href: '/favicon/favicon.ico' },
      // { rel: 'manifest', href: '/favicon/site.webmanifest' },
    ]
  },
  loading: false,
  plugins: [
    {src: '~/plugins/axios.js', ssr: true},
    {src: '~/plugins/vue2-touch-events.js', ssr: false}
  ],
  css: [
    '~/assets/sass/global.sass'
  ],
  modules: [
    // 'nuxt-ssr-cache',
    '@nuxtjs/sitemap',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  cache: {
    pages: [
      '/'
    ],
  },
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'https://backend.test/rest' : 'https://backend.com/rest',
  },
  styleResources: {
    sass: ['@/assets/sass/variables.sass'],
  },
  build: {
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '_.shuffle': ['lodash', 'shuffle'],
        '_.find': ['lodash', 'find']
      })
    ]
  }
}
