# Architecture

## Principles

1. **Content is data.** Components render typed objects from `src/data`. Adding a project or experiment is a data change.
2. **Honest states.** `DataStatus` (`measured`, `demo`, `empty`) is part of the type system, and the UI has a distinct rendering for each.
3. **Null is not zero.** Missing values are `null`, formatted as an em dash, and drawn as hatched tracks in charts.
4. **Derived is not measured.** The configuration explorer computes stride, chunks per document and maximum context from parameters. That is arithmetic, labeled as such.

## Data model (`src/data/types.ts`)

- `Project`, `LoopStep`: the three projects and the five-step loop.
- `ResultSet<Row>`: `{ status, source?, rows }` for evaluation and benchmark results.
- `MetricColumn`: label, unit, decimals, direction of "better".
- `BenchmarkConfig`: chunk size, overlap, top-k, embedding and generation model.
- `Experiment`: question, varied parameter, configuration, result, comparison, conclusion.
- `EvidenceCategory`, `WorkflowStage`, `WorkflowMetric`.

## Components

| Component | Reads |
| --- | --- |
| Hero, Header, Footer | static copy, `projects` |
| Loop | `loopSteps`, `projects` |
| Projects | `projects` |
| Evaluation | `evaluationColumns`, `evaluationResults`, `evaluationDemo` |
| Benchmark | `benchmarkConfigs`, `benchmarkResults`, `benchmarkDemo`, `benchmarkColumns`, `lib/rag` |
| Experiments | `experiments` |
| Workflow | `workflowStages`, `workflowMetrics` |
| Evidence | `evidenceCategories` |
| Architecture | static SVG |

Shared pieces live in `components/ui.tsx`: `Section`, `StatusBadge`, `DemoBanner`, `DemoSwitch`, `Flow`, `ExtLink`.

## Accessibility

Skip link, landmark structure, one `h1`, labeled tables with captions, keyboard-operable menu (Escape closes it), visible focus ring, `role="switch"` for the demo toggle, `aria-live` validation in the explorer, an accessible title and description on the diagram, and `prefers-reduced-motion` respected. The only automatic motion is the loop lighting up once when it scrolls into view.

## Testing

`npm test` runs `src/data/integrity.test.ts`: no fabricated numbers, sources required for measured data, unique ids, valid GitHub URLs, and unit tests for the formatting and chunking helpers.
