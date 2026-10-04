import type { BenchmarkConfig, BenchmarkRow, ResultSet } from './types'

/**
 * Retrieval benchmark configurations from AWS-AI-Generative.
 * These match the three configurations evaluated in evaluation/retrieval_benchmark.py.
 * Embedding: MockEmbeddingClient (deterministic, hash-based, non-semantic, 256-dim).
 * Corpus: 6 AWS documentation files under examples/rag/data/documents/.
 * Dataset: 18 questions from evaluation/dataset/rag_benchmark.json.
 */
export const benchmarkConfigs: BenchmarkConfig[] = [
  {
    id: 'small',
    label: 'Small chunks',
    params: { chunkSize: 400, chunkOverlap: 60, topK: 2, embeddingModel: 'MockEmbeddingClient (256-dim)', generationModel: null },
  },
  {
    id: 'balanced',
    label: 'Balanced',
    params: { chunkSize: 800, chunkOverlap: 120, topK: 3, embeddingModel: 'MockEmbeddingClient (256-dim)', generationModel: null },
  },
  {
    id: 'wide',
    label: 'Wide chunks',
    params: { chunkSize: 1200, chunkOverlap: 180, topK: 4, embeddingModel: 'MockEmbeddingClient (256-dim)', generationModel: null },
  },
]

/**
 * Measured retrieval benchmark results from AWS-AI-Generative.
 * Run ID: 20261004T042735Z
 * Source: evaluation/reports/retrieval_benchmark_results.json
 * 
 * Metrics:
 * - retrieval: context recall (fraction of relevant documents retrieved)
 * - answer: context precision (fraction of retrieved documents that are relevant)
 * - latency: mean retrieval latency in milliseconds
 * - cost: N/A (offline mock embedding, no generation)
 * - faithfulness: N/A (retrieval-only benchmark)
 */
export const benchmarkResults: ResultSet<BenchmarkRow> = {
  status: 'measured',
  source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json (run 20261004T042735Z)',
  rows: [
    {
      configId: 'small',
      values: { retrieval: 25.0, answer: 13.9, faithfulness: null, latency: 0.14, cost: null },
    },
    {
      configId: 'balanced',
      values: { retrieval: 66.7, answer: 27.8, faithfulness: null, latency: 0.12, cost: null },
    },
    {
      configId: 'wide',
      values: { retrieval: 55.6, answer: 17.1, faithfulness: null, latency: 0.12, cost: null },
    },
  ],
}

/** Illustrative values to show the comparison view. Not measurements. */
export const benchmarkDemo: ResultSet<BenchmarkRow> = {
  status: 'demo',
  rows: [
    { configId: 'small', values: { retrieval: 62.0, answer: 70.0, faithfulness: 80.0, latency: 850, cost: 1.0 } },
    { configId: 'balanced', values: { retrieval: 71.0, answer: 74.0, faithfulness: 86.0, latency: 1250, cost: 1.9 } },
    { configId: 'wide', values: { retrieval: 68.0, answer: 72.0, faithfulness: 83.0, latency: 1100, cost: 1.5 } },
  ],
}