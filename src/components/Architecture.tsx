import { Section } from './ui'

const parts = [
  ['Evaluation Platform', 'Supplies the metrics, datasets and run comparison every other part relies on.'],
  ['RAG Benchmark', 'Supplies configurations to compare, each scored by the same evaluation logic.'],
  ['Development Workflow', 'Supplies the process that turns a technical decision into a reviewed, tested change.'],
]

function Node({ x, y, w, title, sub }: { x: number; y: number; w: number; title: string; sub?: string }) {
  const h = sub ? 64 : 44
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" className="fill-panel stroke-line-strong" />
      <text x={x + w / 2} y={y + (sub ? 27 : 27)} textAnchor="middle" className="fill-fg" fontSize="15" fontWeight="600">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + 47} textAnchor="middle" className="fill-muted" fontSize="12">
          {sub}
        </text>
      )}
    </g>
  )
}

export default function Architecture() {
  return (
    <Section
      id="architecture"
      title="Architecture"
      lede="The projects are separate repositories joined by one method. Experiments feed results, and results feed technical decisions."
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
        <figure>
          <svg
            viewBox="0 0 720 500"
            role="img"
            aria-labelledby="arch-title arch-desc"
            className="mx-auto w-full max-w-2xl"
          >
            <title id="arch-title">AI Engineering Lab architecture</title>
            <desc id="arch-desc">
              The lab contains three parts: Evaluation Platform, RAG Benchmark and Development Workflow. All three feed
              Experiments, which produce Results, which lead to Technical decisions.
            </desc>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M1 1L8 5L1 9" fill="none" className="stroke-line-strong" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>

            <g fill="none" className="stroke-line-strong" strokeWidth="1.5">
              <path d="M360 54V82M360 82H120V110M360 82V110M360 82H600V110" />
              <path d="M120 174V206H360M360 174V206M600 174V206H360" />
              <path d="M360 206V246" markerEnd="url(#arrow)" />
              <path d="M360 290V336" markerEnd="url(#arrow)" />
              <path d="M360 380V426" markerEnd="url(#arrow)" />
            </g>

            <Node x={250} y={10} w={220} title="AI Engineering Lab" />
            <Node x={20} y={110} w={200} title="Evaluation Platform" sub="measures systems" />
            <Node x={260} y={110} w={200} title="RAG Benchmark" sub="compares configurations" />
            <Node x={500} y={110} w={200} title="Development Workflow" sub="ships reviewed changes" />
            <Node x={250} y={246} w={220} title="Experiments" />
            <Node x={250} y={336} w={220} title="Results" />
            <Node x={250} y={426} w={220} title="Technical decisions" />
          </svg>
        </figure>

        <dl className="space-y-5">
          {parts.map(([t, d]) => (
            <div key={t} className="border-l border-line pl-4">
              <dt className="font-semibold">{t}</dt>
              <dd className="mt-1 text-sm text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
