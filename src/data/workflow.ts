import type { WorkflowMetric, WorkflowStage } from './types'

export const workflowStages: WorkflowStage[] = [
  {
    id: 'issue',
    title: 'Issue',
    description: 'A scoped task with a clear definition of done.',
    inRepo: 'GitHub Actions respond to @claude mentions.',
  },
  {
    id: 'planning',
    title: 'AI planning',
    description: 'The assistant proposes an approach before writing code, using project context.',
    inRepo: 'CLAUDE.md holds the project memory the assistant plans against.',
  },
  {
    id: 'implementation',
    title: 'Implementation',
    description: 'Code changes made under hooks that format files and protect what must not change.',
    inRepo: 'Hooks auto-format on save and protect the certificate folder.',
  },
  {
    id: 'tests',
    title: 'Tests',
    description: 'Tests are written and run as part of the task, not after it.',
    inRepo: 'The /test skill and a test-writer subagent.',
  },
  {
    id: 'review',
    title: 'Code review',
    description: 'A separate reviewer pass looks for defects the author did not see.',
    inRepo: 'The /review skill and a code-reviewer subagent.',
  },
  {
    id: 'evaluation',
    title: 'Evaluation',
    description: 'The result is measured: tests passed, review findings, human corrections.',
    inRepo: null,
  },
  {
    id: 'pr',
    title: 'Pull request',
    description: 'The change merges with its evidence attached and CI green.',
    inRepo: 'CI runs on every push and an automated PR review runs in GitHub Actions.',
  },
]

/** Fill `value` (and `source`) once per-task numbers are recorded. */
export const workflowMetrics: WorkflowMetric[] = [
  { id: 'tests-generated', label: 'Tests generated', description: 'Tests written by the assistant per task.', value: null },
  { id: 'tests-passed', label: 'Tests passed', description: 'Share of generated tests passing on first run.', value: null },
  { id: 'files-changed', label: 'Files changed', description: 'Files touched per task.', value: null },
  { id: 'implementation-time', label: 'Implementation time', description: 'Elapsed time from issue to green CI.', value: null },
  { id: 'review-iterations', label: 'Review iterations', description: 'Review rounds before merge.', value: null },
  { id: 'bugs', label: 'Bugs discovered', description: 'Defects found by review or tests after implementation.', value: null },
  { id: 'intervention', label: 'Human intervention', description: 'Manual corrections needed per task.', value: null },
]
