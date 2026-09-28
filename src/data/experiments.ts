import type { Experiment } from './types'

/**
 * To add an experiment: append an object here. To record its outcome, fill `result`,
 * `comparison` and `conclusion`, set `status: 'complete'`, and set result.status to 'measured'
 * with a `source`.
 */
export const experiments: Experiment[] = [
  {
    id: '001',
    title: 'Chunk size',
    question: 'Does changing chunk size improve RAG answer quality?',
    status: 'planned',
    varied: 'Chunk size',
    method: 'Run the retrieval and generation evaluation on the same question set for each chunk size.',
    configuration: [
      { label: 'Chunk size', baseline: 'to be set', variant: 'to be set' },
      { label: 'Chunk overlap', baseline: 'held constant', variant: 'held constant' },
      { label: 'Top-k', baseline: 'held constant', variant: 'held constant' },
      { label: 'Embedding model', baseline: 'held constant', variant: 'held constant' },
      { label: 'Generation model', baseline: 'held constant', variant: 'held constant' },
    ],
    result: {
      status: 'empty',
      metrics: [
        { label: 'Answer quality', unit: '%', baseline: null, variant: null },
        { label: 'Faithfulness', unit: '%', baseline: null, variant: null },
        { label: 'Latency', unit: 'ms', baseline: null, variant: null },
      ],
    },
    comparison: null,
    conclusion: null,
  },
  {
    id: '002',
    title: 'Retrieval depth',
    question: 'Does retrieving more chunks raise faithfulness, and what does it cost in latency?',
    status: 'planned',
    varied: 'Top-k',
    method: 'Hold the index fixed and vary top-k, recording faithfulness, latency and cost for each value.',
    configuration: [
      { label: 'Chunk size', baseline: 'held constant', variant: 'held constant' },
      { label: 'Chunk overlap', baseline: 'held constant', variant: 'held constant' },
      { label: 'Top-k', baseline: 'to be set', variant: 'to be set' },
      { label: 'Embedding model', baseline: 'held constant', variant: 'held constant' },
      { label: 'Generation model', baseline: 'held constant', variant: 'held constant' },
    ],
    result: {
      status: 'empty',
      metrics: [
        { label: 'Faithfulness', unit: '%', baseline: null, variant: null },
        { label: 'Latency', unit: 'ms', baseline: null, variant: null },
        { label: 'Cost per 1k queries', unit: 'USD', baseline: null, variant: null },
      ],
    },
    comparison: null,
    conclusion: null,
  },
]
