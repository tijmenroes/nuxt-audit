export interface ErrorItem {
  timestamp: string
  page: string
  message: string
  details?: any
}

export interface WebVitalsItem {
  timestamp: string
  page: string
  vital: string
  value: number
}

export interface WebVitalsStat {
  vital: string
  average: number
  benchmarkScore: string
  count: number
  min: number
  max: number
}

export interface WebVitalsResponse {
  [page: string]: {
    [vitalName: string]: WebVitalsItem[]
  }
}

export interface ErrorResponse {
  errors: ErrorItem[]
}
