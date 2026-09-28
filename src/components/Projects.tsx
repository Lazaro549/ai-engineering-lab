import { loopSteps } from '../data/loop'
import { projects } from '../data/projects'
import { ExtLink, Section } from './ui'

const stageLabel = (id: string) => loopSteps.find((s) => s.id === id)?.label ?? id

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Three projects, read as one system"
      lede="Each project answers an engineering problem, describes how the system is built, states what it measures, and says what evidence it can produce."
    >
      <div>
        {projects.map((p) => (
          <article key={p.id} aria-labelledby={`${p.id}-name`} className="grid gap-8 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <div>
              <h3 id={`${p.id}-name`} className="text-2xl font-semibold tracking-tight">
                {p.name}
              </h3>
              <p className="mt-2 text-lg text-signal">{p.purpose}</p>
              <p className="mt-4 leading-relaxed text-muted">{p.description}</p>
              <p className="mt-5 text-sm text-muted">
                Loop stages: <span className="text-fg">{p.stages.map(stageLabel).join(', ')}</span>
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${p.name} technologies`}>
                {p.technologies.map((t) => (
                  <li key={t} className="rounded-sm border border-line bg-panel px-2 py-1 font-mono text-xs text-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <ExtLink href={p.githubUrl} className="rounded-sm border border-line-strong px-4 py-2 font-medium hover:border-fg">
                  GitHub<span className="sr-only">: {p.name}</span>
                </ExtLink>
                <a href={p.exploreHref} className="rounded-sm px-4 py-2 font-medium text-signal hover:underline">
                  Explore<span className="sr-only">: {p.name}</span>
                </a>
              </div>
            </div>

            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Fact title="Problem">{p.problem}</Fact>
              <Fact title="System">{p.system}</Fact>
              <Fact title="Measurement">
                <ul className="list-disc space-y-1 pl-4 marker:text-line-strong">
                  {p.measurement.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </Fact>
              <Fact title="Evidence">{p.evidence}</Fact>
            </dl>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Fact({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-l border-line pl-4">
      <dt className="font-semibold">{title}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-muted">{children}</dd>
    </div>
  )
}
