<template>
  <div class="container">
    <div class="layout">
      <div class="main-content">
        <div class="header">
          <h1>Nuxt audit Dashboard</h1>
        </div>

        <div
          v-if="isLoading"
          class="loading"
        >
          <div class="progress-bar" />
        </div>

        <div v-else>
          <h2>Web Vitals</h2>
          <div v-if="webVitals">
            <div>
              <label for="page-select">Select page</label>
              {{ currentPage }}
              <select
                id="page-select"
                v-model="currentPage"
              >
                <option
                  v-for="option in pagesOptions"
                  :key="option"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
            <table>
              <thead>
                <tr>
                  <th
                    v-for="col in DASHBOARD_COLUMNS"
                    :key="col.accessorKey"
                  >
                    {{ col.header }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="row in vitalsData"
                  :key="row.vital"
                >
                  <td>{{ row.vital }}</td>
                  <td>{{ row.average }}</td>
                  <td>
                    <span :class="['badge', getBadgeClass(row.benchmarkScore)]">
                      {{ row.benchmarkScore }}
                    </span>
                  </td>
                  <td>{{ row.count }}</td>
                  <td>{{ row.min }}</td>
                  <td>{{ row.max }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            v-else
            class="no-data"
          >
            <div class="alert">
              <h4>No Data</h4>
              <p>No web vitals data available</p>
            </div>
          </div>

          <div>
            <h2>Errors</h2>
            <table v-if="errorList.length">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Page</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(error, index) in errorList"
                  :key="index"
                >
                  <td>{{ error.timestamp }}</td>
                  <td>{{ error.page }}</td>
                  <td>{{ error.message }}</td>
                </tr>
              </tbody>
            </table>

            <div v-else>
              <div>
                <h4>No Data</h4>
                <p>No errors data available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { DASHBOARD_COLUMNS, BENCHMARKS } from '../config'
import type { WebVitalsResponse, ErrorResponse, ErrorItem, WebVitalsItem } from '../types'

const isLoading = ref(true)
const webVitals = ref<WebVitalsResponse | null>(null)
const errorList = ref<ErrorItem[]>([])
const pages = computed(() =>
  webVitals.value ? Object.keys(webVitals.value) : [],
)
const pagesOptions = computed(() => [...pages.value, 'All'])
const currentPage = ref('All')

function getVitals(page: string) {
  if (!webVitals.value || !webVitals.value[page]) return []
  return webVitals.value[page]
}

function getBadgeClass(score: string | undefined) {
  if (!score) return ''
  switch (score) {
    case 'good':
      return 'success'
    case 'needsImprovement':
      return 'warning'
    case 'poor':
      return 'error'
    default:
      return ''
  }
}

const vitalsData = computed(() => {
  if (!webVitals.value || !currentPage.value) return []

  let data = {}
  if (currentPage.value === 'All') {
    let fullData = {}
    pages.value.forEach((page) => {
      fullData = { ...fullData, ...getVitals(page) }
    })
    data = fullData
  }
  else {
    data = getVitals(currentPage.value)
  }

  return Object.keys(data).map(vital => ({
    vital,
    ...calculateStats(data, vital),
  }))
})

function getBenchmarkScore(vital: string, value: number) {
  const benchmark = BENCHMARKS[vital]
  if (!benchmark) return null
  if (value <= benchmark.good) return 'good'
  if (value <= benchmark.needsImprovement) return 'needsImprovement'
  return 'poor'
}

function formatValue(value: number) {
  return value ? value.toFixed(2) : 0
}

function calculateStats(dataset: Record<string, WebVitalsItem[]>, vital: string) {
  const measurements = dataset[vital]
  if (!measurements || !measurements.length) {
    return {}
  }

  const values = measurements
    .map((m: WebVitalsItem) => m.value)
    .sort((a: number, b: number) => a - b)
  const sum = values.reduce((a: number, b: number) => a + b, 0)

  const average = sum / values.length
  const benchmarkScore = getBenchmarkScore(vital, average)
  return {
    id: vital,
    average: formatValue(average),
    benchmarkScore,
    count: values.length,
    min: formatValue(values[0]),
    max: formatValue(values[values.length - 1]),
  }
}

onMounted(async () => {
  const data = await $fetch<WebVitalsResponse>('/api/get-vitals')
  if (Object.keys(data).length) {
    webVitals.value = data
  }

  const errors = await $fetch<ErrorResponse>('/api/get-errors')
  if (errors.errors.length) {
    errorList.value = errors.errors
  }
  isLoading.value = false
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.layout {
  display: flex;
  gap: 20px;
}

.main-content {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}

select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}

.loading {
  text-align: center;
  padding: 48px 0;
}

.progress-bar {
  width: 50%;
  height: 4px;
  margin: 0 auto;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar::after {
  content: '';
  display: block;
  width: 40%;
  height: 100%;
  background: #4CAF50;
  animation: progress 1s infinite linear;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: bold;
  background: #f5f5f5;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.badge.success {
  background: #E8F5E9;
  color: #2E7D32;
}

.badge.warning {
  background: #FFF3E0;
  color: #F57C00;
}

.badge.error {
  background: #FFEBEE;
  color: #C62828;
}

.no-data {
  text-align: center;
  padding: 48px 0;
}

.alert {
  background: #FFF3E0;
  border: 1px solid #FFE0B2;
  border-radius: 4px;
  padding: 20px;
  display: inline-block;
}

.alert h4 {
  margin: 0 0 8px;
  color: #F57C00;
}

.alert p {
  margin: 0;
  color: #666;
}

@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}
</style>
