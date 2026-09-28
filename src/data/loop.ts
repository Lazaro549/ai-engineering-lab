import type { LoopStep } from './types'

export const loopSteps: LoopStep[] = [
  {
    id: 'build',
    label: 'Build',
    summary: 'Implement the system, with an AI assistant working inside a defined engineering process.',
    where: [
      { projectId: 'rag', detail: 'Chunking, Bedrock embeddings and a local FAISS index.' },
      { projectId: 'workflow', detail: 'Claude Code with skills, subagents and hooks.' },
    ],
  },
  {
    id: 'evaluate',
    label: 'Evaluate',
    summary: 'Run the system against a dataset and score the outputs before anyone relies on them.',
    where: [
      { projectId: 'evaluation', detail: 'Dataset, provider, metrics engine, report.' },
      { projectId: 'rag', detail: 'Retrieval and generation evaluation scripts.' },
    ],
  },
  {
    id: 'benchmark',
    label: 'Benchmark',
    summary: 'Compare configurations under identical conditions so a decision has numbers behind it.',
    where: [
      { projectId: 'rag', detail: 'Chunk size, overlap, top-k and models, compared side by side.' },
      { projectId: 'evaluation', detail: 'Run comparison between two models.' },
    ],
  },
  {
    id: 'improve',
    label: 'Improve',
    summary: 'Change one variable, rerun the same measurements, keep the change only if the data supports it.',
    where: [
      { projectId: 'evaluation', detail: 'Regression checks against earlier runs.' },
      { projectId: 'rag', detail: 'Experiments that vary a single parameter.' },
    ],
  },
  {
    id: 'ship',
    label: 'Ship',
    summary: 'Merge through tests, review and CI, with the evaluation evidence attached to the change.',
    where: [
      { projectId: 'workflow', detail: 'GitHub Actions for automated PR review and @claude mentions.' },
      { projectId: 'evaluation', detail: 'Evaluations that run in CI without API keys.' },
    ],
  },
]
