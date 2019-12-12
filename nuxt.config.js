import SPONSORS from './api/sponsors.json'
import {speakers as SPEAKERS, talks as TALKS, categories, formats} from "./api/conferenceHall";

const pkg = require('./package')
const title = 'Touraine Tech 2020 - Conférence sur les nouvelles technologie du numérique'
const description = 'La conférence technique en région centre sur les nouvelles technologies du numérique'
const url = "https://touraine.tech/"
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: title,
    // this htmlAttrs you need
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'google-site-verification', content: 'aloBwm93e88RJEH5XUhpIl9yuBphazWNYt6Al0PR7cM'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: description},
      {hid: 'ogtitle', property: 'og:title', content: title},
      {hid: 'ogdescription', property: 'og:description', content: description},
      {hid: 'ogtype', property: 'og:type', content: 'website'},
      {hid: 'ogurl', property: 'og:url', content: url},
      {hid: 'ogimage', property: 'og:image', content: url + 'logo.jpg'},
      {property: 'og:locale', content: 'fr_FR'},
      // Twitter Card
      {hid: 'twittercard', name: 'twitter:card', content: 'summary'},
      {hid: 'twittersite', name: 'twitter:site', content: '@tourainetech'},
      {hid: 'twittertitle', name: 'twitter:title', content: title},
      {hid: 'twitterdescription', name: 'twitter:description', content: description},
      {hid: 'twitterimage', name: 'twitter:image', content: url + 'logo.jpg'},
      {hid: 'twitterimagealt', name: 'twitter:image:alt', content: 'Touraine tech logo'},
      {name: 'apple-mobile-web-app-title', content: 'Touraine Tech'},
      {name: 'application-name', content: 'Touraine Tech'},
      {name: 'msapplication-TileColor', content: '#ffffff'},
      {name: 'theme-color', content: '#ffffff'}
    ],
    link: [

      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans&display=swap'},
      {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=WGoYma5yEm'},
      {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=WGoYma5yEm'},
      {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=WGoYma5yEm'},
      {rel: 'manifest', href: '/site.webmanifest?v=WGoYma5yEm'},
      {rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=WGoYma5yEm', color: '#333333'},
      {rel: 'shortcut icon', href: '/favicon.ico?v=WGoYma5yEm'}

    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#222333'},

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/main.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/smoothscroll-polyfill.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    //'@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
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
    }
  },

  generate: {
    routes: function () {
      return [
        ...SPONSORS.map(sponsor => `/sponsor/${sponsor.id}/`),
        ...SPEAKERS.map(speaker => `/speaker/${speaker.displayName}`),
        ...TALKS.filter(({backup}) => !backup).map(talk => `/talk/${talk.id}`)
      ]
    }
  }
}

