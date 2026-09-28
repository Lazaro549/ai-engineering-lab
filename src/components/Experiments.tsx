import { experiments } from '../data/experiments'
import type { Experiment } from '../data/types'
import { formatChange, relativeChange } from '../lib/format'
import { Section, StatusBadge } from './ui'

const statusLabel: Record<Experiment['status'], string> = {
  planned: 'Planned',
  running: 'Running',
  complete: 'Complete',
}

const fmt = (v: number | null) => (v === null ? '\u2014' : String(v))

export default function Experiments() {
  return (
    <Section
      id="experiments"
      title="Experiments"
      lede="Every experiment asks one question, changes one variable and states its baseline. Outcomes are filled in only from a recorded run."
    >
      <div className="space-y-8">
        {experiments.map((e) => (
          <article key={e.id} aria-labelledby={`exp-${e.id}`} className="rounded-sm border border-line bg-panel">
            <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm text-muted">Experiment {e.id}</p>
                <h3 id={`exp-${e.id}`} className="text-xl font-semibold">{e.title}</h3>
              </div>
              <span className="rounded-sm border border-line-strong px-2 py-0.5 text-xs font-medium text-muted">
                {statusLabel[e.status]}
              </span>
            </header>

            <div className="grid grid-cols-1 gap-8 p-5 sm:p-6 lg:grid-cols-2">
              <div className="min-w-0 space-y-6">
                <Block title="Question">
                  <p className="text-lg leading-snug">{e.question}</p>
                  <p className="mt-2 text-sm text-muted">Method: {e.method}</p>
                </Block>
                <Block title="Configuration">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[20rem] text-left text-sm">
                      <caption className="sr-only">Configuration for experiment {e.id}. The varied parameter is marked.</caption>
                      <thead>
                        <tr className="text-muted">
                          <th scope="col" className="py-1.5 pr-3 font-medium">Parameter</th>
                          <th scope="col" className="py-1.5 pr-3 font-medium">Baseline</th>
                          <th scope="col" className="py-1.5 font-medium">Variant</th>
                        </tr>
                      </thead>
                      <tbody>
                        {e.configuration.map((row) => {
                          const varied = row.label === e.varied
                          return (
                            <tr key={row.label} className="border-t border-line">
                              <th scope="row" className="py-2 pr-3 font-medium">
                                {row.label}
                                {varied && <span className="ml-2 rounded-sm bg-signal/15 px-1.5 py-0.5 text-xs font-medium text-signal">varied</span>}
                              </th>
                              <td className="py-2 pr-3 text-muted">{row.baseline}</td>
                              <td className="py-2 text-muted">{row.variant}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </Block>
              </div>

              <div className="min-w-0 space-y-6">
                <Block title="Result" right={<StatusBadge status={e.result.status} />}>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[20rem] text-left text-sm">
                      <caption className="sr-only">Results for experiment {e.id}. Dashes mean no measurement has been recorded.</caption>
                      <thead>
                        <tr className="text-muted">
                          <th scope="col" className="py-1.5 pr-3 font-medium">Metric</th>
                          <th scope="col" className="py-1.5 pr-3 text-right font-medium">Baseline</th>
                          <th scope="col" className="py-1.5 pr-3 text-right font-medium">Variant</th>
                          <th scope="col" className="py-1.5 text-right font-medium">Change</th>
                        </tr>
                      </thead>
                      <tbody>
                        {e.result.metrics.map((m) => (
                          <tr key={m.label} className="border-t border-line">
                            <th scope="row" className="py-2 pr-3 font-medium">
                              {m.label} <span className="text-xs font-normal text-muted">{m.unit}</span>
                            </th>
                            <td className="tabular py-2 pr-3 text-right text-muted">{fmt(m.baseline)}</td>
                            <td className="tabular py-2 pr-3 text-right text-muted">{fmt(m.variant)}</td>
                            <td className="tabular py-2 text-right text-muted">{formatChange(relativeChange(m.baseline, m.variant))}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {e.result.status === 'measured' && <p className="mt-2 text-sm text-muted">Source: {e.result.source}</p>}
                </Block>
                <Block title="Comparison">
                  <Pending text={e.comparison} empty="Pending. Compares the variant with the baseline once both are measured." />
                </Block>
                <Block title="Technical conclusion">
                  <Pending text={e.conclusion} empty="Pending. States what changed and why it matters, and only after the result exists." />
                </Block>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Block({ title, right, children }: { title: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="font-semibold">{title}</h4>
        {right}
      </div>
      {children}
    </section>
  )
}

function Pending({ text, empty }: { text: string | null; empty: string }) {
  return text ? (
    <p className="leading-relaxed">{text}</p>
  ) : (
    <p className="rounded-sm border border-dashed border-line-strong px-3 py-2 text-sm text-muted">{empty}</p>
  )
}
