import type { WebVitalsItem, WebVitalsResponse } from '../../types'
import { defineEventHandler, getQuery, useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = query.page as string

  const storage = useStorage('web-vitals')
  const vitalsPerPage: WebVitalsResponse = {}

  const keys = await storage.getKeys('web-vitals')

  for (const key of keys) {
    const [, keyPage, vitalName] = key.split(':')

    // Skip if page param provided and doesn't match
    if (page && keyPage !== page) {
      continue
    }

    const data = await storage.getItem(key) as WebVitalsItem[]
    if (!vitalsPerPage[keyPage]) {
      vitalsPerPage[keyPage] = {}
    }
    vitalsPerPage[keyPage][vitalName] = data
  }

  return vitalsPerPage
})
