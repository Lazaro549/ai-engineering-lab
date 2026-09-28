import { workflowMetrics, workflowStages } from '../data/workflow'
import { ExtLink, Section, StatusBadge } from './ui'

const principles = [
  ['Repeatable', 'Skills, subagents and hooks are versioned files. The same setup runs on every task and in CI.'],
  ['Verified', 'Tests and a separate review pass check the assistant\u2019s work before a human spends time on it.'],
  ['Measured', 'Each task can be recorded, so claims about productivity come from data instead of impressions.'],
]

export default function Workflow() {
  return (
    <Section
      id="workflow"
      title="AI-assisted development as a workflow"
      lede="Generating code is the smallest part. What makes it engineering is the process around it: planning, tests, review, evaluation and a pull request."
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <ol className="border-l border-line">
          {workflowStages.map((s, i) => (
            <li key={s.id} className="relative pb-7 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-3 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-line-strong bg-ink text-xs font-medium tabular"
              >
                {i + 1}
              </span>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.description}</p>
              <p className="mt-2 text-sm">
                {s.inRepo ? (
                  <>
                    <span className="text-muted">In the repository today: </span>
                    {s.inRepo}
                  </>
                ) : (
                  <span className="rounded-sm border border-dashed border-line-strong px-2 py-0.5 text-muted">
                    Not wired yet in the repository
                  </span>
                )}
              </p>
            </li>
          ))}
        </ol>

        <div className="space-y-10">
          <div>
            <h3 className="text-xl font-semibold">Why a workflow, not just code generation</h3>
            <dl className="mt-4 space-y-4">
              {principles.map(([t, d]) => (
                <div key={t} className="border-l border-line pl-4">
                  <dt className="font-medium">{t}</dt>
                  <dd className="mt-0.5 text-sm text-muted">{d}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm">
              <ExtLink href="https://github.com/Lazaro549/claude-code-starter" className="font-medium text-signal hover:underline">
                claude-code-starter
              </ExtLink>
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold">Recorded per task</h3>
              <StatusBadge status="empty" />
            </div>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {workflowMetrics.map((m) => (
                <li key={m.id} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                  <span>
                    <span className="font-medium">{m.label}</span>
                    <span className="block text-muted">{m.description}</span>
                  </span>
                  <span className="tabular text-muted" aria-label={m.value === null ? 'No data' : undefined}>
                    {m.value === null ? '\u2014' : m.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}
