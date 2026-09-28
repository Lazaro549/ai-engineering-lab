import type { MetricColumn } from '../data/types'

/** Null means "not measured". It renders as an em dash, never as zero. */
export function formatValue(value: number | null, column: Pick<MetricColumn, 'decimals'>): string {
  return value === null ? '\u2014' : value.toFixed(column.decimals)
}

/** Percentage change from a baseline to a variant, or null when it cannot be computed. */
export function relativeChange(baseline: number | null, variant: number | null): number | null {
  if (baseline === null || variant === null || baseline === 0) return null
  return ((variant - baseline) / Math.abs(baseline)) * 100
}

export function formatChange(change: number | null): string {
  if (change === null) return '\u2014'
  const sign = change > 0 ? '+' : change < 0 ? '\u2212' : ''
  return `${sign}${Math.abs(change).toFixed(1)}%`
}
