export const CAL_LINK = 'https://cal.com/field13-r657gn/45min';

export const OFFER_NAME = 'AI Growth Systems';

export const modules = [
  {
    name: 'Agentic GTM and outbound',
    line: 'Multi-agent pipelines that research accounts, score fit from live buying signals, draft outreach for human approval and write every step back to HubSpot.',
    tools: 'LangGraph · Claude · Clay · treg · HubSpot MCP',
    outcome: 'Sourced pipeline you can trace'
  },
  {
    name: 'Content and AI search systems',
    line: 'Retrieval over your product docs, call transcripts and win-loss notes, so every asset is grounded and cited. Plus tracking of how AI search engines cite you.',
    tools: 'LlamaIndex · pgvector · Claude · Firecrawl · Sanity',
    outcome: 'Grounded content at scale'
  },
  {
    name: 'AI UGC and video production',
    line: 'AI UGC, talking-head hooks and ad variants generated from trend research, voice-matched and captioned, then published, tested and rotated across Meta, TikTok and LinkedIn through their APIs.',
    tools: 'Seedance · Gemini · Remotion · Zernio · treg',
    outcome: 'Tested creative every week'
  },
  {
    name: 'Data, intelligence and measurement',
    line: 'Scraping and enrichment pipelines, a revenue model in your own database, and dashboards with source-to-revenue definitions your finance team signs off.',
    tools: 'Apify · Firecrawl · Postgres · Metabase · Nebius',
    outcome: 'A number the CFO accepts'
  }
];

export const guarantees = [
  {
    name: 'No run fee until it is live',
    body: 'The monthly fee starts when the system is live in your accounts and passing the agreed checks. If it takes longer, it costs us time, not you money.'
  },
  {
    name: 'It ships every month, or that month is free',
    body: 'Your contract lists what the system delivers each month. If we miss it, you do not pay for that month.'
  },
  {
    name: 'You own everything',
    body: 'Code, prompts, footage, data and dashboards live in your accounts. If you leave, you keep it all and get the full handover with runbooks.'
  }
];

/** Stack by layer, so it reads as an architecture rather than a logo wall. */
export const stack = [
  { layer: 'Models', items: ['Anthropic Claude', 'OpenAI', 'Gemini', 'Llama', 'Nebius', 'AWS Bedrock'] },
  { layer: 'Orchestration and evals', items: ['LangGraph', 'LangChain', 'Pydantic AI', 'LlamaIndex', 'LangSmith', 'Langfuse'] },
  { layer: 'Retrieval and data', items: ['Pinecone', 'Qdrant', 'pgvector', 'Postgres', 'Redis', 'Apify', 'Firecrawl'] },
  { layer: 'GTM systems (MCP and API)', items: ['treg', 'HubSpot', 'Clay', 'Zernio', 'Apollo', 'Instantly', 'GA4', 'Meta and Google Ads'] },
  { layer: 'Media and UGC', items: ['Seedance', 'Gemini Image', 'GPT Image', 'Fish Audio', 'ElevenLabs', 'Remotion', 'HyperFrames'] },
  { layer: 'Platform', items: ['FastAPI', 'Next.js', 'Docker', 'Terraform', 'AWS', 'GCP'] }
];

/** "Automation agency vs Field13" comparison on the homepage. */
export const comparison = [
  { topic: 'How it is built', them: 'Zapier or n8n chains and prompt templates', us: 'Typed agents in LangGraph, versioned in your repo' },
  { topic: 'Quality', them: 'Checked by eye before launch', us: 'Every change gated by an eval suite' },
  { topic: 'Failures', them: 'Found by your team, weeks later', us: 'Traced in LangSmith or Langfuse, alerted, fixed within a day' },
  { topic: 'Data', them: 'Pasted into shared public endpoints', us: 'Your cloud, zero-retention model endpoints, PII redacted' },
  { topic: 'Who builds it', them: 'Generalist operators', us: 'The two founders, named on every account' },
  { topic: 'Ownership', them: 'Lives in their accounts', us: 'Code, prompts, evals and data stay yours' }
];

export const standards = [
  'Evals before every release',
  'Input and output guardrails',
  'Tracing and audit trail on every agent step',
  'Human approval wherever a customer sees the output',
  'Least-privilege credentials per workflow',
  'Swap models without a rebuild'
];
