import { evidenceCategories } from '../data/evidence'
import { projects } from '../data/projects'
import { Section, StatusBadge } from './ui'

export default function Evidence() {
  return (
    <Section
      id="evidence"
      title="Engineering evidence"
      lede="This is where recorded results land. Until a run is recorded, each category says so, and says where the data will come from."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {evidenceCategories.map((c) => {
          const project = projects.find((p) => p.id === c.projectId)
          const has = c.entries.length > 0
          return (
            <article key={c.id} aria-labelledby={`ev-${c.id}`} className="flex flex-col rounded-sm border border-line bg-panel p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 id={`ev-${c.id}`} className="font-semibold">{c.title}</h3>
                <StatusBadge status={has ? 'measured' : 'empty'} label={has ? `${c.entries.length} recorded` : undefined} />
              </div>
              <p className="mt-1 text-sm text-muted">{c.description}</p>

              {has ? (
                <ul className="mt-4 divide-y divide-line border-y border-line text-sm">
                  {c.entries.map((e) => (
                    <li key={`${e.label}-${e.date}`} className="py-2">
                      <div className="flex justify-between gap-3">
                        <span>{e.label}</span>
                        <span className="tabular font-medium">{e.value}</span>
                      </div>
                      <p className="text-xs text-muted">{e.source}, {e.date}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="hatch mt-4 rounded-sm border border-dashed border-line-strong px-3 py-6 text-center text-sm text-muted">
                  Nothing recorded
                </div>
              )}

              <p className="mt-4 text-sm text-muted">
                Produced by: <span className="text-fg">{c.producedBy}</span>
              </p>
              {project && (
                <a href={project.exploreHref} className="mt-auto pt-3 text-sm font-medium text-signal hover:underline">
                  {project.name}
                </a>
              )}
            </article>
          )
        })}
      </div>
    </Section>
  )
}
