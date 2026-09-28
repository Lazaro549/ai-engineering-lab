import { loopSteps } from '../data/loop'
import { projects } from '../data/projects'
import { useInView } from '../lib/useInView'
import { Section } from './ui'

export default function Loop() {
  const [ref, inView] = useInView<HTMLOListElement>()

  return (
    <Section
      id="loop"
      title="The engineering loop"
      lede="Three projects, one method. Each step of the loop has a concrete home in one of the repositories."
    >
      <ol ref={ref} className={`loop grid gap-10 lg:grid-cols-5 lg:gap-6 ${inView ? 'in-view' : ''}`}>
        {loopSteps.map((step, i) => (
          <li
            key={step.id}
            style={{ '--i': i } as React.CSSProperties}
            className="loop-step relative border-l-2 border-line pl-6 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-6"
          >
            <span
              aria-hidden="true"
              className="loop-dot absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-signal lg:-top-[7px] lg:left-0"
            />
            <h3 className="text-xl font-semibold">{step.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.summary}</p>
            <ul className="mt-4 space-y-2 text-sm">
              {step.where.map((w) => {
                const project = projects.find((p) => p.id === w.projectId)
                return (
                  <li key={w.projectId}>
                    <a href={project?.exploreHref} className="font-medium text-signal hover:underline">
                      {project?.name}
                    </a>
                    <span className="block text-muted">{w.detail}</span>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  )
}
