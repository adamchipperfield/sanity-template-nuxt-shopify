const path = require('path')

const root = path.resolve(__dirname, './')
const generate = require('./scripts/plugins/nuxt/generate-routes')

export default async () => {
  const routes = await generate()

  return {
    target: 'static',
  
    modules: [
      '@nuxtjs/style-resources',
      '@nuxtjs/svg',
      'nuxt-i18n'
    ],
  
    buildModules: [
      '@nuxtjs/apollo'
    ],
  
    plugins: [
      { src: '~/scripts/plugins/vue/vuex-persistedstate', mode: 'client' },
      { src: '~/scripts/plugins/vue/vue-async-computed' },
      { src: '~/scripts/plugins/vue/filters' },
      { src: '~/scripts/plugins/vue/lazysizes', mode: 'client' },
      { src: '~/scripts/plugins/vue/localize' }
    ],
  
    styleResources: {
      scss: ['@/styles/config/*.scss']
    },
  
    build: {
      analyze: true,
      extend(config, { isClient, loaders: { vue } }) {
        config.resolve.alias['~'] = path.join(root, 'scripts')
        config.node = { fs: 'empty' }
  
        if (isClient) {
          vue.transformAssetUrls.img = ['data-src', 'src']
          vue.transformAssetUrls.source = ['data-srcset', 'srcset']
        }
      }
    },

    generate: {
      crawler: false,
      routes
    },

    babel: {
      plugins: ['@babel/plugin-proposal-optional-chaining']
    },
  
    apollo: {
      clientConfigs: {
        shopify: '~/plugins/shopify/client',
        sanity: '~/plugins/sanity/client'
      }
    },

    i18n: {
      locales: ['en-GB'],
      defaultLocale: 'en-GB',
      vueI18n: {
        fallbackLocale: 'en-GB',
        messages: {
          'en-GB': require(`./locales/en-GB.json`)
        }
      }
    },
  
    router: {
      middleware: ['page-change']
    },
  
    head: {
      title: 'App Title',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'description',
          content: 'App description'
        }
      ]
    }
  }
}
