import { projects } from '../data/projects'
import { ExtLink } from './ui'

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold">AI Engineering Lab</p>
          <p className="mt-2 text-sm text-muted">
            Project details come from each repository&rsquo;s README. Numbers are measured with a source, labeled as
            demo, or left empty.
          </p>
        </div>
        <nav aria-label="Repositories">
          <ul className="space-y-2 text-sm">
            {projects.map((p) => (
              <li key={p.id}>
                <ExtLink href={p.githubUrl} className="text-muted hover:text-fg">
                  {p.name}
                </ExtLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
