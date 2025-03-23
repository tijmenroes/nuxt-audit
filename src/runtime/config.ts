export const DASHBOARD_COLUMNS = [
  {
    accessorKey: 'vital',
    header: 'Vital',
  },
  {
    accessorKey: 'average',
    header: 'Average',
  },
  {
    accessorKey: 'benchmarkScore',
    header: 'Benchmark Score',
  },
  {
    accessorKey: 'count',
    header: 'Count',
  },
  {
    accessorKey: 'min',
    header: 'Min',
  },
  {
    accessorKey: 'max',
    header: 'Max',
  },
]

// TODO: Add benchmarks for all vitals, right now just guesswork
export const BENCHMARKS: Record<
  string,
  { good: number, needsImprovement: number, poor: number }
> = {
  LCP: {
    good: 1750,
    needsImprovement: 2500,
    poor: 4000,
  },
  FID: {
    good: 100,
    needsImprovement: 300,
    poor: 500,
  },
  CLS: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: 0.5,
  },
  TTFB: {
    good: 1500,
    needsImprovement: 2500,
    poor: 4000,
  },
  INP: {
    good: 200,
    needsImprovement: 400,
    poor: 500,
  },
  FCP: {
    good: 1000,
    needsImprovement: 2000,
    poor: 3000,
  },
}
