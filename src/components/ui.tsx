import type { ReactNode } from 'react'
import type { DataStatus } from '../data/types'

export function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string
  title: string
  lede?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 id={`${id}-title`} className="max-w-3xl text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {lede && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}

const statusStyles: Record<DataStatus, { label: string; className: string }> = {
  measured: { label: 'Measured', className: 'border-measured/60 text-measured' },
  demo: { label: 'Demo values', className: 'border-demo/60 text-demo' },
  empty: { label: 'No data yet', className: 'border-dashed border-line-strong text-muted' },
}

export function StatusBadge({ status, label }: { status: DataStatus; label?: string }) {
  const s = statusStyles[status]
  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${s.className}`}>
      {label ?? s.label}
    </span>
  )
}

export function DemoBanner() {
  return (
    <p role="note" className="rounded-sm border border-demo/50 bg-demo/10 px-3 py-2 text-sm text-demo">
      Demo values. These numbers are illustrative, were not measured, and support no conclusion.
    </p>
  )
}

export function DemoSwitch({ checked, onChange }: { checked: boolean; onChange: (next: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 rounded-sm border border-line px-3 py-1.5 text-sm text-muted hover:border-line-strong hover:text-fg"
    >
      <span
        aria-hidden="true"
        className={`relative h-4 w-7 rounded-full border transition-colors ${checked ? 'border-demo bg-demo/30' : 'border-line-strong bg-panel-2'}`}
      >
        <span
          className={`absolute top-0.5 h-2.5 w-2.5 rounded-full transition-all ${checked ? 'left-3.5 bg-demo' : 'left-0.5 bg-muted'}`}
        />
      </span>
      Preview with demo values
    </button>
  )
}

export function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" />
    </svg>
  )
}

export function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${className}`}>
      {children}
      <ExternalIcon />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

export function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`h-4 w-4 shrink-0 text-line-strong ${className}`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}

/** An ordered chain of stages. Vertical on small screens, horizontal on large. */
export function Flow({ items }: { items: { title: string; note: string }[] }) {
  return (
    <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
      {items.map((item, i) => (
        <li key={item.title} className="flex flex-col items-start gap-2 lg:flex-1 lg:flex-row lg:items-center">
          <div className="w-full flex-1 self-stretch rounded-sm border border-line bg-panel p-4">
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.note}</p>
          </div>
          {i < items.length - 1 && <Chevron className="ml-4 rotate-90 lg:ml-0 lg:rotate-0" />}
        </li>
      ))}
    </ol>
  )
}
