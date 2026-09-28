import { useState } from 'react'
import { evaluationColumns } from '../data/columns'
import { evaluationDemo, evaluationResults } from '../data/evaluation'
import { formatValue } from '../lib/format'
import { DemoBanner, DemoSwitch, Flow, Section, StatusBadge } from './ui'

const concepts = [
  ['Evaluation dataset', 'A fixed set of inputs with expected answers. Every system is scored on the same one.'],
  ['Exact match', 'The output equals the expected answer. Deterministic and cheap.'],
  ['Semantic similarity', 'The output means the same as the expected answer, even if worded differently.'],
  ['Faithfulness', 'Every claim in an answer is supported by the retrieved context.'],
  ['Hallucination detection', 'Flags statements that the context or the dataset does not support.'],
  ['Latency, tokens and cost', 'How long a response takes, how many tokens it uses, and what that costs.'],
  ['Regression testing', 'Rerun the same dataset after a change and check that no tracked metric got worse.'],
  ['Model comparison', 'Two models or versions scored side by side on identical inputs.'],
]

export default function Evaluation() {
  const [demo, setDemo] = useState(false)
  const set = demo ? evaluationDemo : evaluationResults

  return (
    <Section
      id="evaluation"
      title="AI evaluation"
      lede="Building an AI system is only the first step. Evaluation says whether it is correct, how fast it is, what it costs, and whether the last change made it worse."
    >
      <Flow
        items={[
          { title: 'Dataset', note: 'Inputs and expected answers, JSON or CSV.' },
          { title: 'Provider', note: 'Mock (offline), OpenAI or Amazon Bedrock.' },
          { title: 'Metrics engine', note: 'Deterministic and LLM-as-judge, kept separate.' },
          { title: 'Report', note: 'Stored in SQLite, exported as JSON, CSV or Markdown.' },
        ]}
      />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">Model comparison table</h3>
            <div className="flex items-center gap-3">
              <StatusBadge status={set.status} />
              <DemoSwitch checked={demo} onChange={setDemo} />
            </div>
          </div>
          {demo && <div className="mb-4"><DemoBanner /></div>}

          <div className="overflow-x-auto rounded-sm border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Evaluation results per system. Dashes mean no measurement has been recorded.
              </caption>
              <thead className="bg-panel">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">System</th>
                  {evaluationColumns.map((c) => (
                    <th key={c.key} scope="col" className="px-4 py-3 text-right font-semibold">
                      {c.label}
                      <span className="block text-xs font-normal text-muted">{c.unit}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {set.rows.map((row) => (
                  <tr key={row.system} className="border-t border-line">
                    <th scope="row" className="px-4 py-3 font-medium">{row.system}</th>
                    {evaluationColumns.map((c) => {
                      const v = row.values[c.key]
                      return (
                        <td
                          key={c.key}
                          className={`tabular px-4 py-3 text-right ${v === null ? 'text-muted' : demo ? 'text-demo' : ''}`}
                        >
                          {v === null ? <span aria-label="No data">{formatValue(v, c)}</span> : formatValue(v, c)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            {set.status === 'measured'
              ? `Source: ${set.source}`
              : 'System names are placeholders. Real rows come from reports exported by the AI Evaluation Platform.'}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">What gets measured</h3>
          <dl className="mt-4 divide-y divide-line border-y border-line">
            {concepts.map(([term, def]) => (
              <div key={term} className="py-3">
                <dt className="text-sm font-medium">{term}</dt>
                <dd className="mt-0.5 text-sm text-muted">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}
