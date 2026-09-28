import type { EvaluationRow, ResultSet } from './types'

const emptyValues = { accuracy: null, faithfulness: null, latency: null, cost: null }

/**
 * Recorded results. Replace `rows` with real values, set status to 'measured'
 * and fill `source` (for example a report file or run id).
 */
export const evaluationResults: ResultSet<EvaluationRow> = {
  status: 'empty',
  rows: [
    { system: 'Model A', values: { ...emptyValues } },
    { system: 'Model B', values: { ...emptyValues } },
    { system: 'Model C', values: { ...emptyValues } },
  ],
}

/** Illustrative values that only exist to show the table filled in. Never present these as results. */
export const evaluationDemo: ResultSet<EvaluationRow> = {
  status: 'demo',
  rows: [
    { system: 'Model A', values: { accuracy: 71.0, faithfulness: 84.0, latency: 900, cost: 1.2 } },
    { system: 'Model B', values: { accuracy: 78.0, faithfulness: 88.0, latency: 1400, cost: 3.1 } },
    { system: 'Model C', values: { accuracy: 74.0, faithfulness: 81.0, latency: 600, cost: 0.6 } },
  ],
}
