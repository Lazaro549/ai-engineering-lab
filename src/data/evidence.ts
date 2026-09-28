import type { EvidenceCategory } from './types'

/** Push entries into `entries` as real results are recorded. Empty arrays render an empty state. */
export const evidenceCategories: EvidenceCategory[] = [
  {
    id: 'evaluation-results',
    title: 'Evaluation results',
    description: 'Scores per system on a fixed dataset.',
    producedBy: 'Reports exported by the AI Evaluation Platform (JSON, CSV or Markdown).',
    projectId: 'evaluation',
    entries: [],
  },
  {
    id: 'rag-benchmarks',
    title: 'RAG benchmark results',
    description: 'Retrieval and generation quality per configuration.',
    producedBy: 'JSON reports written by the evaluation scripts in AWS-AI-Generative.',
    projectId: 'rag',
    entries: [],
  },
  {
    id: 'regression',
    title: 'Regression tests',
    description: 'Whether a change made any tracked metric worse.',
    producedBy: 'Comparing a new evaluation run with a stored baseline run.',
    projectId: 'evaluation',
    entries: [],
  },
  {
    id: 'latency',
    title: 'Latency measurements',
    description: 'Response time per model or configuration.',
    producedBy: 'Per-request timing captured by the evaluation runs.',
    projectId: 'evaluation',
    entries: [],
  },
  {
    id: 'cost',
    title: 'Cost measurements',
    description: 'Token usage and estimated cost per run.',
    producedBy: 'Token counts captured by the evaluation runs.',
    projectId: 'evaluation',
    entries: [],
  },
  {
    id: 'model-comparison',
    title: 'Model comparisons',
    description: 'Two models on the same dataset, side by side.',
    producedBy: 'The run comparison feature of the AI Evaluation Platform.',
    projectId: 'evaluation',
    entries: [],
  },
  {
    id: 'workflow',
    title: 'Engineering workflow metrics',
    description: 'Tests, review iterations and human interventions per task.',
    producedBy: 'Recorded per task in the Claude Code workflow repository.',
    projectId: 'workflow',
    entries: [],
  },
]
