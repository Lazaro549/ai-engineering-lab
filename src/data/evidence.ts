import type { EvidenceCategory } from './types'

/** Push entries into `entries` as real results are recorded. Empty arrays render an empty state. */
export const evidenceCategories: EvidenceCategory[] = [
  {
    id: 'evaluation-results',
    title: 'Evaluation results',
    description: 'Scores per system on a fixed dataset.',
    producedBy: 'Reports exported by the AI Evaluation Platform (JSON, CSV or Markdown).',
    projectId: 'evaluation',
    entries: [
      {
        label: 'Mock provider pipeline validation run',
        value: '22 cases, 4.5% pass rate, avg score 0.308, 50ms latency, $0.0003 cost',
        source: 'ai-evaluation-platform/evaluation/reports/run_fb145c78-cf79-4c4e-be07-6fab0bc22681.json',
        date: '2026-10-04',
      },
      {
        label: 'Deterministic metrics computed',
        value: 'exact_match, keyword_overlap, response_length, latency, token_efficiency',
        source: 'ai-evaluation-platform/evaluation/metrics/deterministic.py',
        date: '2026-10-04',
      },
      {
        label: 'LLM judge metrics available',
        value: 'answer_relevance, semantic_similarity, faithfulness, context_relevance (require judge provider)',
        source: 'ai-evaluation-platform/evaluation/metrics/model_based.py',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'rag-benchmarks',
    title: 'RAG benchmark results',
    description: 'Retrieval and generation quality per configuration.',
    producedBy: 'JSON reports written by the evaluation scripts in AWS-AI-Generative.',
    projectId: 'rag',
    entries: [
      {
        label: 'Retrieval benchmark: small config (400/60/2)',
        value: 'Recall 25.0%, Precision 13.9%, Latency 0.14ms (mean), 0.40ms (p95), 39 chunks',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json (run 20261004T042735Z)',
        date: '2026-10-04',
      },
      {
        label: 'Retrieval benchmark: balanced config (800/120/3)',
        value: 'Recall 66.7%, Precision 27.8%, Latency 0.12ms (mean), 0.17ms (p95), 21 chunks',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json (run 20261004T042735Z)',
        date: '2026-10-04',
      },
      {
        label: 'Retrieval benchmark: wide config (1200/180/4)',
        value: 'Recall 55.6%, Precision 17.1%, Latency 0.12ms (mean), 0.16ms (p95), 14 chunks',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json (run 20261004T042735Z)',
        date: '2026-10-04',
      },
      {
        label: 'Live RAG benchmark (Bedrock) — NOT RUN',
        value: 'Blocked: AWS credentials invalid/expired. Run with: python evaluation/rag_benchmark.py',
        source: 'AWS-AI-Generative/evaluation/rag_benchmark.py',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'regression',
    title: 'Regression tests',
    description: 'Whether a change made any tracked metric worse.',
    producedBy: 'Comparing a new evaluation run with a stored baseline run.',
    projectId: 'evaluation',
    entries: [
      {
        label: 'Evaluation platform test suite',
        value: '76 tests pass (unit, integration, evaluation) — validates pipeline regressions caught',
        source: 'ai-evaluation-platform/tests/',
        date: '2026-10-04',
      },
      {
        label: 'AWS-AI-Generative test suite',
        value: '145 tests pass (unit, pipeline, benchmark) — validates RAG pipeline regressions caught',
        source: 'AWS-AI-Generative/tests/',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'latency',
    title: 'Latency measurements',
    description: 'Response time per model or configuration.',
    producedBy: 'Per-request timing captured by the evaluation runs.',
    projectId: 'evaluation',
    entries: [
      {
        label: 'Retrieval latency: small config',
        value: 'Mean 0.14ms, P95 0.40ms (MockEmbeddingClient, FAISS CPU)',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json',
        date: '2026-10-04',
      },
      {
        label: 'Retrieval latency: balanced config',
        value: 'Mean 0.12ms, P95 0.17ms (MockEmbeddingClient, FAISS CPU)',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json',
        date: '2026-10-04',
      },
      {
        label: 'Retrieval latency: wide config',
        value: 'Mean 0.12ms, P95 0.16ms (MockEmbeddingClient, FAISS CPU)',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json',
        date: '2026-10-04',
      },
      {
        label: 'Evaluation platform mock provider latency',
        value: '~50ms fixed overhead per request (deterministic)',
        source: 'ai-evaluation-platform/evaluation/reports/run_fb145c78-cf79-4c4e-be07-6fab0bc22681.json',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'cost',
    title: 'Cost measurements',
    description: 'Token usage and estimated cost per run.',
    producedBy: 'Token counts captured by the evaluation runs.',
    projectId: 'evaluation',
    entries: [
      {
        label: 'Mock evaluation run cost',
        value: '675 total tokens, $0.0003 estimated (mock provider, not real pricing)',
        source: 'ai-evaluation-platform/evaluation/reports/run_fb145c78-cf79-4c4e-be07-6fab0bc22681.json',
        date: '2026-10-04',
      },
      {
        label: 'Live RAG benchmark cost estimation',
        value: 'Requires BEDROCK_INPUT_PRICE_PER_1K_USD and BEDROCK_OUTPUT_PRICE_PER_1K_USD env vars. Not run.',
        source: 'AWS-AI-Generative/evaluation/rag_benchmark.py',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'model-comparison',
    title: 'Model comparisons',
    description: 'Two models on the same dataset, side by side.',
    producedBy: 'The run comparison feature of the AI Evaluation Platform.',
    projectId: 'evaluation',
    entries: [
      {
        label: 'Comparison API endpoint available',
        value: 'GET /evaluations/compare/{run_a}/{run_b} — compares two runs on same dataset',
        source: 'ai-evaluation-platform/app/api/routes.py',
        date: '2026-10-04',
      },
      {
        label: 'RAG config comparison (offline)',
        value: 'balanced vs small: recall +166.7%, precision +100%, latency -14%',
        source: 'AWS-AI-Generative/evaluation/reports/retrieval_benchmark_results.json',
        date: '2026-10-04',
      },
    ],
  },
  {
    id: 'workflow',
    title: 'Engineering workflow metrics',
    description: 'Tests, review iterations and human interventions per task.',
    producedBy: 'Recorded per task in the Claude Code workflow repository.',
    projectId: 'workflow',
    entries: [],
  },
]