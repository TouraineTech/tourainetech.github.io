import { readFileSync } from 'node:fs'
import { parse as parseYaml } from 'yaml'
import yaml from '@rollup/plugin-yaml'
import { speakers as SPEAKERS, talks as TALKS } from './api/generated/conferenceHall.json'
import DAYS from './api/config/days.json'
import ROOMS from './api/config/rooms.json'
import CONFIGURATION from './assets/configuration'

const SPONSORS = parseYaml(readFileSync('./api/sponsors.yaml', 'utf-8')) as Array<{ id: string }>

const title = `Touraine Tech 20${CONFIGURATION.eventEdition} - Conférence sur les nouvelles technologies du numérique`
const description = 'La conférence technique en région centre sur les nouvelles technologies du numérique'
const url = 'https://touraine.tech/'

export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',

  app: {
    head: {
      title,
      htmlAttrs: {
        lang: 'fr',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'google-site-verification', content: 'aloBwm93e88RJEH5XUhpIl9yuBphazWNYt6Al0PR7cM' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: description },
        { hid: 'ogtitle', property: 'og:title', content: title },
        { hid: 'ogdescription', property: 'og:description', content: description },
        { hid: 'ogtype', property: 'og:type', content: 'website' },
        { hid: 'ogurl', property: 'og:url', content: url },
        { hid: 'ogimage', property: 'og:image', content: url + 'logo.jpg' },
        { property: 'og:locale', content: 'fr_FR' },
        { hid: 'twittercard', name: 'twitter:card', content: 'summary' },
        { hid: 'twittersite', name: 'twitter:site', content: '@tourainetech' },
        { hid: 'twittertitle', name: 'twitter:title', content: title },
        { hid: 'twitterdescription', name: 'twitter:description', content: description },
        { hid: 'twitterimage', name: 'twitter:image', content: url + 'logo.jpg' },
        { hid: 'twitterimagealt', name: 'twitter:image:alt', content: 'Touraine tech logo' },
        { name: 'apple-mobile-web-app-title', content: 'Touraine Tech' },
        { name: 'application-name', content: 'Touraine Tech' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'apple-itunes-app', content: 'app-id=1599891078' },
        { name: 'google-play-app', content: 'app-id=to.chapi.tnt' },
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans&display=swap' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png?v=WGoYma5yEm' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png?v=WGoYma5yEm' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png?v=WGoYma5yEm' },
        { rel: 'manifest', href: '/site.webmanifest?v=WGoYma5yEm' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg?v=WGoYma5yEm', color: '#333333' },
        { rel: 'shortcut icon', href: '/favicon.ico?v=WGoYma5yEm' },
      ],
      script: [
        {
          defer: true,
          src: 'https://cloud.umami.is/script.js',
          'data-website-id': '61e0351a-e30c-43c4-8464-3a673ece80f7',
          'data-domains': 'touraine.tech',
        },
      ],
    },
  },

  css: [
    '~/assets/scss/main.scss',
    'smart-app-banner/dist/smart-app-banner.css',
  ],

  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],

  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  nitro: {
    output: {
      publicDir: 'dist',
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/schedule',
        '/speakers',
        '/coc',
        '/regie',
        ...SPONSORS.map((sponsor: { id: string }) => `/sponsor/${sponsor.id}/`),
        ...SPEAKERS.map((speaker: { uid: string }) => `/speaker/${speaker.uid}`),
        ...TALKS.filter((talk: { backup?: boolean }) => !talk.backup).map((talk: { id: string }) => `/talk/${talk.id}`),
        ...DAYS.map((day: string) => `/timer/${day}`),
        ...DAYS.flatMap((day: string) =>
          ROOMS.map((room: string) => `/timer/${day}/${room}`),
        ),
        ...DAYS.map((day: string) => `/waiting-screen/${day}`),
        ...DAYS.flatMap((day: string) =>
          ROOMS.map((room: string) => `/waiting-screen/${day}/${room}`),
        ),
      ],
    },
  },

  devtools: { enabled: true },
})
