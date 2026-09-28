import { describe, expect, it } from 'vitest'
import { benchmarkDemo, benchmarkResults } from './benchmark'
import { evaluationDemo, evaluationResults } from './evaluation'
import { evidenceCategories } from './evidence'
import { experiments } from './experiments'
import { projects } from './projects'
import { workflowMetrics } from './workflow'
import { formatChange, formatValue, relativeChange } from '../lib/format'
import { deriveChunking } from '../lib/rag'

const numbers = (rows: { values: Record<string, number | null> }[]) =>
  rows.flatMap((r) => Object.values(r.values)).filter((v) => v !== null)

describe('no fabricated results', () => {
  it('recorded result sets are either empty or carry a source', () => {
    for (const set of [evaluationResults, benchmarkResults]) {
      if (set.status === 'measured') expect(set.source, 'measured data needs a source').toBeTruthy()
      if (set.status === 'empty') expect(numbers(set.rows)).toHaveLength(0)
      expect(set.status).not.toBe('demo')
    }
  })

  it('demo sets are labeled demo', () => {
    expect(evaluationDemo.status).toBe('demo')
    expect(benchmarkDemo.status).toBe('demo')
  })

  it('experiments only show numbers when measured with a source', () => {
    for (const e of experiments) {
      const hasNumbers = e.result.metrics.some((m) => m.baseline !== null || m.variant !== null)
      if (hasNumbers) {
        expect(e.result.status).toBe('measured')
        expect(e.result.source).toBeTruthy()
      }
      if (e.conclusion) expect(e.status).toBe('complete')
    }
  })

  it('evidence entries all name a source and date', () => {
    for (const c of evidenceCategories) for (const e of c.entries) expect(e.source && e.date).toBeTruthy()
  })

  it('workflow metrics with a value name a source', () => {
    for (const m of workflowMetrics) if (m.value !== null) expect(m.source).toBeTruthy()
  })
})

describe('project data', () => {
  it('every project links to a github.com repository', () => {
    for (const p of projects) expect(p.githubUrl).toMatch(/^https:\/\/github\.com\/Lazaro549\/[\w-]+$/)
  })
  it('ids are unique', () => {
    expect(new Set(projects.map((p) => p.id)).size).toBe(projects.length)
    expect(new Set(experiments.map((e) => e.id)).size).toBe(experiments.length)
  })
})

describe('helpers', () => {
  it('formats null as a dash, never zero', () => {
    expect(formatValue(null, { decimals: 1 })).toBe('\u2014')
    expect(formatValue(0, { decimals: 1 })).toBe('0.0')
  })
  it('computes relative change', () => {
    expect(relativeChange(80, 88)).toBeCloseTo(10)
    expect(relativeChange(null, 5)).toBeNull()
    expect(relativeChange(0, 5)).toBeNull()
    expect(formatChange(10)).toBe('+10.0%')
    expect(formatChange(null)).toBe('\u2014')
  })
  it('derives chunking arithmetic', () => {
    const d = deriveChunking({ chunkSize: 512, chunkOverlap: 64, topK: 3 })
    expect(d).toMatchObject({ valid: true, stride: 448, maxContext: 1536 })
    expect(d.chunksPerDocument).toBe(Math.ceil((10000 - 64) / 448))
    expect(deriveChunking({ chunkSize: 100, chunkOverlap: 100, topK: 1 }).valid).toBe(false)
  })
})
