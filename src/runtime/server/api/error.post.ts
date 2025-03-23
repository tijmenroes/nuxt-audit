import type { ErrorItem } from '../../types'
import { defineEventHandler, readBody, useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const storage = useStorage('errors')

  const logEntry: ErrorItem = {
    timestamp: new Date().toISOString(),
    page: body.page || 'unknown',
    message: body.message,
    details: body.details,
  }

  const existingLogs = (await storage.getItem('errors') || []) as ErrorItem[]

  // Keep last 100 logs
  const updatedLogs = [...existingLogs, logEntry].slice(-100)
  await storage.setItem('errors', updatedLogs)

  return {
    status: 'ok',
  }
})
