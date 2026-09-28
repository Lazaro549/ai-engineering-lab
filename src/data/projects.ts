import type { Project } from './types'

// Facts on this page come from each repository's README.
// Update this file when a repository changes; no component needs to be edited.
export const projects: Project[] = [
  {
    id: 'evaluation',
    name: 'AI Evaluation Platform',
    purpose: 'Measure AI systems before shipping them.',
    description:
      'A modular platform for evaluating LLM applications: quality, reliability, safety, latency, token usage and cost. It runs fully offline with a built-in mock provider.',
    problem:
      'Deploying an LLM application without systematic evaluation is a guess. There is no repeatable way to compare models or catch a regression.',
    system:
      'Dataset, evaluation pipeline, provider (mock, OpenAI or Amazon Bedrock), metrics engine with deterministic and LLM-as-judge metrics kept separate, SQLite storage, FastAPI API, React dashboard and JSON, CSV or Markdown reports.',
    measurement: [
      'Exact match and semantic similarity',
      'Faithfulness and hallucination detection',
      'Latency, token usage and cost',
      'Run-to-run comparison and regression checks',
    ],
    evidence:
      'Each run is stored and exported as a report, so two models or two versions can be compared on the same dataset.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'SQLite', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/Lazaro549/ai-evaluation-platform',
    exploreHref: '#evaluation',
    stages: ['evaluate', 'benchmark', 'improve'],
  },
  {
    id: 'rag',
    name: 'AWS AI / RAG Benchmark',
    purpose: 'Experiment with RAG configurations and compare their measurable performance.',
    description:
      'Practical Generative AI on Amazon Bedrock, from a minimal chatbot and a from-scratch RAG pipeline to a serverless API and an evaluation framework for RAG quality.',
    problem:
      'RAG quality depends on many linked choices: how documents are chunked, how many chunks are retrieved, which models embed and generate. Intuition does not settle those choices.',
    system:
      'RAG example with chunking, Bedrock embeddings and a local FAISS index, plus an evaluation package with retrieval and generation scripts and a question and answer dataset.',
    measurement: [
      'Context precision and recall',
      'Faithfulness and answer relevancy',
      'Latency per configuration',
      'Cost per configuration',
    ],
    evidence:
      'Evaluation scripts write JSON reports, which is the raw material for the configuration comparisons on this site.',
    technologies: ['Python', 'Amazon Bedrock', 'FAISS', 'AWS Lambda', 'AWS SAM', 'pytest', 'GitHub Actions'],
    githubUrl: 'https://github.com/Lazaro549/AWS-AI-Generative',
    exploreHref: '#benchmark',
    stages: ['build', 'evaluate', 'benchmark', 'improve'],
  },
  {
    id: 'workflow',
    name: 'Claude Code workflow',
    purpose: 'Show how an AI coding assistant fits into a reproducible engineering workflow.',
    description:
      'A small task-tracker CLI wired to Claude Code\u2019s toolkit: skills, subagents, hooks and GitHub Actions. The CLI is deliberately tiny. The configuration around it is the point.',
    problem:
      'Asking an assistant for code is not a process. Without tests, review and guardrails, the output is unverified and the result is not repeatable.',
    system:
      'A CLAUDE.md project memory, /review, /test and /changelog skills, code-reviewer and test-writer subagents, hooks for formatting and file protection, and GitHub Actions for @claude mentions and PR review.',
    measurement: [
      'Tests generated and passed',
      'Files changed per task',
      'Review iterations',
      'Bugs found and human interventions',
    ],
    evidence:
      'Per-task workflow metrics are not recorded yet. Tests and CI already run on every push.',
    technologies: ['Claude Code', 'TypeScript', 'Node.js', 'GitHub Actions'],
    githubUrl: 'https://github.com/Lazaro549/claude-code-starter',
    exploreHref: '#workflow',
    stages: ['build', 'improve', 'ship'],
  },
]
