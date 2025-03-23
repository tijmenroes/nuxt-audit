import { defineEventHandler, readBody } from 'h3'
import { useStorage } from '#imports'

interface WebVitalMeasurement {
  value: number
  id: string
  timestamp: number
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (body.path.includes('nuxt-audit')) {
    return {
      status: 'ok',
    }
  }

  const path = formatPath(body.path || 'unknown')
  const storageKey = `web-vitals:${path}:${body.name}`
  const storage = useStorage('web-vitals')

  const existingData = (await storage.getItem(storageKey) || []) as WebVitalMeasurement[]

  const updatedData = [...existingData, {
    value: body.value,
    id: body.id,
    timestamp: Date.now(),
  }]

  if (updatedData.length > 20) {
    updatedData.shift()
  }

  await storage.setItem(storageKey, updatedData)

  return {
    status: 'ok',
  }
})

function formatPath(path: string) {
  if (path === '/') {
    return 'home'
  }

  return path.replace(/^\//, '')
}
