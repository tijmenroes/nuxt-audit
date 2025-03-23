import { defineNuxtPlugin, useRoute } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute()

  nuxtApp.hook('app:error', async (error: unknown) => {
    await $fetch('/api/log-error', {
      method: 'POST',
      body: {
        type: 'error',
        page: route.path,
        message: error instanceof Error ? error.message : String(error),
        details: error,
      },
    })
  })

  nuxtApp.vueApp.config.errorHandler = (err: unknown, instance, info) => {
    void $fetch('/api/log-error', {
      method: 'POST',
      body: {
        type: 'error',
        page: route.path,
        message: err instanceof Error ? err.message : String(err),
        details: {
          error: err,
          info,
          component: instance?.$options?.name,
        },
      },
    })
  }
})
