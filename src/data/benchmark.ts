import type { BenchmarkConfig, BenchmarkRow, ResultSet } from './types'

/**
 * Example starting points for the explorer. They are inputs, not recorded runs.
 * Models are left unset until a real configuration is chosen.
 */
export const benchmarkConfigs: BenchmarkConfig[] = [
  {
    id: 'a',
    label: 'Configuration A',
    params: { chunkSize: 512, chunkOverlap: 64, topK: 3, embeddingModel: null, generationModel: null },
  },
  {
    id: 'b',
    label: 'Configuration B',
    params: { chunkSize: 1024, chunkOverlap: 128, topK: 5, embeddingModel: null, generationModel: null },
  },
]

const emptyValues = { retrieval: null, answer: null, faithfulness: null, latency: null, cost: null }

/** Recorded benchmark results. Fill with real values, set status 'measured', and name the `source`. */
export const benchmarkResults: ResultSet<BenchmarkRow> = {
  status: 'empty',
  rows: [
    { configId: 'a', values: { ...emptyValues } },
    { configId: 'b', values: { ...emptyValues } },
  ],
}

/** Illustrative values to show the comparison view. Not measurements. */
export const benchmarkDemo: ResultSet<BenchmarkRow> = {
  status: 'demo',
  rows: [
    { configId: 'a', values: { retrieval: 62.0, answer: 70.0, faithfulness: 80.0, latency: 850, cost: 1.0 } },
    { configId: 'b', values: { retrieval: 71.0, answer: 74.0, faithfulness: 86.0, latency: 1250, cost: 1.9 } },
  ],
}
