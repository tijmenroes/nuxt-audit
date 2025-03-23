import { defineNuxtModule, addPlugin, createResolver, installModule, addServerHandler, extendPages } from '@nuxt/kit'

export interface ModuleOptions {
  enabled: boolean
  dashboard: boolean
  webVitals: {
    disabled: boolean
    debug?: boolean
    api: {
      url: string
    }
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-audit',
    configKey: 'nuxtAudit',
  },
  defaults: {
    enabled: true,
    dashboard: true,
    webVitals: {
      disabled: false,
      debug: false,
      api: {
        url: '/api/log-vital',
      },
    },
  },
  async setup(options, nuxt) {
    if (!options.enabled) {
      return
    }
    const resolver = createResolver(import.meta.url)

    nuxt.options.modules.push('@nuxtjs/web-vitals')

    await installModule('@nuxtjs/web-vitals', options.webVitals)

    addServerHandler({
      route: '/api/log-vital',
      handler: resolver.resolve('./runtime/server/api/vital.post'),
    })

    addServerHandler({
      route: '/api/get-vitals',
      handler: resolver.resolve('./runtime/server/api/vital.get'),
    })

    if (options.dashboard) {
      extendPages((pages) => {
        pages.push({
          name: 'audit-overview',
          path: '/nuxt-audit/audit-overview',
          file: resolver.resolve('./runtime/pages/audit-overview.vue'),
        })
      })
    }

    addServerHandler({
      route: '/api/log-error',
      handler: resolver.resolve('./runtime/server/api/error.post'),
    })

    addServerHandler({
      route: '/api/get-errors',
      handler: resolver.resolve('./runtime/server/api/error.get'),
    })

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
