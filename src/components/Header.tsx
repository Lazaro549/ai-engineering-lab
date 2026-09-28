import { useEffect, useState } from 'react'

const links = [
  { href: '#loop', label: 'Loop' },
  { href: '#projects', label: 'Projects' },
  { href: '#evaluation', label: 'Evaluation' },
  { href: '#benchmark', label: 'Benchmark' },
  { href: '#experiments', label: 'Experiments' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#evidence', label: 'Evidence' },
  { href: '#architecture', label: 'Architecture' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#lab" className="flex items-center gap-2 font-semibold tracking-tight">
          <svg aria-hidden="true" viewBox="0 0 64 64" className="h-6 w-6">
            <rect width="64" height="64" rx="12" className="fill-panel-2" />
            <path d="M14 40 L26 24 L36 34 L50 16" fill="none" className="stroke-signal" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="16" r="5" className="fill-demo" />
          </svg>
          AI Engineering Lab
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-5 text-sm text-muted">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="py-2 hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-sm border border-line px-3 py-1.5 text-sm text-muted hover:text-fg lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile" className="border-t border-line bg-ink lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="block border-b border-line py-3 text-muted last:border-b-0 hover:text-fg">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
