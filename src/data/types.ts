/**
 * Core data model. Everything the UI renders comes from these shapes,
 * so adding a project, experiment or result never requires touching a component.
 *
 * Honesty rule encoded in the types: a result set is either
 *   'measured' - real numbers, must name a `source`
 *   'demo'     - illustrative numbers, always shown with a visible banner
 *   'empty'    - no run recorded yet, every value is null
 */

export type DataStatus = 'measured' | 'demo' | 'empty'

export type StepId = 'build' | 'evaluate' | 'benchmark' | 'improve' | 'ship'

export interface LoopStep {
  id: StepId
  label: string
  summary: string
  /** Where this step happens in each project. */
  where: { projectId: string; detail: string }[]
}

export interface Project {
  id: string
  name: string
  /** One-line purpose. */
  purpose: string
  description: string
  problem: string
  /** How the system is built, taken from the repository README. */
  system: string
  /** What the project measures. */
  measurement: string[]
  /** What evidence it can produce once runs are recorded. */
  evidence: string
  technologies: string[]
  githubUrl: string
  /** Anchor of the section in this site that explains the project. */
  exploreHref: string
  stages: StepId[]
}

export interface MetricColumn {
  key: string
  label: string
  unit: string
  decimals: number
  higherIsBetter: boolean
}

export interface ResultSet<Row> {
  status: DataStatus
  /** Required when status is 'measured': where the numbers came from. */
  source?: string
  rows: Row[]
}

export interface EvaluationRow {
  system: string
  values: Record<string, number | null>
}

export interface BenchmarkParams {
  chunkSize: number
  chunkOverlap: number
  topK: number
  embeddingModel: string | null
  generationModel: string | null
}

export interface BenchmarkConfig {
  id: string
  label: string
  params: BenchmarkParams
}

export interface BenchmarkRow {
  configId: string
  values: Record<string, number | null>
}

export type ExperimentStatus = 'planned' | 'running' | 'complete'

export interface ExperimentMetric {
  label: string
  unit: string
  baseline: number | null
  variant: number | null
}

export interface Experiment {
  id: string
  title: string
  question: string
  status: ExperimentStatus
  /** What differs from the baseline. Everything else is held constant. */
  varied: string
  configuration: { label: string; baseline: string; variant: string }[]
  result: { status: DataStatus; source?: string; metrics: ExperimentMetric[] }
  comparison: string | null
  conclusion: string | null
  /** What will be run to answer the question. */
  method: string
}

export interface EvidenceEntry {
  label: string
  value: string
  source: string
  date: string
}

export interface EvidenceCategory {
  id: string
  title: string
  description: string
  /** Where real data for this category will come from. */
  producedBy: string
  projectId: string
  entries: EvidenceEntry[]
}

export interface WorkflowStage {
  id: string
  title: string
  description: string
  /** What already exists in claude-code-starter for this stage, or null if it is not wired yet. */
  inRepo: string | null
}

export interface WorkflowMetric {
  id: string
  label: string
  description: string
  value: number | null
  source?: string
}
