import { useState } from 'react'
import { benchmarkConfigs, benchmarkDemo, benchmarkResults } from '../data/benchmark'
import { benchmarkColumns } from '../data/columns'
import type { BenchmarkConfig, BenchmarkParams } from '../data/types'
import { formatChange, formatValue, relativeChange } from '../lib/format'
import { deriveChunking } from '../lib/rag'
import { DemoBanner, DemoSwitch, Flow, Section, StatusBadge } from './ui'

type NumericParam = 'chunkSize' | 'chunkOverlap' | 'topK'

const numericFields: { key: NumericParam; label: string }[] = [
  { key: 'chunkSize', label: 'Chunk size' },
  { key: 'chunkOverlap', label: 'Chunk overlap' },
  { key: 'topK', label: 'Top-k' },
]

export default function Benchmark() {
  const [configs, setConfigs] = useState<BenchmarkConfig[]>(benchmarkConfigs)
  const [demo, setDemo] = useState(false)
  const set = demo ? benchmarkDemo : benchmarkResults

  const update = (id: string, key: NumericParam, raw: string) => {
    const value = Number.parseInt(raw, 10)
    setConfigs((prev) =>
      prev.map((c) => (c.id === id ? { ...c, params: { ...c.params, [key]: Number.isNaN(value) ? 0 : value } as BenchmarkParams } : c)),
    )
  }

  const [a, b] = configs
  const rowA = set.rows.find((r) => r.configId === a.id)
  const rowB = set.rows.find((r) => r.configId === b.id)

  return (
    <Section
      id="benchmark"
      title="RAG benchmark"
      lede="Retrieval-augmented generation has many linked choices. A benchmark holds everything else constant, changes one thing, and records what happened."
    >
      <Flow
        items={[
          { title: 'Configuration', note: 'Chunking, retrieval depth, models.' },
          { title: 'Benchmark', note: 'Same questions, same scoring.' },
          { title: 'Result', note: 'Retrieval, answer, faithfulness, latency, cost.' },
          { title: 'Comparison', note: 'Against a baseline configuration.' },
          { title: 'Technical conclusion', note: 'Written only from measured data.' },
        ]}
      />

      <h3 className="mt-14 text-xl font-semibold">Configuration explorer</h3>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Edit the parameters to see how a configuration changes index size and prompt size. The starting values are
        examples, not recorded runs. Derived figures are arithmetic, not measurements, and assume a 10,000 unit
        document in whatever unit chunk size uses.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {configs.map((cfg, i) => {
          const d = deriveChunking(cfg.params)
          return (
            <fieldset key={cfg.id} className="rounded-sm border border-line bg-panel p-5">
              <legend className="px-2 font-semibold">
                <span className={i === 0 ? 'text-signal' : 'text-variant'}>{cfg.label}</span>
              </legend>
              <div className="grid gap-4 sm:grid-cols-3">
                {numericFields.map((f) => (
                  <label key={f.key} className="block text-sm">
                    <span className="text-muted">{f.label}</span>
                    <input
                      type="number"
                      min={0}
                      inputMode="numeric"
                      value={cfg.params[f.key]}
                      onChange={(e) => update(cfg.id, f.key, e.target.value)}
                      className="tabular mt-1 w-full rounded-sm border border-line-strong bg-ink px-3 py-2 font-mono text-fg"
                    />
                  </label>
                ))}
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-muted">Embedding model</dt>
                  <dd>not set</dd>
                </div>
                <div>
                  <dt className="text-muted">Generation model</dt>
                  <dd>not set</dd>
                </div>
              </dl>
              <div className="mt-4 border-t border-line pt-4" aria-live="polite">
                {d.valid ? (
                  <dl className="grid grid-cols-3 gap-3 text-sm">
                    <Derived label="Stride" value={d.stride} />
                    <Derived label="Chunks per document" value={d.chunksPerDocument} />
                    <Derived label="Max context passed" value={d.maxContext} />
                  </dl>
                ) : (
                  <p className="text-sm text-demo">
                    Chunk size, overlap and top-k must be whole numbers, and overlap must be smaller than chunk size.
                  </p>
                )}
              </div>
            </fieldset>
          )
        })}
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">{a.label} vs {b.label}</h3>
        <div className="flex items-center gap-3">
          <StatusBadge status={set.status} />
          <DemoSwitch checked={demo} onChange={setDemo} />
        </div>
      </div>
      {demo && <div className="mt-4"><DemoBanner /></div>}

      <ul className="mt-5 grid gap-px overflow-hidden rounded-sm border border-line bg-line md:grid-cols-2 lg:grid-cols-1">
        {benchmarkColumns.map((c) => {
          const va = rowA?.values[c.key] ?? null
          const vb = rowB?.values[c.key] ?? null
          const max = Math.max(va ?? 0, vb ?? 0)
          const change = relativeChange(va, vb)
          return (
            <li key={c.key} className="grid gap-3 bg-panel p-4 lg:grid-cols-[13rem_minmax(0,1fr)_7rem] lg:items-center lg:gap-6">
              <div>
                <p className="font-medium">{c.label}</p>
                <p className="text-xs text-muted">{c.unit}, {c.higherIsBetter ? 'higher is better' : 'lower is better'}</p>
              </div>
              <div className="space-y-2">
                <Bar tag="A" value={va} max={max} column={c} tone="bg-signal" demo={demo} />
                <Bar tag="B" value={vb} max={max} column={c} tone="bg-variant" demo={demo} />
              </div>
              <p className="tabular text-sm text-muted lg:text-right">
                B vs A <span className={change === null ? '' : demo ? 'text-demo' : 'text-fg'}>{formatChange(change)}</span>
              </p>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-sm text-muted">
        {set.status === 'measured'
          ? `Source: ${set.source}`
          : demo
            ? 'Demo values cannot show that either configuration is better. No conclusion is drawn.'
            : 'No benchmark has been recorded. Hatched tracks mean empty, not zero. Conclusions live under Experiments and are written only after a measured run.'}
      </p>
    </Section>
  )
}

function Derived({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-muted">{label}</dt>
      <dd className="tabular font-mono">{value.toLocaleString('en-US')}</dd>
    </div>
  )
}

function Bar({
  tag,
  value,
  max,
  column,
  tone,
  demo,
}: {
  tag: string
  value: number | null
  max: number
  column: (typeof benchmarkColumns)[number]
  tone: string
  demo: boolean
}) {
  const pct = value !== null && max > 0 ? (value / max) * 100 : 0
  return (
    <div className="grid grid-cols-[1.25rem_minmax(0,1fr)_4rem] items-center gap-3">
      <span className="text-sm font-medium" aria-label={`Configuration ${tag}`}>{tag}</span>
      {value === null ? (
        <div className="hatch h-2.5 rounded-sm border border-line" />
      ) : (
        <div className="h-2.5 rounded-sm bg-panel-2">
          <div className={`h-full rounded-sm ${tone} ${demo ? 'opacity-70' : ''}`} style={{ width: `${pct}%` }} />
        </div>
      )}
      <span className={`tabular text-right text-sm ${value === null ? 'text-muted' : demo ? 'text-demo' : ''}`}>
        {value === null ? <span aria-label="No data">{formatValue(value, column)}</span> : formatValue(value, column)}
      </span>
    </div>
  )
}
