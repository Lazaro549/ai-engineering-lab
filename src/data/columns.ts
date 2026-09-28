import type { MetricColumn } from './types'

export const evaluationColumns: MetricColumn[] = [
  { key: 'accuracy', label: 'Accuracy', unit: '%', decimals: 1, higherIsBetter: true },
  { key: 'faithfulness', label: 'Faithfulness', unit: '%', decimals: 1, higherIsBetter: true },
  { key: 'latency', label: 'Latency', unit: 'ms', decimals: 0, higherIsBetter: false },
  { key: 'cost', label: 'Cost per 1k requests', unit: 'USD', decimals: 2, higherIsBetter: false },
]

export const benchmarkColumns: MetricColumn[] = [
  { key: 'retrieval', label: 'Retrieval quality', unit: '%', decimals: 1, higherIsBetter: true },
  { key: 'answer', label: 'Answer quality', unit: '%', decimals: 1, higherIsBetter: true },
  { key: 'faithfulness', label: 'Faithfulness', unit: '%', decimals: 1, higherIsBetter: true },
  { key: 'latency', label: 'Latency', unit: 'ms', decimals: 0, higherIsBetter: false },
  { key: 'cost', label: 'Cost per 1k queries', unit: 'USD', decimals: 2, higherIsBetter: false },
]
