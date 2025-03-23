import type { ErrorItem } from '../../types'
import { defineEventHandler, useStorage, getQuery } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage('errors')
  const query = getQuery(event)
  const page = query.page as string
  const errors = (await storage.getItem('errors') || []) as ErrorItem[]

  const filteredErrors = page
    ? errors.filter(entry => entry.page === page)
    : errors

  return {
    errors: filteredErrors,
  }
})
