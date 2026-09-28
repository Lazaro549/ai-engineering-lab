import { ExtLink } from './ui'

const record = [
  { field: 'Question', hint: 'What decision does this run inform?' },
  { field: 'Configuration', hint: 'Chunk size, overlap, top-k, models' },
  { field: 'Baseline', hint: 'The run everything is compared against' },
  { field: 'Result', hint: 'Measured values with a source' },
  { field: 'Technical conclusion', hint: 'Written only after the result' },
]

export default function Hero() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center">
        <div>
          <h1 id="lab-title" className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            AI Engineering Lab
          </h1>
          <p className="mt-6 text-2xl font-medium leading-snug text-signal sm:text-3xl">
            Build AI systems. Measure them. Improve them. Ship them.
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Practical AI engineering through evaluation, RAG benchmarking, experimentation and AI-assisted software
            development. Every number on this site is either measured and sourced, marked as demo, or left empty.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#loop"
              className="rounded-sm bg-signal px-5 py-2.5 font-semibold text-ink hover:bg-fg"
            >
              Explore the Lab
            </a>
            <ExtLink
              href="https://github.com/Lazaro549"
              className="rounded-sm border border-line-strong px-5 py-2.5 font-medium hover:border-fg"
            >
              View on GitHub
            </ExtLink>
          </div>
        </div>

        <figure className="rounded-sm border border-line bg-panel">
          <figcaption className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <span className="font-medium">Experiment record</span>
            <span className="rounded-sm border border-dashed border-line-strong px-2 py-0.5 text-xs text-muted">
              Template, no data
            </span>
          </figcaption>
          <dl className="divide-y divide-line">
            {record.map((r) => (
              <div key={r.field} className="grid grid-cols-[8.5rem_1fr] gap-3 px-5 py-3.5">
                <dt className="text-sm font-medium">{r.field}</dt>
                <dd className="text-sm text-muted">{r.hint}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-line px-5 py-3 text-sm text-muted">
            Each experiment on this site follows this shape, so results stay comparable.
          </p>
        </figure>
      </div>
    </section>
  )
}
